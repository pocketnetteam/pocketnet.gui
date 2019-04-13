
 /*_____*/ 
var tableAlignmentCenter=function(e){return e.width="auto",{columns:[{width:"*",text:""},e,{width:"*",text:""}]}},dateFormat=function(){var h=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,m=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,g=/[^-+\dA-Z]/g,y=function(e,t){for(e=String(e),t=t||2;e.length<t;)e="0"+e;return e};return function(e,t,n){var a=dateFormat;if(1!=arguments.length||"[object String]"!=Object.prototype.toString.call(e)||/\d/.test(e)||(t=e,e=void 0),e=e?new Date(e):new Date,isNaN(e))throw SyntaxError("invalid date");"UTC:"==(t=String(a.masks[t]||t||a.masks.default)).slice(0,4)&&(t=t.slice(4),n=!0);var i=n?"getUTC":"get",r=e[i+"Date"](),o=e[i+"Day"](),s=e[i+"Month"](),l=e[i+"FullYear"](),u=e[i+"Hours"](),c=e[i+"Minutes"](),d=e[i+"Seconds"](),f=e[i+"Milliseconds"](),p=n?0:e.getTimezoneOffset(),v={d:r,dd:y(r),ddd:a.i18n.dayNames[o],dddd:a.i18n.dayNames[o+7],m:s+1,mm:y(s+1),mmm:a.i18n.monthNames[s],mmmm:a.i18n.monthNames[s+12],yy:String(l).slice(2),yyyy:l,h:u%12||12,hh:y(u%12||12),H:u,HH:y(u),M:c,MM:y(c),s:d,ss:y(d),l:y(f,3),L:y(99<f?Math.round(f/10):f),t:u<12?"a":"p",tt:u<12?"am":"pm",T:u<12?"A":"P",TT:u<12?"AM":"PM",Z:n?"UTC":(String(e).match(m)||[""]).pop().replace(g,""),o:(0<p?"-":"+")+y(100*Math.floor(Math.abs(p)/60)+Math.abs(p)%60,4),S:["th","st","nd","rd"][3<r%10?0:(r%100-r%10!=10)*r%10]};return t.replace(h,function(e){return e in v?v[e]:e.slice(1,e.length-1)})}}();dateFormat.masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"},dateFormat.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]},Date.prototype.addDays=function(e){return this.setDate(this.getDate()+e),this},Date.prototype.format=function(e,t){return dateFormat(this,e,t)},Date.prototype.addMonths=function(e){return a=new Date(this.valueOf()),a.setMonth(a.getMonth()+e),a},Date.prototype.addDays=function(e){return a=new Date(this.valueOf()),a.setDate(a.getDate()+e),a},Date.prototype.addHours=function(e){return a=new Date(this.valueOf()),a.setHours(this.getHours()+e),a},Date.prototype.addMinutes=function(e){return a=new Date(this.valueOf()),a.setMinutes(this.getMinutes()+e),a},Date.prototype.addSeconds=function(e){return a=new Date(this.valueOf()),a.setSeconds(this.getSeconds()+e),a},Date.prototype.lastDayOfMonth=function(){return new Date(this.getFullYear(),this.getMonth()+1,0).getDate()},Date.prototype.yyyymmdd=function(e){var t=this.getMonth()+1,n=this.getDate();return[this.getFullYear(),(9<t?"":"0")+t,(9<n?"":"0")+n].join(e||"")};var secInTime=function(e){var t=e/3600^0,n=(e-3600*t)/60^0,a=e-3600*t-60*n,i=[];return t&&i.push(addZero(t.toFixed(0))),i.push(addZero(n.toFixed(0))),i.push(addZero(a.toFixed(0))),i.join(":")};function M(e){for(var t,n="0123456789ABCDEF",a="",i=0;i<e.length;i++)t=e.charCodeAt(i),a+=n.charAt(t>>>4&15)+n.charAt(15&t);return a}function X(e){for(var t=Array(e.length>>2),n=0;n<t.length;n++)t[n]=0;for(n=0;n<8*e.length;n+=8)t[n>>5]|=(255&e.charCodeAt(n/8))<<n%32;return t}function V(e){for(var t="",n=0;n<32*e.length;n+=8)t+=String.fromCharCode(e[n>>5]>>>n%32&255);return t}function Y(e,t){e[t>>5]|=128<<t%32,e[14+(t+64>>>9<<4)]=t;for(var n=1732584193,a=-271733879,i=-1732584194,r=271733878,o=0;o<e.length;o+=16){var s=n,l=a,u=i,c=r;a=md5_ii(a=md5_ii(a=md5_ii(a=md5_ii(a=md5_hh(a=md5_hh(a=md5_hh(a=md5_hh(a=md5_gg(a=md5_gg(a=md5_gg(a=md5_gg(a=md5_ff(a=md5_ff(a=md5_ff(a=md5_ff(a,i=md5_ff(i,r=md5_ff(r,n=md5_ff(n,a,i,r,e[o+0],7,-680876936),a,i,e[o+1],12,-389564586),n,a,e[o+2],17,606105819),r,n,e[o+3],22,-1044525330),i=md5_ff(i,r=md5_ff(r,n=md5_ff(n,a,i,r,e[o+4],7,-176418897),a,i,e[o+5],12,1200080426),n,a,e[o+6],17,-1473231341),r,n,e[o+7],22,-45705983),i=md5_ff(i,r=md5_ff(r,n=md5_ff(n,a,i,r,e[o+8],7,1770035416),a,i,e[o+9],12,-1958414417),n,a,e[o+10],17,-42063),r,n,e[o+11],22,-1990404162),i=md5_ff(i,r=md5_ff(r,n=md5_ff(n,a,i,r,e[o+12],7,1804603682),a,i,e[o+13],12,-40341101),n,a,e[o+14],17,-1502002290),r,n,e[o+15],22,1236535329),i=md5_gg(i,r=md5_gg(r,n=md5_gg(n,a,i,r,e[o+1],5,-165796510),a,i,e[o+6],9,-1069501632),n,a,e[o+11],14,643717713),r,n,e[o+0],20,-373897302),i=md5_gg(i,r=md5_gg(r,n=md5_gg(n,a,i,r,e[o+5],5,-701558691),a,i,e[o+10],9,38016083),n,a,e[o+15],14,-660478335),r,n,e[o+4],20,-405537848),i=md5_gg(i,r=md5_gg(r,n=md5_gg(n,a,i,r,e[o+9],5,568446438),a,i,e[o+14],9,-1019803690),n,a,e[o+3],14,-187363961),r,n,e[o+8],20,1163531501),i=md5_gg(i,r=md5_gg(r,n=md5_gg(n,a,i,r,e[o+13],5,-1444681467),a,i,e[o+2],9,-51403784),n,a,e[o+7],14,1735328473),r,n,e[o+12],20,-1926607734),i=md5_hh(i,r=md5_hh(r,n=md5_hh(n,a,i,r,e[o+5],4,-378558),a,i,e[o+8],11,-2022574463),n,a,e[o+11],16,1839030562),r,n,e[o+14],23,-35309556),i=md5_hh(i,r=md5_hh(r,n=md5_hh(n,a,i,r,e[o+1],4,-1530992060),a,i,e[o+4],11,1272893353),n,a,e[o+7],16,-155497632),r,n,e[o+10],23,-1094730640),i=md5_hh(i,r=md5_hh(r,n=md5_hh(n,a,i,r,e[o+13],4,681279174),a,i,e[o+0],11,-358537222),n,a,e[o+3],16,-722521979),r,n,e[o+6],23,76029189),i=md5_hh(i,r=md5_hh(r,n=md5_hh(n,a,i,r,e[o+9],4,-640364487),a,i,e[o+12],11,-421815835),n,a,e[o+15],16,530742520),r,n,e[o+2],23,-995338651),i=md5_ii(i,r=md5_ii(r,n=md5_ii(n,a,i,r,e[o+0],6,-198630844),a,i,e[o+7],10,1126891415),n,a,e[o+14],15,-1416354905),r,n,e[o+5],21,-57434055),i=md5_ii(i,r=md5_ii(r,n=md5_ii(n,a,i,r,e[o+12],6,1700485571),a,i,e[o+3],10,-1894986606),n,a,e[o+10],15,-1051523),r,n,e[o+1],21,-2054922799),i=md5_ii(i,r=md5_ii(r,n=md5_ii(n,a,i,r,e[o+8],6,1873313359),a,i,e[o+15],10,-30611744),n,a,e[o+6],15,-1560198380),r,n,e[o+13],21,1309151649),i=md5_ii(i,r=md5_ii(r,n=md5_ii(n,a,i,r,e[o+4],6,-145523070),a,i,e[o+11],10,-1120210379),n,a,e[o+2],15,718787259),r,n,e[o+9],21,-343485551),n=safe_add(n,s),a=safe_add(a,l),i=safe_add(i,u),r=safe_add(r,c)}return Array(n,a,i,r)}function md5_cmn(e,t,n,a,i,r){return safe_add(bit_rol(safe_add(safe_add(t,e),safe_add(a,r)),i),n)}function md5_ff(e,t,n,a,i,r,o){return md5_cmn(t&n|~t&a,e,t,i,r,o)}function md5_gg(e,t,n,a,i,r,o){return md5_cmn(t&a|n&~a,e,t,i,r,o)}function md5_hh(e,t,n,a,i,r,o){return md5_cmn(t^n^a,e,t,i,r,o)}function md5_ii(e,t,n,a,i,r,o){return md5_cmn(n^(t|~a),e,t,i,r,o)}function safe_add(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}function bit_rol(e,t){return e<<t|e>>>32-t}currentYear=function(){return(new Date).getFullYear()},monthConvert=function(e){var t=_.indexOf(["January","February","March","April","May","June","July","August","September","October","November","December"],e);return-1==t&&(t=0),t},addZero=function(e){return Number(e)<10&&(e="0"+e),e},dateToStr=function(e){var t=e||new Date,n=addZero((t.getMonth()+1).toString());e=addZero(t.getDate().toString());return addZero(t.getFullYear().toString())+n+e+addZero(t.getHours().toString())+addZero(t.getMinutes().toString())},dateToStrS=function(e){var t=e||new Date,n=addZero((t.getMonth()+1).toString());e=addZero(t.getDate().toString());return addZero(t.getFullYear().toString())+n+e+addZero(t.getHours().toString())+addZero(t.getMinutes().toString())+addZero(t.getSeconds().toString())},dateToStrUTCSS=function(e){var t=e||new Date,n=addZero((t.getUTCMonth()+1).toString()),a=(e=addZero(t.getUTCDate().toString()),addZero(t.getUTCFullYear().toString())),i=addZero(t.getUTCHours().toString()),r=addZero(t.getUTCMinutes().toString()),o=addZero(t.getUTCSeconds().toString()),s=t.getUTCMilliseconds().toString();return s.length<5&&(s+="0"),a+n+e+i+r+o+s},strToDateArr=function(e){return[e.substring(0,4),e.substring(4,6),e.substring(6,8)]},dateToStrSmall=function(e){var t=e||new Date,n=addZero((t.getMonth()+1).toString());e=addZero(t.getDate().toString());return addZero(t.getFullYear().toString())+n+e},dateToStrUtc=function(e){var t=nowDateUtc(e);return dateToStr(t)},dateToStrUtcS=function(e){var t=nowDateUtc(e);return dateToStrS(t)},strToDate=function(e){var t=e.substring(0,4),n=e.substring(4,6),a=e.substring(6,8),i=e.substring(8,10),r=e.substring(10,12),o=e.substring(12,14)||0;return new Date(t,n-1,a,i,r,o)},strToDateSS=function(e){var t=e.substring(0,4),n=e.substring(4,6),a=e.substring(6,8),i=e.substring(8,10),r=e.substring(10,12),o=e.substring(12,14)||0,s=e.substring(14,17)||0;return new Date(t,n-1,a,i,r,o,s)},strToDateSmall=function(e){var t=e.substring(0,4),n=e.substring(4,6),a=e.substring(6,8);return new Date(t,n-1,a)},dateNow=function(e){if(!e)e=new Date;var t=e.getMonth()+1,n=e.getDate(),a=e.getHours(),i=e.getMinutes(),r=e.getSeconds();return t<10&&(t="0"+t),n<10&&(n="0"+n),a<10&&(a="0"+a),i<10&&(i="0"+i),r<10&&(r="0"+r),[e.getFullYear(),t,n,a,i]},dateUtcNow=function(e){if(!e)e=new Date;var t=e.getUTCMonth()+1,n=e.getUTCDate(),a=e.getUTCHours(),i=e.getUTCMinutes(),r=e.getUTCSeconds();return t<10&&(t="0"+t),n<10&&(n="0"+n),a<10&&(a="0"+a),i<10&&(i="0"+i),r<10&&(r="0"+r),e.getUTCFullYear()+""+t+n+a+i},randomString=function(e){e||(e=8);for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",a=0;a<e;a++)t+=n.charAt(Math.floor(Math.random()*n.length));return t},utcStrToDateSS=function(e){strToDateSS(e)},utcStrToDate=function(e){var t=strToDate(e),n=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds());return n=new Date(n),n=new Date(n.getFullYear(),n.getMonth(),n.getDate(),n.getHours(),n.getMinutes(),n.getSeconds())},utcStrToConvertDate=function(e){return convertDate(dateToStr(utcStrToDate(e)))},nowDateUtc=function(e){var t=e||new Date;return new Date(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate(),t.getUTCHours(),t.getUTCMinutes(),t.getUTCSeconds())},nextMonday=function(e){var t=e||new Date,n=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=new Date(t.getFullYear(),t.getMonth(),t.getDate());return n.getDay()?a.setDate(n.getDate()+8-n.getDay()):a.setDate(n.getDate()+1),a},nextMondayUtc=function(e){e||(e=new Date);var t=nowDateUtc(),n=nowDateUtc();return t.getDay()?n.setDate(t.getDate()+8-t.getDay()):n.setDate(t.getDate()+1),n},convertDate=function(e){var t=e.substring(0,4),n=e.substring(4,6),a=e.substring(6,8),i=e.substring(8,10),r=e.substring(10,12),o=t;return n&&(o+=" "+["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"][n-1]),a&&(o+=" "+a),i&&(o+=", "+i,o+=r?":"+r:"H"),o},wnd=function(a){a||(a={});var n,i=this,r=a.app,o=a.content||null,s="w"+makeid().split("-")[0],l=a.nooverflow||$("html").hasClass("nooverflow"),u=a.el||$("body"),e=function(e){if(n)return n.find(e)};i.redraw=function(){var t=[];a.scrollers&&(t=_.map(e(a.scrollers),function(e){return $(e).scrollTop()})),e(".wndcontent").html(o),a.scrollers&&$.each(e(a.scrollers),function(e){$(this).scrollTop(t[e])}),a.success&&a.success(n,i,!0)};var c={close:function(e){e&&a.closecross&&a.closecross(n,i),a.close&&a.close(n,i),l||r.actions.onScroll(),i.essenseDestroy&&i.essenseDestroy(),n.remove(),a.noblur,$("#habla_beta_container_do_not_rely_on_div_classes_or_names").css("display","block")}};i.buttonState=function(e,t){var n="disabled";"function"==typeof t&&(t=t()),t?a.buttons[e].el.removeClass(n):a.buttons[e].el.addClass(n)};return function(){a.preloader&&preloader(!0),a.buttons||(a.buttons={}),a.buttons.close||(a.buttons.close={action:close,html:"Close",class:"close"});var e,t;a.noblur,o&&(a.preloader&&preloader(!1),e='<div class="wndback" id='+s+'></div><div class="wndinner">\t\t\t\t\t ',t="",a.leftbg&&(e+='<div class="leftbg"><div>'+a.leftbg+"</div></div>"),e+='<div class="wndcontent">'+o+"</div>",a.header?e+='<div class="wndheader">'+a.header+"</div>":t="onwhite",e+=' <div class="buttons"></div>',e+='<div class="_close roundclosebutton '+t+'"><i class="fa fa-times" aria-hidden="true"></i></div></div>',n=$("<div>",{class:"wnd",html:e}),a.header||n.addClass("noheader"),u.append(n),n.find("._close").on("click",function(){c.close(!0)}),_.each(a.buttons,function(e){e.el=$("<div>",{class:"button "+(e.class||""),html:"<div>"+e.html+"</div>"}),n.find(".wndinner>div.buttons").append(e.el);var t=e.fn||c[e.action]||c.close;e.el.on("click",function(){t(n,i)})}),a.class&&n.addClass(a.class),l||(l=!r.actions.offScroll(a.offScroll)),n.css("display","block"),a.noCloseBack||n.find(".wndback").one("click",function(){c.close(!0)}),i.el=n,a.clbk&&a.clbk(i,n))}(),i.find=e,i.close=c.close,i.el=n,i},inputDialogNew=function(l){var e;l||(l={}),l.alert||(l.alert="Please enter values"),l.class=(l.class||"")+" input",l.wrap=!0;var u=l.mmoneyparam,c=l.percentparam,o=function(e,t){return e.dollars&&(u.value=t.toString(),t=maskValue(u)),e.percent&&(c.value=t.toString(),t=maskValue(c)),e.convertIn&&(t=e.convertIn(t)),t};l.html='<div class="caption">'+l.caption+"</div>",l.html+='<div class="values">',_.each(l.values,function(n,e){var t="",a="";n.dollars&&(t="dollars"),n.percent&&(t="percent"),n.slider&&(a="hasslider"),l.html+='<div class="value '+a+'">',n.checkbox||(l.html+='<div class="label">',l.html+=n.label,l.html+="</div>"),l.html+='<div class="v">',n.checkbox?(l.html+='<input class="checkbox" type="checkbox" index="'+e+'" id="value'+e+'" ',1==n.defValue&&(l.html+="checked"),l.html+='><label for="value'+e+'">'+n.label+"</label>"):n.select?(l.html+='<select index="'+e+'">',_.each(n.select.values,function(e){var t="";e.v==n.select.default&&(t="selected"),l.html+='<option  value="'+e.v+'" '+t+">",l.html+=e.l,l.html+="</option>"}),l.html+="</select>"):(n.defValue&&n.defValue.toFixed&&(n.defValue=n.defValue.toFixed(l.precision||0)),l.html+='<input placeholder="'+(n.placeholder||n.label||"")+'" class="'+t+'" index="'+e+'" data-validate="'+(n.validate||"name")+'" type="'+(n.type||"text")+'" value="'+(n.defValue||"")+'"></input>'),l.html+="</div>",n.slider&&(l.html+="<div class='sliderWrapper' index='"+e+"'>",l.html+="<div class='sliderTableWrapper'>",l.html+="<div class='min'>"+o(n,n.slider.min)+"</div>",l.html+="<div class='sliderc'>",l.html+="<div class='slider'></div>",l.html+="</div>",l.html+="<div class='max'>"+o(n,n.slider.max)+"</div>",l.html+="</div>",l.html+="</div>"),l.html+="</div>"}),l.html+="</div>",l.html+='<div class="alert" style="display:none">'+l.alert+"</div>";var t=l.success,n=l.clbk;return l.clbk=function(a){e=new Validation({form:a,success:function(){}}),u&&a.find(".dollars").maskMoney(u),c&&a.find(".percent").maskMoney(c),_.each(l.values,function(i,e){if(i.slider){var r=a.find('input[index="'+e+'"]'),t=a.find('.sliderWrapper[index="'+e+'"] .slider'),n={slide:function(e,t){var n=t.value,a=l.precision||0;i.dollars&&(a=u.precision||0),i.percent&&(a=u.precision||0),n=n.toFixed(a),r.val(o(i,n))},value:i.defValue};_.isObject(i.slider)&&(n=_.extend(n,i.slider)),t.slider(n),r.on("change",function(){var e=$(this).val();i.dollars&&(e=r.maskMoney("unmasked",u)[0].value),i.percent&&(e=r.maskMoney("unmasked",c)[0].value),e>i.slider.max&&(e=i.slider.max),e<i.slider.min&&(e=i.slider.min),t.slider("value",e),$(this).val(o(i,e))})}}),n&&n()},l.success=function(r){if(!e.validation())return!1;var o={},s=!0;return _.each(l.values,function(e,t){var n=r.el.find(".values [index='"+t+"']"),a=n.val();e.checkbox&&(a=n.is(":checked")),e.dollars&&(a=n.maskMoney("unmasked",u)[0].value),e.percent&&(a=n.maskMoney("unmasked",c)[0].value);var i=e.id||t;e.id&&(s=!1),o[i]=a}),s&&(o=_.toArray(o)),t(o),!0},new dialog(l)},dialog=function(n){var a,e,i=this,t=n.removescroll&&n.app,r=!1;if($("html").hasClass("nooverflow")&&(t=!1),n.success||(n.success=!1),n.fail||(n.fail=!1),n.btn1text||(n.btn1text="Accept"),n.btn2text||(n.btn2text="Cancel"),n.id){if("undefined"==typeof localStorage)return;if(n.btn2text||(n.btn2text="Don't Show Anymore"),(a=JSON.parse(localStorage.qu_rx||"{}"))[n.id])return void(n.alltrue&&n.success())}var o,s=function(e,t){"function"==typeof e?e(i)&&n.wrap&&l():l(),t&&n.id&&(a[n.id]=!0,localStorage.qu_rx=JSON.stringify(a)),n.wrap||l()},l=function(){r||(r=!0,e.fadeOut(200),setTimeout(function(){e.remove()},200),t&&app.actions.onScroll())};return o='<div class="wrapper table"><div class="secondwrapper"><div class="thwrapper">',n.header&&(o+='<div class="header"><div class="text">'+n.header+"</div></div>"),n.html&&(o+='<div class="body"><div class="text">'+(n.html||"")+"</div></div>"),o+='<div class="buttons">\t\t\t\t\t\t\t<div class="btn2wr"><button class="btn2 medium">'+n.btn2text+'</button></div>\t\t\t\t\t\t\t<div class="btn1wr"><button class="btn1 medium">'+n.btn1text+'</button></div>\t\t\t\t\t\t</div><div class="_close"><i class="fa fa-times" aria-hidden="true"></i></div>\t\t\t\t\t\t</div>\t\t\t\t\t\t</div></div>',(e=$("<div/>",{class:"dialog "+(n.class||"")})).html(o),$("body").append(e),n.class&&e.addClass(n.class),e.find(".btn1").on("click",function(){s(n.success)}),e.find(".btn2").on("click",function(){s(n.fail,!0)}),e.find("._close").on("click",function(){s(n.close,!0)}),n.clbk&&n.clbk(e,i),t&&app.actions.offScroll(),n.render&&n.render(e),e.fadeIn(200),bgImages(e),i.el=e,i.destroy=l,i},tooltip=function(i){i||(i={});var r=this,e=i.content||"",t=i.el,o=i.event||"click",n=i.options||{},a=function(){t.hasClass("tooltipstered")||(n.debug=!1,n.contentAsHTML=!0,n.interactive=!0,n.interactiveTolerance=400,n.onlyOne=!0,n.delay=100,"mouseenter"!=o?n.trigger=o:n.delay=400,n.autoClose=!1,n.theme||(n.theme="lighttooltip"),n.position||(n.position="bottom"),n.height||(n.height=420),n.maxWidth||(n.maxWidth=600),n.content=function(){return e},n.functionReady=function(e,t){r.instance=e;var n=$(t.tooltip),a=$(t.origin);r.el=function(){return n},"click"!=o&&a.on("click",function(){e.close()}),i.clbk&&i.clbk({el:n})},n.functionInit=function(e,t){},n.functionAfter=function(e,t){i.destroy&&i.destroy()},t.tooltipster(n))};return r.close=function(){r.instance&&r.instance.close()},i.render&&a(),a(),r},sitemessage=function(e,t){$("<div/>",{class:"sitemessage remove_now",style:"opacity:0",text:e}).appendTo("body").animate({opacity:1},200),setTimeout(function(){$(".remove_now").animate({opacity:0},500),"function"==typeof t&&t(),setTimeout(function(){$(".remove_now").detach()},500)},2200)},bgImages=function(t,n){n||(n={}),t.find("[image]").each(function(){var e=$(this);e.attr("image")&&(e.css("background-image","url("+$(this).attr("image")+")"),e.css("background-size",n.size||"cover"),e.css("background-position",n.position||"center center"),e.css("background-repeat",n.repeat||"no-repeat"),e.attr("image","")),n.clbk&&e.imagesLoaded({background:!0},function(e){t.fadeIn(100),"function"==typeof n.clbk&&n.clbk(e)})})},pathFromMD5Name=function(e){return e.substr(0,2)+"/"+e.substr(2,2)+"/"+e.substr(4)+".jpg"},srcToData=function(e,t){var n=new XMLHttpRequest;n.onload=function(){var e=new FileReader;e.onloadend=function(){t(e.result)},e.readAsDataURL(n.response)},n.onerror=function(){console.log("ERROR")},n.open("GET",e),n.responseType="blob",n.send()},resizeFit=function(e,n,a,i,r){var o,s,l,u=new Image,c=document.createElement("canvas"),d=c.getContext("2d");u.src=e,r||(r="jpeg"),u.setAttribute("crossOrigin","anonymous"),u.onload=function(){if(o=u.height/u.width,l=u.height,s=u.width,l<=a&&s<=n);else{n<s&&(l=(s=n)*o),a<l&&(s=(l=a)/o);var e=Math.max((a-l)/l,(n-s)/s);0<e&&(l*=e+1,s*=e+1)}c.width=s,c.height=l,d.drawImage(u,0,0,s,l);var t=c.toDataURL("image/"+r,1);$(c).remove(),i(t)}},resize=function(e,t,n,a,i){var r,o,s,l=new Image,u=document.createElement("canvas"),c=u.getContext("2d");l.src=e,i||(i="jpeg"),l.setAttribute("crossOrigin","anonymous"),l.onload=function(){r=l.height/l.width,s=l.height,o=l.width,s<=n&&o<=t||(t<o&&(s=(o=t)*r),n<s&&(o=(s=n)/r)),u.width=o,u.height=s,c.drawImage(l,0,0,o,s);var e=u.toDataURL("image/"+i,.75);$(u).remove(),a(e)}},grayscaleImage=function(e,p){var v=new Image;v.src=e,v.onload=function(){var e=document.createElement("canvas"),t=e.getContext("2d"),n=v.width,a=v.height;e.width=n,e.height=a,t.drawImage(v,0,0);var i=t.getImageData(0,0,n,a),r=0,o=0;for(o=0;o<i.height;o++)for(r=0;r<i.width;r++){var s=4*o*i.width+4*r,l=i.data[s],u=i.data[s+1],c=i.data[s+2],d=i.data[s+3],f=(3*l+u+c)/3;i.data[s]=f,i.data[s+1]=f,i.data[s+2]=f,i.data[s+3]=d}t.putImageData(i,0,0,0,0,i.width,i.height),p&&p(e.toDataURL())}},colorFromGradient=function(n){n.gradient||(n.gradient=[{color:[0,0,0,0],image:"red",position:0},{color:[255,255,255,255],image:"green",position:100}]),void 0===n.value&&(n.value=50);var a=_.find(n.gradient,function(e,t){if(e.position<=n.value&&(!n.gradient[t+1]||n.gradient[t+1].position>n.value))return!0}),i=_.find(n.gradient,function(e,t){if(e.position>=n.value&&(!n.gradient[t-1]||n.gradient[t-1].position<n.value))return!0}),r=[0,0,0,0];if(i||(i=n.gradient[n.gradient.length-1]),a||(a=n.gradient[0]),i.position==a.position)r=a.color,a.image,a.opacity=255,i.opacity=255;else{var o=(n.value-a.position)/(i.position-a.position);_.each(r,function(e,t){r[t]=(a.color[t]*(1-o)+i.color[t]*o).toFixed(0)}),a.opacity=1-o,i.opacity=o}if(n.mode&&"pdf"==n.mode)return{left:a,right:i};var e,t="rgba("+r[0]+","+r[1]+","+r[2]+","+r[3]+")";return n.toHex?(e=(e=t).match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i))&&4===e.length?"#"+("0"+parseInt(e[1],10).toString(16)).slice(-2)+("0"+parseInt(e[2],10).toString(16)).slice(-2)+("0"+parseInt(e[3],10).toString(16)).slice(-2):"":t},randomColor=function(){return"rgb("+Math.floor(256*Math.random())+","+Math.floor(256*Math.random())+","+Math.floor(256*Math.random())+")"},rgbaOpacity=function(e,t){var n=e.replace("rgba(","").replace(")","").split(",");return n[3]=t,e="rgba("+n.join(",")+")"},aviableFilters={values:function(n,e){var a=!0;return _.each(e,function(e,t){a&&0==e[n[t]]&&(a=!1)}),a},condition:{without:{name:"Without data",id:"without",filter:function(e,t,n){if(void 0===n||"-"==e[n.id]||null==n)return!0},type:"general",values:0},with:{name:"With data",id:"with",filter:function(e,t,n){if(void 0!==n&&"-"!=n&&null!=n)return!0},type:"general",values:0},beginwith:{name:"Begin with",id:"beginwith",filter:function(e,t,n){if(0==n.toLowerCase().indexOf(t.values[0].toLowerCase()))return!0},type:"string",values:1},endsat:{name:"Ends at",id:"endsat",filter:function(e,t,n){if(n.toLowerCase().indexOf(t.values[0].toLowerCase())==n.length-t.values[0].length)return!0},type:"string",values:1},contain:{name:"Contain",id:"contain",filter:function(e,t,n){if(-1<n.toLowerCase().indexOf(t.values[0].toLowerCase()))return!0},type:"string",values:1},equaltext:{name:"Equal",id:"equaltext",filter:function(e,t,n){if(n.toLowerCase()==t.values[0].toLowerCase())return!0},type:"string",values:1},more:{name:"More",id:"more",filter:function(e,t,n){if(Number(n)>Number(t.values[0]))return!0},type:"number",values:1},moreequal:{name:"More and Equal",id:"moreequal",filter:function(e,t,n){if(Number(n)>=Number(t.values[0]))return!0},type:"number",values:1},less:{name:"Less",id:"less",filter:function(e,t,n){if(Number(n)<Number(t.values[0]))return!0},type:"number",values:1},lessequal:{name:"Less and Equal",id:"lessequal",filter:function(e,t,n){if(Number(n)<=Number(t.values[0]))return!0},type:"number",values:1},equal:{name:"Equal",id:"equal",filter:function(e,t,n){if(Number(n)==Number(t.values[0]))return!0},type:"number",values:1},notequal:{name:"Not Equal",id:"notequal",filter:function(e,t,n){if(Number(n)!=Number(t.values[0]))return!0},type:"number",values:1}}},indexArray=function(e){e||(e=0);for(var t=[],n=0;n<e;n++)t.push(n);return t},b64_to_utf8=function(e){return decodeURIComponent(window.atob(e))},convertStringToArrayBuffer=function(e){for(var t=atob(e),n=t.length,a=new Uint8Array(n),i=0;i<n;i++)a[i]=t.charCodeAt(i);return a.buffer},convertArrayBufferToString=function(e){for(var t=new Uint8Array(e),n="",a=0;a<t.byteLength;a++)n+=String.fromCharCode(t[a]);return btoa(n)},objmap=function(e,t){var n={};return _.each(e,function(e){n[e.id]=e}),n},group=function(e,a){var i={};return _.each(e,function(e,t){var n=a(e,t);n&&(i[n]||(i[n]=[]),i[n].push(e))}),i},apply=function(n,a){_.isArray(n)?_.each(n,function(e,t){apply(n[t],a)}):a(n)},nextIndex=function(e,t){var n=_.indexOf(e,t);return-1<n&&(n==e.length-1?n=0:n++),n},findIndex=function(e,t){var n=-1;return _.find(e,function(e){if(n++,t(e))return!0})||(n=-1),n},addSuffixToValue=function(t){if(t.array&&t.field&&t.value){if(_.find(t.array,function(e){if(e[t.field]&&e[t.field]==t.value)return!0})){var e=new RegExp("[(]([0-9]+)[)]"),n=t.value.match(e);return n||((n=[])[1]="0"),n[1]=Number(n[1])+Number(1),t.value=trim(t.value.replace(n[0],"")),t.value+=" ("+n[1]+")",addSuffixToValue(t)}return t.value}},removeEqual=function(e,n){var a=-1,t=_.find(e,function(e,t){if(isEqual(e,n,!1))return a=t,e});return-1<a&&(e.splice(a,1),t)},instead=function(e,n){var a=-1;_.find(e,function(e,t){if(isEqual(e,n,!1))return a=t,!0});-1<a&&e.splice(a,1),e.unshift(n)},lazyEach=function(u){var c={after:["success","fail","after"]},d=!1,f=function(e){var t=n(u.array[e],u.each,e);t.item=u.array[e],u.action(t,e)},n=function(s,e,l){var t={};return _.each(e,function(r,o){t[o]="function"!=typeof r||"success"!=o&&"fail"!=o&&"after"!=o?r:function(){var i=arguments,e=function(){var n,a,e,t=function(){u.all.success&&!d&&u.all.success(u),u.all.fail&&d&&u.all.fail(u),u.all.after&&u.all.after(u)};"fail"==(n=o)&&(d=!0),_.find(c,function(e,t){if(-1<_.indexOf(e,n))return a=t,!0}),a&&(v[a]||(v[a]=0),v[a]++),e=v,h=_.reduce(e,function(e,t){return e+t},0),r(s,h,p,i,l),u.sync?u.array[l+1]?f(l+1):t():h==p&&t()};if(!u.syncCallbacks||l<=h||u.sync)e();else var t=setInterval(function(){l<=h&&(e(),clearInterval(t))},10)}}),t};if(u||(u={}),u.array||(u.array=[]),u.each||(u.each={}),u.all||(u.all={}),u.each.success||(u.each.success=function(){}),u.each.fail||(u.each.fail=function(){}),u.array&&0!=u.array.length){var p=u.array.length,v={},h=0;u.all.before&&u.all.before(u),u.sync?f(0):_.each(u.array,function(e,t){f(t)})}else u.all.success&&u.all.success()},lazyActions=function(e,t){lazyEach({array:e,action:function(e){e.item(e.success)},all:{success:t}})},primitiveToArray=function(e){return _.isArray(e)?e:[e]},actionsByType=function(e,t){if(isVal(e)){if(t.value)return t.value(e)}else if(_.isArray(e)){if(t.array)return t.array(e)}else if(t.object)return t.object(e);return null},isVal=function(e){return!_.isObject(e)||void 0!==e.v&&!_.isObject(e.v)||void 0!==e.c&&!_.isObject(e.c)},prevEl=function(e,t){var n=_.indexOf(e,t);return 0<n?e[n-1]:e[0]},nextEl=function(e,t){var n=_.indexOf(e,t);return-1<n&&n<e.length-1?e[n+1]:e[e.length-1]},lastEl=function(e){var t=deep(e,"length");return t?e[t-1]:null},lastEls=function(e,n){var a=e.length;return(n=Math.min(n,a))?_.filter(e,function(e,t){if(a-n<=t)return e}):[]},getRandomValues=function(e){for(var t=0;t<e.length;t++)e[t]=256*Math.random()|0;return e},equalhash=function(e,t){return $.md5(JSON.stringify(e))===$.md5(JSON.stringify(t))},getMethods=function(e){var t={};for(prop in e)"function"==typeof e[prop]&&(t[prop]=e[prop]);return t},getVars=function(e){var t={};for(prop in e)e.hasOwnProperty(prop)&&(t[prop]=e[prop]);return t},toDeepKey=function(e){return _.toArray(e).sort().join(".")},deep=function(e,t){var n=t.split("."),a=n[0];if(void 0!==e&&e)return void 0!==e[a]?(n.splice(0,1),0==n.length?e[a]:deep(e[a],n.join("."))):void 0},deepInsert=function(e,t,n){if(t){var a=t.split("."),i=a[0];if(1!=a.length)return e[i]||(e[i]={}),a.splice(0,1),deepInsert(e[i],a.join("."),n);e[i]=n}},isEqual=function(a,e,i){void 0===i&&(i=!0);var r=!i;return void 0===a&&void 0===e||void 0!==a&&void 0!==e&&((typeof a==typeof e||"function"==typeof e)&&("function"==typeof e?e(a):_.isObject(e)?_.isArray(e)?(_.each(e,function(e,t){var n=isEqual(a[t],e,i);n=!!n,r=r||n}),r):!!_.isObject(e)&&(_.each(e,function(e,t){var n=isEqual(a[t],e,i);n=!!n,r=i?r||n:r&&n}),r):e==a))},clear=function(n){_.each(n,function(e,t){delete n[t]})},executeIfCan=function(e){return"function"==typeof e?e():e},convertBits=function(a,e){(a=_.toArray(Number(a).toString(2))).length;return _.filter(e,function(e,t){var n=_.toArray(Number(e.bit).toString(2));if(1==a[a.length-n.length])return!0})},convertBitsToMap=function(e,t){var n=convertBits(e,t);return _.map(n,function(e){return e.bit})},convertToBits=function(e){return _.reduce(e,function(e,t){return e+Number(t)},0)},boolnum=function(e){return!(0==e||"0"==e||!e)},"undefined"!=typeof FileReader&&void 0===FileReader.prototype.readAsBinaryString&&(FileReader.prototype.readAsBinaryString=function(e){var i="",r=this,o=new FileReader;o.onload=function(e){for(var t=new Uint8Array(o.result),n=t.byteLength,a=0;a<n;a++)i+=String.fromCharCode(t[a]);r.content=i,$(r).trigger("onload")},o.readAsArrayBuffer(e)}),ParametersLive=function(e,M,A){A||(A={}),_.each(e,function(u){if(u.type){var o=M.find('[pid="'+u.id+'"]');if(o){if((u.el=o).find(".operatorselect").off("change"),o.find(".operatorselect").on("change",function(){u.operator=$(this).val(),u.set("___nochange")}),"cash"==u.type)return o.find("input").on("change",function(){var e=$(this).val();u.isValid(e)?o.removeClass("error"):o.addClass("error"),u.set(e)}),void o.find("input").on("keyup",function(){var e=$(this).val();o.find(".convertValue").html(u.app.store.cash.toBTC(e,u.currency,!0))});if("cashrange"==u.type)return o.find("input").on("change",function(){var e=$(this).val(),t=$(this).attr("index");u.isValid(e)?o.removeClass("error"):o.addClass("error"),u.set(e,t)}),void o.find("input").on("keyup",function(){$(this).val(),$(this).attr("index")});if("numberrange"==u.type)return void o.find("input").on("change",function(){var e=$(this).val(),t=$(this).attr("index");u.isValid(e)?o.removeClass("error"):o.addClass("error"),u.set(e,t)});if("html"==u.type&&!_Node)return o.trumbowyg({btns:[["bold","italic"],["link"]]}),void o.on("tbwblur",function(){var e=o.trumbowyg("html");u.set(e)});if("image"==u.type){var e=o.find(".addImage"),s=o.find(".imagesContainer"),t=o.find(".imageContainer");u.upload.el=e,u.onLive&&u.onLive(t,u),u.upload.beforeUpload=function(e,t){u.previewTemplate&&s.append(u.previewTemplate({file:e,processId:t}))},u.upload.onUpload=function(e,t){if(u.previewTemplate){var n=deep(e,u.previewPath||""),a=s.find('[processId="'+t+'"]'),i=s,r="append";0<a.length&&(i=a,r="replaceWith"),i[r](u.previewTemplate({src:n,processId:t,options:u.upload})),a=s.find('[processId="'+t+'"]'),u.onLive(a,u)}u.set(n),u.upload._onUpload&&u.upload._onUpload(e)},initUpload(u.upload)}if("valuesmultitree"==u.type){var c=function(){o.find(".checkbox").prop("checked",!1);var e=_.map(u.value,function(e){return u.treemap[e]});u.every({group:function(e,t,n,a){o.find('[value="'+e.id+'"]').prop("checked",!0),e.active&&a()},value:function(e,t,n){o.find('[value="'+e.id+'"]').prop("checked",!0)}},e)},n=function(e,t){var n=u.treemap[e];a(n,t)},a=function(e,t){if(e){void 0===t&&(t=!e.active),e.active=t;var n=o.find('[groupid="'+e.id+'"]'),a=n.find(".vmt_group_params"),i=n.attr("level");e.active?(a.html(u.renderLevel(e.values,i+1)),n.removeClass("hidden"),n.addClass("active")):(a.html(""),n.removeClass("active"))}},l=function(){_.each(u.treemap,function(e){e.active=!1})};return o.find(".vmt_showMore").on("click",function(){o.addClass("showedMore")}),o.find(".vmt_hideMore").on("click",function(){o.removeClass("showedMore")}),o.find(".autoSearch").on("keyup",function(e){var t=$(this).val();if(t&&1<t.length)if(13==(e.keyCode||e.which)){var n=u.treemap[t];if(n){removeEqual(u.value,n.id),o.find('input[value="'+n.id+'"]').prop("checked",!0).change(),$(this).val(""),l();var a=u.renderLevel(null,0);o.find(".chinputsv").html(a),c()}}else{l();var i=u.searchValues(t),r={};_.each(i,function(e){_.each(e.parents,function(e){r[e.id]=!0})});a=u.renderLevel(null,0,{group:function(e){if(r[e.id])return e.active=!0},value:function(e){if(i[e.id])return!0}});o.find(".chinputsv").html(a),c()}else{l();a=u.renderLevel();o.find(".chinputsv").html(a),c()}}),o.on("click",".vmt_panel_wrapper",function(){var e=$(this).closest("[groupid]").attr("groupid");n(e),c()}),o.on("change",'input[type="checkbox"]',function(){var e,t=$(this).attr("value"),n=$(this).is(":checked")?1:0,a=u.treemap[t],i={},r={},o=function(){a.parent&&u.childselected(a.parent,i,r)&&(a=a.parent,(i={})[a.id]=!0,o())},s=function(e){e.parent&&(r[e.parent.id]=!0,s(e.parent))};n?(i[a.id]=!0,o(),a.values&&u.every({group:function(e,t,n,a){r[e.id]=!0,a()},value:function(e){r[e.id]=!0}},a.values)):(function(t){if(t.parent){var e=u.parentselected(t.parent,[],[]);e&&(r[e.id]=!0,_.each(t.parent.values,function(e){e.id!=t.id&&(i[e.id]=!0)}))}}(a),r[a.id]=!0,s(a));var l=u.composeValues(i,r);e=_.map(l,function(e,t){return t}),u.set(e),c()}),void c()}if("valuesmulti"==u.type)return o.find("input").on("change",function(){var e=$(this).attr("val"),t=$(this).is(":checked")?1:0;u.set(e,t),o.removeClass("error")}),o.find(".vm_showMore").on("click",function(){o.addClass("showedMore")}),void o.find(".vm_hideMore").on("click",function(){o.removeClass("showedMore")});if("valuescustom"==u.type||"values"==u.type||"valuesmultibig"==u.type){var i=null,r=o.find(".vc_inputWrapper input"),d=function(){return"valuesmultibig"==u.type?o.find(".vc_valuecustom"):o},f=function(){d().toggleClass("opened"),o.find(".vc_value").removeClass("hidden"),d().hasClass("opened")?($("html").on("click",v),window.addEventListener("scroll",p),o.find(".vc_selectInput").scrollTop(0)):p()},p=function(){i&&r.val(i),d().removeClass("opened"),$("html").off("click",v),window.removeEventListener("scroll",p)},v=function(e){0===o.has(e.target).length&&d().hasClass("opened")&&p()};("valuescustom"==u.type||u.autoSearch)&&(o.find(".vc_iconWrapper").on("click",function(){f(),u.autoSearch&&setTimeout(function(){r.focus(),i=r.val(),r.val("")},200)}),o.find("input").on("focus",function(){$(this).select()})),"values"!=u.type||u.autoSearch||o.find(".vc_textInput").on("click",function(){f()}),o.find(".vc_value").on("click",function(){i=null;var e=$(this).attr("value");r.val(e),r.change(),d().removeClass("opened"),d().removeClass("error")}),o.find(".vc_selected_value_icon").on("click",function(){var e=$(this).closest(".vc_selected_value").attr("value");u.set(e),o.parent().html(u.input()),ParametersLive([u],M,A)}),u.autoSearch&&(r.focus(function(){this.select()}),r.on("keyup",function(e){i=null;var a=$(this).val().toLowerCase();if(d().hasClass("opened")||f(),13==(e.keyCode||e.which)){var t=o.find(".vc_value:not(.hidden)");return 0<t.length&&(a=t.attr("value")),$(this).val(a),$(this).change(),!1}a?$.each(o.find(".vc_value"),function(){var e=$(this),t=e.attr("value").toLowerCase(),n=e.text().toLowerCase();-1<t.indexOf(a)||-1<n.indexOf(a)?e.removeClass("hidden"):e.addClass("hidden")}):o.find(".vc_value").removeClass("hidden")}));var h=function(){var e=$(this),t=e.val();if(u.autoSearch){var n=u.isValid(t);if(t&&!n)return void setTimeout(function(){e.val()==t&&u.require&&($(e).val(u.defaultValue),$(e).change())},150);n&&(t=n)}u.set(t),e.val(u.labelByValue(t)),"valuesmultibig"==u.type&&(o.parent().html(u.input()),ParametersLive([u],M,A)),o.removeClass("error")};return r.on("change",h),void(u.onType&&r.on("keyup",h))}if("location"==u.type)return u.options.inputBinding||(u.options.inputBinding={}),u.options.inputBinding.locationNameInput=o.find(".place input"),u.options.inputBinding.radiusInput=o.find(".radius select"),u.options.onchanged=function(e,t,n){var a=$(this).locationpicker("map"),i=a.location.addressComponents,r={};_.clone(e),r.latitude=e.latitude,r.longitude=e.longitude,r.radius=t,r.country=i.country,r.zip=i.postalCode,r.place=a.location.formattedAddress,u.set(r)},u.options.location={latitude:u.value.latitude,longitude:u.value.longitude},u.options.enableAutocomplete=!0,u.options.autocompleteOptions={types:["(regions)"],componentRestrictions:{country:"us"}},u.options.enableAutocompleteBlur=!0,u.options.radius=u.value.radius,5e3<u.options.radius&&(u.options.zoom=10),1e4<u.options.radius&&(u.options.zoom=9),2e4<u.options.radius&&(u.options.zoom=8),5e4<u.options.radius&&(u.options.zoom=7),1e5<u.options.radius&&(u.options.zoom=6),25e4<u.options.radius&&(u.options.zoom=5),5e5<=u.options.radius&&(u.options.zoom=4),o.find(".map").locationpicker(u.options),void o.find(".locationInputUse input").on("change",function(){var e=!!$(this).is(":checked");o.toggleClass("notused"),e?(o.find(".place input").removeAttr("disabled"),o.find(".radius select").removeAttr("disabled")):(o.find(".place input").attr("disabled","disabled"),o.find(".radius select").attr("disabled","disabled")),u.set({using:e})});if("color"==u.type&&o.simpleColor({boxWidth:60,cellWidth:30,cellHeight:30,columns:4,cellMargin:2,colors:u.possibleValues,onSelect:function(e){u.set(e)}}),"date"==u.type){o.pickadate({today:"",onSet:function(e){if(e.select){var t=dateToStrSmall(new Date(e.select));u.set(t)}else u.set()},selectYears:!0,selectMonths:!0,format:"dddd, dd mmm, yyyy",formatSubmit:"yyyymmdd",min:u.options.min||void 0,max:u.options.max||void 0});var m=o.pickadate("picker");u.value&&m.set("select",strToDateArr(u.value))}if("daterange"==u.type){var g,y,b=function(){u.value[0]?y.set("min",strToDateArr(u.value[0])):y.set("min",u.options.min||!1),u.value[1]?g.set("max",strToDateArr(u.value[1])):g.set("max",u.options.max||!1)},w={selectYears:!0,selectMonths:!0,today:"",format:"dddd, dd mmm, yyyy",formatSubmit:"yyyymmdd",min:u.options.min||void 0,max:u.options.max||void 0},k=_.clone(w),x=_.clone(w),C=function(e,t){var n="";e.select&&(n=dateToStrSmall(new Date(e.select))),void 0===e.select&&void 0===e.clear||(u.set(n,t),b())};return k.onSet=function(e){C(e,0)},x.onSet=function(e){C(e,1)},o.find(".from").pickadate(k),o.find(".to").pickadate(x),g=o.find(".from").pickadate("picker"),y=o.find(".to").pickadate("picker"),u.value[0]&&g.set("select",strToDateArr(u.value[0])),u.value[1]&&y.set("select",strToDateArr(u.value[1])),void b()}if("hours"==u.type)return void o.find(".dayrow select").on("change",function(){var e=$(this).val(),t=$(this).closest(".trange").attr("index"),n=$(this).closest(".dayrow").attr("day");"false"==e&&(e=null),u.set(e,n,t),o.removeClass("error")});if("category"==u.type)return void o.on("click",function(){u.app.nav.api.load({open:!0,id:"postSelectCategory",inWnd:!0,essenseData:{header:"Select Category",path:o.attr("parent"),validation:"canCreateItem",onSelectCategory:function(e){u.set(e.path())}}})});if("phone"==u.type&&o.mask("(999) 999-9999"),"string"==u.type&&u.autoSearch){var S=o.closest(".vc_autosearchInput").find(".placeholderghost"),T="&nbsp;";o.on("keydown",function(e){var t=$(this),n=t.val();39==(e.keyCode||e.which)?(n=S.html())!=T&&(S.html(T),t.val(S.attr("value")),t.change()):S.html(n||T)});var D=function(e){var t=$(this),n=t.val();S.html(n||T),n&&13!=(e.keyCode||e.which)&&u.autoSearch(n,u,function(e){t.val()==n&&(S.html(n||T),n&&e&&0==e.toLowerCase().indexOf(n.toLowerCase())&&S.html(n+e.substr(n.length)).attr("value",e))})};o.on("keyup",D),o.on("focus",D),o.on("blur",function(){S.html(T)})}h=function(){var e=$(this).val();"boolean"==u.type&&(e=$(this).is(":checked")?1:0),"email"==u.type&&"_@_._"==e&&(e=""),u.isValid(e)?o.removeClass("error"):o.addClass("error"),u.set(e)};o.on("change",h),u.onType&&o.on("keyup",h)}}}),M.find("input").inputmask&&$.each(M.find("input"),function(){var e=$(this);e.attr("notmasked")||e.inputmask({})})},Parameter=function(e){e||(e={});var p=this;return p.type=(e.type||"NUMBER").toLowerCase(),p.name=e.name||"",p.id=e.id||makeid(),p.defaultValue=e.defaultValue,p.order=e.order||0,p.require=e.require||!1,p.options=e.options||{},p.canClear=!0,p.patterns=e.patterns||[],!1===e.canClear&&(p.canClear=e.canClear),p.possibleValues=e.possibleValues||[],p.possibleValuesLabels=e.possibleValuesLabels||[],p.value=e.value||null,p.defaultValuesTemplate=e.defaultValuesTemplate||null,p.currency=e.currency||null,p.app=e.app,p.upload=e.upload,p.uploadTemplate=e.uploadTemplate,p.previewTemplate=e.previewTemplate,p.previewPath=e.previewPath,p.onLive=e.onLive,p.hidden=e.hidden||!1,p.groupId=e.groupId||0,p.dbId=e.dbId||null,p.convert=e.convert||null,p.dbConvert=e.dbConvert||null,p.dbType=e.dbType||null,p.dbFunc=e.dbFunc||"equal",p._onChange=e._onChange||null,p.onType=e.onType||null,p.description=e.description||"",p.format=e.format||{},p.placeholder=e.placeholder||"",p.autoSearch=e.autoSearch||!1,p.html=e.html||!1,p.operatorSelect=e.operatorSelect||null,p.operator=e.operator||null,p.if=e.if||null,-1<p.type.indexOf("range")&&(p.dbFunc="fromto"),p.removeImage=function(t){new Img({type:p.upload.data.essense,name:t.value,app:p.app,refId:p.upload.data.essense.RefID}).remove(function(e){removeEqual(p.value,t.value),t.clbk&&t.clbk(e)})},p.isValid=function(t){void 0===t&&(t=p.value);var e=p.mask();if("number"!=p.type&&"cash"!=p.type||(t=Number(t).toFixed(deep(p,"format.Precision")||0)),"hours"==p.type)return!0;if("color"==p.type)return!0;if("date"==p.type||"daterange"==p.type)return!0;if("html"==p.type||"text"==p.type)return!(p.require&&!t);var n=!0;if(_.each(p.patterns,function(e){e.test(t)||(n=!1)}),!n)return!1;if(("values"==p.type||"valuesmultibig"==p.type)&&p.autoSearch){var a=_.find(p.possibleValues,function(e){if(e.toLowerCase()==t.toLowerCase())return!0});return!!a&&a.toUpperCase()}if("boolean"==p.type)return!0;if(!(p.require||t&&0!=t))return!0;var i=Inputmask.isValid(t.toString(),e);return!p.require||t&&0!=t||(i=!1),"number"!=p.type&&"cash"!=p.type||_.isNumber(Number(t))||(i=!1),i},p.openGallery=function(e){e||(e={});var t=_.map(p.value,function(e){return new Img({type:p.upload.data.essense,name:e,app:p.app})});e=_.extend(e,{images:t,essense:p.upload.data.essense,size:"full",smallSize:"thumbnail",edit:!0}),p.app.nav.api.load({open:!0,id:"imageGallery",inWnd:!0,essenseData:e})},p.default=function(){var e={string:"",number:0,percent:0,dollars:0,text:"",category:0,html:"",location:{country:"US",latitude:40.73387539871257,longitude:-73.98949970898434,place:"New York, NY 10003, USA",radius:1e4,zip:"10003",using:!0},valuesmulti:[],values:"",boolean:!1,cash:0,image:[],numberrange:["",""],cashrange:["",""],hours:{},valuesmultibig:[],valuescustom:"",valuesmultitree:[],phone:"",color:"#1E3DF7",date:"",daterange:["",""],email:""};return void 0!==p.defaultValue?p.defaultValue:p.type&&void 0!==e[p.type]?e[p.type]:0},p.renders={category:function(e){var t=p.app.store.categories.find(p.value||"0");return t?t.htmlpath():""},boolean:function(e){var t="",n="";return p.value&&"0"!=p.value&&(n="checked"),t+='<input pid="'+p.id+'" type="checkbox" disabled id="checkbox_'+p.id+'"'+n+' class="checkbox nolabel '+p.type+'" />',t+='<label for="checkbox_'+p.id+'"></label>'},numberrange:function(e,t){return p.value[t]},cashrange:function(e,t){return p.value[t]}},p.mask=function(e){var t=!1,n={rightAlign:!1,autoUnmask:!0};if("number"!=p.type&&"cash"!=p.type||(n.alias="numeric",n.groupSeparator=",",n.radixPoint=".",n.digits=deep(p,"format.Precision"),n.digitsOptional=!1,n.autoGroup=!0,n.allowMinus=deep(p,"format.AllowMinus")||!1,0<n.digits&&(n.placeholder="0.00"),t=!0),"numberrange"!=p.type&&"cashrange"!=p.type||(n.alias="numeric",n.nullable=!0,n.groupSeparator=",",n.autoGroup=!0,n.digits=deep(p,"format.Precision"),t=!0),"email"==p.type&&(n.alias="email",t=!0),"string"==p.type){var a=[0,""];p.require&&(a[0]=1),p.format.Length&&(a[1]=p.format.Length),n.regex="[а-яА-Яa-zA-Z0-9 ,-.&]{"+a.join(",")+"}",t=!0}return t?(e&&(n='data-inputmask="'+(n=(n=(n=JSON.stringify(n)).substring(1)).substring(0,n.length-1).replace(/"/g,"'"))+'"'),n):e?"":null},p.labelByValue=function(e){var t=_.indexOf(p.possibleValues,e);return-1<t?p.possibleValuesLabels[t]:e},p.operatorInput=function(){if(!p.operatorSelect)return"";var n='<div class="operator"><select class="operatorselect">';return _.each(p.operatorSelect,function(e){var t="";e.id==p.operator&&(t="selected"),n+="<option "+t+' + value="'+e.id+'">'+e.name+"</option>"}),n+="</select></div>"},p.input=function(e){e||(e={});var t=p.mask(!0);if("image"==p.type&&p.uploadTemplate&&p.upload&&p.previewTemplate)return p.uploadTemplate(p);if("location"==p.type){var n="checked",a="",i="";return p.value.using||(n="",a="notused",i='disabled="disabled"'),'<div pid="'+p.id+'" class="locationInputWrapper '+a+'"><div class="table locationInputs"><div class="locationInputUse"><input type="checkbox" id="checkbox_'+p.id+'_location" '+n+' class="checkbox nolabel" /><label for="checkbox_'+p.id+'_location"></label></div><div class="locationInput place"><input type="text" notmasked="notmasked" placeholder="Name Of Place"></div><div class="locationInput radius"><select><option value="1000">1 mi</option><option value="5000">5 mi</option><option value="10000">10 mi</option><option value="20000">20 mi</option><option value="50000">50 mi</option><option value="100000">100 mi</option><option value="500000">500 mi</option></select></div></div><div class="mapwr"><div class="map"></div><div class="mapbwoverlay"></div></div></div>'}if("valuescustom"==p.type||"values"==p.type||"valuesmultibig"==p.type){i="";var r=p.value;"valuesmultibig"==p.type&&(r=""),"values"!=p.type||p.autoSearch||(i="disabled"),"values"!=p.type&&"valuescustom"!=p.type||(r=p.labelByValue(p.value));var o="";o+='<div class="vc_iconWrapper">',o+='<div class="vc_iconSpinWrapper">',o+='<i class="fa fa-caret-down" aria-hidden="true"></i>',o+="</div>",o+="</div>";var s="";return"valuesmultibig"==p.type?(s+='<div class="vc_valuecustom_multibig" pid="'+p.id+'">',s+='<div class="vc_valuecustom">'):s+='<div class="vc_valuecustom" pid="'+p.id+'">',s+='<div class="vc_textInput table">',p.format.right&&(s+=o),s+='<div class="vc_inputWrapper">',s+="<input "+i+' type="text" value="'+r+'" placeholder="'+p.placeholder+'">',s+="</div>",p.format.right||(s+=o),s+="</div>",s+='<div class="vc_selectInput">',p.defaultValuesTemplate?s+=p.defaultValuesTemplate(p):(p.defaultValue||(s+='<div class="vc_value" value="">',s+="&nbsp;",s+="</div>"),_.each(p.possibleValues,function(e,t){if(!("valuesmultibig"==p.type&&-1<_.indexOf(p.value,e.toUpperCase()))){var n=p.labelByValue(e);s+='<div class="vc_value" value="'+e+'">',s+=n,s+="</div>"}})),s+="</div>",s+="</div>","valuesmultibig"==p.type&&(s+='<div class="vc_selected_values">',_.each(p.value,function(e,t){var n=p.labelByValue(e);s+='<div class="vc_selected_value table" value="'+e+'">',s+='<div class="vc_selected_value_icon">',s+='<i class="fas fa-times-circle"></i>',s+="</div>",s+='<div class="vc_selected_value_value">',s+=n,s+="</div>",s+="</div>"}),s+="</div>",1<p.value.length&&(s+=p.operatorInput()),s+="</div>"),s}if("text"==p.type||"html"==p.type)return s='<textarea placeholder="'+p.placeholder+'" notmasked="notmasked" pid="'+p.id+'" class="'+p.type+' ">'+p.render(!0)+"</textarea>";if("category"==p.type){var l=p.app.store.categories.find(p.value||"0");if(l&&l.canCreateItem())var s='<div parent="'+l.parent.path()+'" pid="'+p.id+'" class="editCategoryPath">'+l.htmlpath()+"</div>";else var s='<button pid="'+p.id+'" class="selectCategoryPath">Select Category</button>';return s}if("valuesmulti"==p.type){var s='<div class="vm_valuesmulti" pid="'+p.id+'">';return _.each(p.possibleValues,function(e,t){var n="",a=e;p.possibleValuesLabels[t]&&(a=p.possibleValuesLabels[t]),p.options.valueTemplate&&(a=p.options.valueTemplate(e,a)),-1<_.indexOf(p.value,e)&&(n="checked"),5==t&&(s+='<div class="vm_showMore">Show More</div>',s+='<div class="vm_hidden">',s+='<div class="vm_hideMore">Hide</div>'),s+='<div class="vm_value">',s+='<input val="'+e+'" type="checkbox" id="checkbox_'+p.id+"_"+e+'"'+n+' class="checkbox nolabel '+p.type+'" />',s+='<label for="checkbox_'+p.id+"_"+e+'">'+a+"</label>",s+="</div>"}),6<=p.possibleValues.length&&(s+='<div class="vm_hideMore">Hide</div>',s+="</div>"),s+="</div>"}if("valuesmultitree"==p.type){var u=null,s='<div class="vmt_valuesmultitree" pid="'+p.id+'">';if(p.autoSearch&&(s+='<div class="autoSearchWrapper"><input type="text" class="autoSearch" placeholder="Search Code"></div>'),e.init){var c={},d={};_.each(p.value,function(e){var t=p.treemap[e];t&&(d[e]=t,_.each(t.parents,function(e){c[e.id]=!0}))}),u={group:function(e){if(c[e.id])return e.active=!0},value:function(e){return!0}}}p.renderLevel=function(e,t,o){var s="";s+='<div class="nextlevel">';return p.every({group:function(e,t,n,a){var i=e.name,r=e.active||o&&o.group(e);p.options.valueTemplate&&(i=p.options.valueTemplate(e)),(r||!o||o.value(e))&&(s+='<div class="vmt_group " level="'+t+'" groupid="'+e.id+'">',s+='<div class="vmt_name table">',s+='<div class="vmt_checkbox">',s+='<input type="checkbox" value="'+e.id+'" id="checkbox_'+p.id+e.id+'" class="checkbox" />',s+='<label for="checkbox_'+p.id+e.id+'">'+i+"</label>",s+="</div>",s+='<div class="vmt_panel">',s+='<div class="vmt_panel_wrapper">',s+='<i class="fa fa-angle-up" aria-hidden="true"></i>',s+="</div>",s+="</div>",s+="</div>",s+='<div class="vmt_group_params">',r&&(s+='<div class="nextlevel">',a(),s+="</div>"),s+="</div>",s+="</div>")},value:function(e,t,n){if(!o||o.value(e)){var a=e.name;p.options.valueTemplate&&(a=p.options.valueTemplate(e)),s+='<div class="vmt_value" level="'+t+'" groupid="'+e.id+'">',s+='<div class="vmt_checkbox">',s+='<input type="checkbox" value="'+e.id+'" id="checkbox_'+p.id+e.id+'" class="checkbox" />',s+='<label for="checkbox_'+p.id+e.id+'">'+a+"</label>",s+="</div>",s+="</div>"}}},e,t),[s+="</div>",!1]};var f=p.renderLevel(null,0,u);return s+='<div class="chinputsv">',s+=f[0],s+="</div>",s+="</div>"}if("boolean"==p.type){var s="";n="";return p.value&&"0"!=p.value&&(n="checked"),s+='<input pid="'+p.id+'" type="checkbox" id="checkbox_'+p.id+'"'+n+' class="checkbox nolabel '+p.type+'" />',s+='<label for="checkbox_'+p.id+'"></label>'}if("cash"==p.type){s='<div class="cashWrapper" pid="'+p.id+'">';return s+='<div class="inputCashWrapper">',s+="<input "+t+' class="'+p.type+' input" value="'+p.render(!0)+'">',s+="</div>",p.currency&&(s+='<div class="convertCashWrapper">',s+='<div class="convertValue">'+p.app.store.cash.toBTC(p.value,p.currency,!0)+"</div>",s+="</div>"),s+="</div>"}if("cashrange"==p.type){s='<div class="cashrangeWrapper" pid="'+p.id+'">';return s+='<div class="inputsCashrangeWrapper">',s+='<div class="inputCashrangeWrapper">',s+='<input index="0" '+t+' class="'+p.type+' input" placeholder="From" value="'+p.render(!0,0)+'">',s+="</div>",s+='<div class="inputCashrangeWrapper">',s+='<input index="1" '+t+' class="'+p.type+' input" placeholder="To" value="'+p.render(!0,1)+'">',s+="</div>",s+="</div>",p.currency&&(s+='<div class="convertsCashrangeWrapper">',s+='<div class="convertCashrangeWrapper">',s+='<div class="convertValue" index="0">'+p.app.store.cash.toBTC(p.value[0],p.currency,!0)+"</div>",s+="</div>",s+='<div class="convertCashrangeWrapper">',s+='<div class="convertValue" index="1">'+p.app.store.cash.toBTC(p.value[1],p.currency,!0)+"</div>",s+="</div>",s+="</div>"),s+="</div>"}if("numberrange"==p.type){s='<div class="numberrangeWrapper" pid="'+p.id+'">';return s+='<div class="inputNumberrangeWrapperFrom">',s+='<input index="0" '+t+' class="'+p.type+' input" placeholder="From" value="'+p.render(!0,0)+'">',s+="</div>",s+='<div class="inputNumberrangeWrapperTo">',s+='<input index="1" '+t+' class="'+p.type+' input" placeholder="To" value="'+p.render(!0,1)+'">',s+="</div>",s+="</div>"}if("color"==p.type)return s='<input notmasked="notmasked" pid="'+p.id+'" class="simpleColor input" value="'+p.value+'">';if("daterange"!=p.type)return s="daterange"==p.type?'<input notmasked="notmasked" pid="'+p.id+'" class="datePicker input">':"phone"==p.type?'<input notmasked="notmasked" pid="'+p.id+'" class="'+p.type+' input" value="'+p.render(!0)+'" type="text">':p.autoSearch?'<div class="vc_autosearchInput">\t\t\t\t<div class="placeholder"><div class="placeholderghost">&nbsp;</div></div>\t\t\t\t<div class="autosearchInputCnt">\t\t\t\t<input notmasked="notmasked" '+t+' pid="'+p.id+'" class="'+p.type+' input" placeholder="'+(p.placeholder||"")+'" value="'+p.render(!0)+'" type="text">\t\t\t\t</div></div>':"<input "+t+' pid="'+p.id+'" class="'+p.type+' input" value="'+p.render(!0)+'" type="text">';s='<div class="numberrangeWrapper" pid="'+p.id+'">';return s+='<div class="inputNumberrangeWrapperFrom">',s+='<input notmasked="notmasked" pid="'+p.id+'" class="datePicker input from" placeholder="From">',s+="</div>",s+='<div class="inputNumberrangeWrapperTo">',s+='<input notmasked="notmasked" pid="'+p.id+'" class="datePicker input to" placeholder="To">',s+="</div>",s+="</div>"},p.render=function(e,t){return p.renders[p.type]?p.renders[p.type](e,t):_.isArray(p.value)&&void 0!==t?p.value[t]||"":p.value},p.sets={hours:function(e,t,n){p.value[t]||(p.value[t]={start:null,end:null}),p.value[t][n]=e},location:function(e){e?(e.country&&(p.value.country=e.country),e.latitude&&(p.value.latitude=e.latitude),e.longitude&&(p.value.longitude=e.longitude),e.place&&(p.value.place=e.place),e.radius&&(p.value.radius=e.radius),e.zip&&(p.value.zip=e.zip),void 0!==e.using&&(p.value.using=e.using)):p.value=p.default()},number:function(e){e=Number(e),p.value=e},numberrange:function(e,t){""!==e&&(e=Number(e)),_.isNumber(e)||(e=""),p.value[t]=e},cash:function(e){e=Number(e),_.isNumber(e)||(e=null),p.value=e},cashrange:function(e,t){""!==e&&(e=Number(e)),_.isNumber(e)||(e=""),p.value[t]=e},daterange:function(e,t){p.value[t]=e},image:function(e){"array"!=typeof e&&e?p.value.push(e):p.value=e},valuesmulti:function(e){-1<_.indexOf(p.value,e)?removeEqual(p.value,e):p.value.push(e)},valuesmultibig:function(e){-1<_.indexOf(p.value,e)?removeEqual(p.value,e):p.value.push(e)},valuesmultitree:function(e){p.value=e}},p.set=function(e,t,n){"___nochange"==e||(void 0===e?p.value=p.default():(p.calculation&&(e=p.calculation(e)),p.sets[p.type]?p.sets[p.type](e,t,n):p.value=e)),p._onChange&&p._onChange(p.value,p),p.onChange&&p.onChange(p.value,p)},p.get=function(){return p.dbConvert?p.dbConvert(p.value):p.value},"valuesmultitree"==p.type&&(p.clear=function(){_.each(p.treemap,function(e){e.active=!1})},p.convertValuesToAll=function(i,r){i||(i="id"),"names"==i&&(i="name");var e=_.map(p.value,function(e){return p.treemap[e]}),o=[];return p.every({group:function(e,t,n,a){r&&o.push(e[i]),a()},value:function(e){o.push(e[i])}},e),o},p.convertValues=function(t){return t||(t="id"),"names"==t&&(t="name"),_.map(p.value,function(e){return p.treemap[e][t]})},p.composeValues=function(e,n){var a={};return _.each(p.value,function(e,t){n[e]||(a[e]=!0)}),_.each(e,function(e,t){n[t]||(a[t]=!0)}),a},p.childselected=function(e,t,n){var a=p.composeValues(t,n),i=_.filter(e.values,function(e){if(a[e.id])return!0});return e.values.length==i.length},p.parentselected=function(e,t,n){var a=p.composeValues(t,n),i=function(e){return a[e.id]?e:e.parent?i(e.parent):null};return e?i(e):null},p.every=function(i,e,t){var r=function(e,t){for(var n=e.length,a=0;a<n;a++)value=e[a],value&&(value.values?i.group(value,t,a,function(){r(value.values,t+1)},a):i.value(value,t,a))};e||(e=p.possibleValues),t||(t=0),r(e,0)},p.preparemap=function(){p.treemap={},p.every({value:function(e,t){e.active=!1,p.treemap[e.id]=e},group:function(e,t,n,a){p.treemap[e.id]=e,_.each(e.values,function(t){t.parent=e,t.parents||(t.parents=[e]),_.each(e.parents||[],function(e){t.parents.push(e)})}),a()}})},p.preparemap()),p.searchValues=function(t){t=t.toLowerCase();var n={},i=function(e){(e.id==t||-1<e.name.toLowerCase().indexOf(t))&&(n[e.id]=e)};return p.every({group:function(e,t,n,a){i(e),a()},value:i}),n},null===p.value&&(p.value=p.default()),p},Composite=function(e){e||(e={}),e.type="composite";var i=new Parameter(e);return i.content={},i.template=e.template,i.add=function(e,t){(i.content[e]=t)._onChange=function(){i.collectValues()}},_.each(e.parameters,function(e,t){i.add(t,e)}),i.collectValues=function(){var n={};_.each(i.content,function(e,t){e.value&&(n[t]=e.value)}),i.set(n)},i.applyValues=function(){_.each(i.content,function(e,t){var n=i.value[t];void 0!==n&&(e.value=n,e.applyValues&&e.applyValues())})},i.isValid=function(e,n){var a=!0;return _.each(i.content,function(e){var t=e.isValid(void 0,n);a=a&&t,t||console.log("ADDERROR",e),!t&&"composite"!=t.type&&n&&e.require?e.el.addClass("error"):e.el.removeClass("error")}),a},i.input=function(){var e='<div class="composite" pid="'+i.id+'">';return e+=i.template({content:i.content}),e+="</div>"},i.render=i.input,i},makeid=function(e){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}if(!e)return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t();for(var n="",a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",i=0;i<32;i++)n+=a.charAt(Math.floor(Math.random()*a.length));return n},makesystemid=function(e){var t=makeid(e);return t=("afafafaf"+t.substr(8)).replace(/-/g,"")},MD5=function(e){return result=M(V(Y(X(e),8*e.length))),result.toLowerCase()},flb=function(e){return e?e[0].toUpperCase()+e.substr(1):""},emptyFunction=function(){return!0},isMobile=function(){return $("html").hasClass("mobile")},isTablet=function(){return $("html").hasClass("mobile")||$("html").hasClass("tablet")},convertToBase64=function(e){var t=";base64,",n=e.indexOf(t)+t.length,a=e.substring(n);return window.atob(a)},os=function(){var e=null;return-1!=navigator.appVersion.indexOf("Win")&&(e="windows"),-1!=navigator.appVersion.indexOf("Mac")&&(e="macos"),-1!=navigator.appVersion.indexOf("X11")&&(e="unix"),-1!=navigator.appVersion.indexOf("Linux")&&(e="linux"),e},parameters=function(e,t){if(e||"undefined"==typeof window){if(t){var n=e.split("?");e=n[1]?n[1]:""}}else e=_SEO?_SEOuri.split("?")[1]:window.location.search.substr(1);if(/^([A-Za-z0-9]*)$/.test(e))return e||{};var a={};for(p in uParts=e.split("&"),uParts){uParts[p]=uParts[p].split("=");var i=_.clone(uParts[p]);i.splice(0,1),a[uParts[p][0]]=decodeURI(i.join("=").replace(/!!/g,"&"))}return a},collectParameters=function(e,n){var a="?";return _.each(e,function(e,t){n&&-1!=_.indexOf(n,t)||!e||(a+=t+"="+e+"&")}),a=a.slice(0,-1)},rand=function(e,t){return e=parseInt(e),t=parseInt(t),Math.floor(Math.random()*(t-e+1))+e},trim=function(e){return rtrim(ltrim(e))},ltrim=function(e){return(e||"").replace(/^\s+/,"")},rtrim=function(e){return(e||"").replace(/\s+$/,"")},returnDaysInRange=function(e){var t;if("ytd"==e){var n=new Date,a=new Date(dateUtc(n).y,0,1);t=((n.getTime()-a.getTime())/1e3/60/60/24).toFixed(0)}return"5d"==e&&(t=5),"1m"==e&&(t=31),"2m"==e&&(t=62),"3m"==e&&(t=93),"6m"==e&&(t=186),"1y"==e&&(t=365),"2y"==e&&(t=730),"3y"==e&&(t=1096),"5y"==e&&(t=1825),"10y"==e&&(t=3652),"max"==e&&(t=1e5),t},maskValue=function(e){e||(e={}),e.decimal||(e.decimal="."),e.allowNegative||(e.allowNegative=!0),e.precision||(e.precision=0),e.thousands||(e.thousands=","),e.prefix||(e.prefix=""),e.suffix||(e.suffix=""),e.value&&(e.value=""+e.value);var t,n,a,i=e.value||"0",r=-1<i.indexOf("-")&&e.allowNegative?"-":"",o=i.replace(/[^0-9]/g,""),s=o.slice(0,o.length-e.precision);""===(s=(s=s.replace(/^0*/g,"")).replace(/\B(?=(\d{3})+(?!\d))/g,e.thousands))&&(s="0"),t=s,0<e.precision&&(n=o.slice(o.length-e.precision),a=new Array(e.precision+1-n.length).join(0),t+=e.decimal+a+n);return-1<i.indexOf("-")&&(i=i.replace("-",""),"-"),r+e.prefix+t+e.suffix},Math.log2=Math.log2||function(e){return Math.log(e)/Math.LN2},progressBar=function(e){(e||e.el)&&(100<=e.progress&&(e.progress=0),100<=e.progress&&(e.status=""),100<=e.progress&&(e.addStatus=""),null!=typeof e.progress&&e.el.find(".bar").width(e.progress+"%"),null!=typeof e.status&&e.el.find(".status").html(e.status),null!=typeof e.addStatus&&e.el.find(".addStatus").html(e.addStatus))},importScripts=function(e,t,n,a,i,r){void 0===i||null==i?i=0:i++,i==e.length?n():t[e[i].src]?importScripts(e,t,n,a,i,r):importScript(e[i].src,function(){t[e[i].src]=!0,importScripts(e,t,n,a,i,r)},a,r,e[i].module,e[i].require)},importScript=function(e,t,n,a,i,r){if(_Node||"undefined"!=typeof _Electron&&1==_Electron){e=e.split("?")[0];var o="../";if("undefined"!=typeof _Electron&&1==_Electron&&(o="./"),i){delete require.cache[require.resolve(o+e)];var s=require(o+e);a.modules[i]={module:s},a.modules[i].module.app=a}else r?r():require(o+e);t()}else{s=document.createElement("script");n||(n=document.getElementsByTagName("head")[0]),s.readyState&&!s.onload?s.onreadystatechange=function(){"loaded"!=s.readyState&&"complete"!=s.readyState||(s.onreadystatechange=null,t())}:s.onload=t,e+="?v=129",s.src=e,n.appendChild(s)}},importCss=function(e){var t=document.createElement("link");t.rel="stylesheet",e+="?v=127",t.setAttribute("href",e),document.getElementsByTagName("head")[0].appendChild(t)},GetBrowser=function(){var e,t=navigator.appName,n=navigator.userAgent,a=n.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);return a&&null!=(e=n.match(/version\/([\.\d]+)/i))&&(a[2]=e[1]),(a=a?[a[1],a[2]]:[t,navigator.appVersion,"-?"])[0]},_saveAs=function(e){if(window.navigator.msSaveOrOpenBlob){var t=new Blob([decodeURIComponent(e.file)],{type:"text/"+e.format+";charset=utf-8;"});window.navigator.msSaveOrOpenBlob(t,e.name+"."+e.format)}else saveAs(e)},saveAs=function(e){if("msie"==GetBrowser().toLowerCase())return message("Internet Explorer does not support this operation."),!1;e||(e={});var t=document.createElement("a");return document.body.appendChild(t),t.download=e.download||(e.name||"unknown")+"."+e.format.toLowerCase(),t.target="_blank",e.noA||("xlsx"==e.format.toLowerCase()&&(e.file="data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,"+e.file),"csv"==e.format.toLowerCase()&&(e.file="data:text/csv;charset=utf-8,"+e.file),"pdf"==e.format.toLowerCase()&&(e.file="data:application/pdf;base64,"+e.file),"txt"==e.format.toLowerCase()&&(e.file="data:text;charset=utf-8,"+e.file)),t.href=e.file,t.click(),!0},initUp=function(e,t){t||(t={});var n=this,a=$(window),i={up:{up:function(){t.scrollTop?t.scrollTop():_scrollTop(0)}}.up,view:function(){200<a.scrollTop()?e.fadeIn(100):e.fadeOut(100)}};return n.destroy=function(){e.off("click",i.up),window.removeEventListener("scroll",i.view)},n.init=function(){return e.on("click",i.up),window.addEventListener("scroll",i.view),n},n},_scrollTop=function(e,t,n){t||(t=$("body,html")),n||(n=200),t.animate({scrollTop:e},n)},_scrollTo=function(e,t,n){e||(e=$(this));var a=e.offset(),i=(e.height()-$(window).height())/2;if(a){var r=a.top+i;t&&(r=r+t.scrollTop()-t.offset().top),_scrollTop(r,t,n)}},_scrollToTop=function(e,t,n,a){e||(e=$(this)),a||(a=0);var i=e.offset();if(console.log(i),i){var r=i.top+a;t&&(r=r+t.scrollTop()-t.offset().top),_scrollTop(r,t,n)}},offScroll=function(){if("undefined"!=typeof window){var e=$(window).scrollTop();$(window).bind("scroll",function(){$(window).scrollTop(e)})}},onScroll=function(){"undefined"!=typeof window&&$(window).unbind("scroll")},inView=function(e,o){o||(o={}),o.inel||(o.inel=window),o.offset||(o.offset=0),o.f||(o.f="offset"),o.elOffset=0;try{o.elOffset=o.inel[o.f]().top}catch(e){o.elOffset=0}o.mode||(o.mode="part");var t=$(o.inel),s=t.scrollTop(),n=t.height(),l={top:s-o.offset,bottom:s+n+o.offset},u=s+o.offsetTop,c=s+n-o.offsetBottom,a=e.filter(function(){var e=$(this),t=e[o.f]().top,n=e.height(),a=t+n,i=l.top<=t&&t<l.bottom||a<=l.bottom&&l.top<a,r=l.top<=t&&a<=l.bottom;if(o.debug&&console.log("range.top, range.bottom, offsetTop, bottom",l.top,l.bottom,t,a),"line"==o.mode)return t-s<u&&c<t+n;if("partall"==o.mode){if(r)return e.data("inView","all"),!0;if(i)return e.data("inView","part"),!0}return!("part"!=o.mode||!i)||(!("all"!=o.mode||!r)||void 0)});return"partall"==o.mode&&(a=a.sort(function(e,t){return e=$(e),t=$(t),e.data("inView")==t.data("inView")?0:"all"==e.data("inView")?-1:"part"==e.data("inView")?1:void 0})),a},Roller=function(e){e||(e={});var f=this;f.inner=e.inner||".cnt",f.selector=e.selector||".roller",f.elements=e.elements,f.offset=e.offset||0;var t=e.cnt,a={},p={},v=$(window),h={},n=function(){var n,u=i(),c=(u.offset().top,u.height()),d=v.height(),e=(n=[],_.each(a,function(e,t){n.push({id:t,e:e})}),n=_.sortBy(n,function(e){return-e.e.find(f.inner).height()}));_.each(e,function(e){var t,n,a=e.e,i=e.id;if(a!=u){var r=a.find(f.inner),o=(t=a.offset().top,0<(n=v.scrollTop()-t+f.offset)?n:0),s=r.height(),l=s-(d-f.offset);0<l&&(o-=l),o+s<=c||(o=c-s),o<0&&(o=0),p[i].height(o),h[i]=o}else p[i].height(0)})},i=function(){return _.max(a,function(e){return e.find(f.inner).height()})};return f.clear=function(){_.each(p,function(e){e.height(0)})},f.init=function(){return f.elements||(f.elements=t.find(f.selector)),f.elements.each(function(){var e=$(this),t=e.find(f.inner),n=e.attr("roller");a[n]=e,p[n]=$("<div>",{class:"pre"}),t.before(p[n])}),window.addEventListener("scroll",n),f},f.apply=function(){return f.clear(),n(),f},f.destroy=function(){f.clear(),window.removeEventListener("scroll",n)},f},Caption=function(i){var r=i.container,o=i.caption,s=i.offset||[0,0],l=!1,u=i._in||$(window),c=null,d=makeid(!0),f=i.pos||"top",p="cf_spacer",v="cf_caption",h=this;h.addscroll=!1,i._in&&(h.addscroll=!0);var m=function(){c&&c.remove(),c=null,r.find("."+p+"."+d).remove(),o.removeClass(v),o.width("auto"),o.css(f,"0"),l=!1},g=function(){l&&o.width(r.width())},t=function(){if(r.is(":visible")){var e=u.scrollTop(),t=r.position().top-s[0],n=r.position().top+r.height()-s[0]+s[1];h.addscroll&&(t+=e,n+=e),void 0!==i.iniHeight?n-=i.iniHeight:n-=o.height();var a=e+u.height();i.calculations&&(i.calculations.bottom&&(n=i.calculations.bottom(o,s)),i.calculations.top&&(t=i.calculations.top(o,s))),"top"==f&&t<e&&e<n||"bottom"==f&&t<a&&a<n+o.height()?function(){if(l)g();else{m(),l=!0;var e=0;e=i.removeSpacer?r.width():(c=$("<div>",{class:p+" "+d,height:o.height(),width:o.width()}),o.before(c),c.width()),o.addClass(v),o.css(f,s[0]+"px"),o.css("z-index","100"),o.width(e)}}():m()}},n=function(){u[0].addEventListener("scroll",t),window.addEventListener("resize",g)},a=function(){u[0].removeEventListener("scroll",t),window.removeEventListener("resize",g)};return h.destroy=function(){m(),a()},h.init=function(){return r||(r=o.parent()),n(),h},h.setOffset=function(e){s=e,m(),t()},h.setIn=function(e){e||(e=$(window)),u=e,a(),n(),m(),t()},h.action=t,h.clear=m,h},AJAX=function(e){var v=this,h=e.user||!1,m=e.server||!1,g=e,y={};return _Node||$.ajaxSetup({cache:!1}),v.set={user:function(e){h=e}},v.clearCashe=function(){y={}},v.run=function(i){i||(i={});var e=i.url||m,a=i.dataType||"json",t=i.type||"POST",r=i.dataCashe||!1,n=i.data||{},o=i.action+"."+toDeepKey(n);if(!1===h||!h.extendAjaxData||i.anon&&!0===i.anon||i.imgur||h.extendAjaxData(n,e),r){var s=deep(y,o);if(s)return void(i.success&&i.success(_.clone(s)))}if("undefined"!=typeof performance)var l=performance.now();var u=function(e){if(g.errorHandler&&g.errorHandler(e))return;if(!1!==h&&(!i.anon||!0!==i.anon)){JSON.stringify(n,null,4);!_Node&&window.design}},c={json:function(e){var t,n=e;n.root&&(n=n.root),i.imgur?n.success&&(t="success"):(t=(n.Result||n.status||"").toLowerCase())||!n.result||n.error||(t="success"),t?"success"!=t&&"ok"!=t?(void 0!==i.errors&&1!=i.errors||u(t),"wrong token"==t&&g.unathorizated&&g.unathorizated(),i.fail&&i.fail(n)):(r&&deepInsert(y,o,_.clone(n)),i.success&&(!1!==h&&!i.noExtend&&h.extendFromAjaxData&&h.extendFromAjaxData(n),i.success(n))):(u("noResult"),i.fail&&i.fail())},html:function(e){i.success&&i.success(e)}};if(i.before&&i.before(),i.preloader&&preloader(!0),_Node){var d={method:t,uri:e,rejectUnauthorized:!1};n&&(d.body=collectParameters(n).substr(1)),request(d,function(e,t,n){if(e){if(u(e),_SEO)return void v.run(i);i.fail&&i.fail(null)}else if("json"==a){try{n=JSON.parse(n)}catch(e){u("Unexpected end of input TE"),i.fail&&i.fail(null)}c.json(n)}else c.html(n)})}else{var f,p={type:t,url:e,data:n,dataType:a,headers:i.headers,beforeSend:i.beforeSend,success:function(e){var t;i.preloader&&preloader(!1),t=function(){c[a](e)},"undefined"!=typeof performance?(l=performance.now()-l,i.timeout&&i.timeout>l?setTimeout(function(){t()},i.timeout-l):t()):t()},error:function(e,t,n){var a=null;i.preloader&&preloader(!1),e.responseText?(a=JSON.parse(e.responseText),void 0!==i.errors&&1!=i.errors||u(a.status)):u(null),i.fail&&i.fail(a)}};if(i.imgur)if(p.url=g.imageServer+n.Action,delete n.Action,h)f=h.imgur.token?"Bearer "+h.imgur.token:"Client-ID "+h.imgur.clientId,p.headers={Authorization:f,Accept:"application/json"};$.ajax(p)}},v.api=function(e){e.url=g.apiproxy+"/"+(e.action||""),v.run(e)},v.rtchttp=function(e){e.url=g.rtchttp+"/"+(e.action||"").split(".").join("/"),v.run(e)},v.rpc=function(t){if(t.action="rpc",t.data={method:t.method,parameters:hexEncode(JSON.stringify(t.parameters||"")),node:g.platform.nodeid},void 0===t.nodeFix){var n=t.fail;t.nodeFix=Number(g.platform.nodeid||"1"),t.fail=function(e){!e||500!=e.statusCode||e.data&&!_.isEmpty(e.data)?n(e):(g.platform.autochange(),g.platform.nodeid==t.nodeFix?n(e):v.rpc(t))}}var a=t.success;t.success=function(e){a(deep(e,"data.result")||e)},v.api(t)},v},jsonrpc={CallStack:function(e,t,n,a){this._counter=0,this._enterFn=e,this._exitFn=n,this._enterScope=t,this._exitScope=a}},jsonrpc.CallStack.prototype={enter:function(){this._counter=this._counter<0?1:this._counter+1,1===this._counter&&this._enterFn.apply(this._enterScope,arguments)},exit:function(e){this._counter-=1,0===this._counter&&this._exitFn.apply(this._exitScope,arguments)}},jsonrpc.DelayedTask=function(e,t,n){this._fn=e||function(){},this._scope=t||void 0,this._args=n||[],this._id=null},jsonrpc.DelayedTask.prototype={delay:function(e,t,n,a){var i=this;this._fn=t||this._fn,this._scope=n||this._scope,this._args=a||this._args,this.cancel(),this._id=window.setInterval(function(){window.clearInterval(i._id),i._id=null,i._fn.apply(i._scope,i._args)},e)},cancel:function(){this._id&&(window.clearInterval(this._id),this._id=null)}},jsonrpc.JsonRpc=function(e){this._url=e,this.loading=new jsonrpc.Observable,this.loaded=new jsonrpc.Observable,this.unhandledFailure=new jsonrpc.Observable,this._loadingState=new jsonrpc.CallStack(this.loading.trigger,this.loading,this.loaded.trigger,this.loaded),this._requests=[],this._batchingMilliseconds=10,this._delayedTask=new jsonrpc.DelayedTask},jsonrpc.JsonRpc.prototype={setBatchingMilliseconds:function(e){this._batchingMilliseconds=e},call:function(){var e=this._getParams.apply(this,arguments);this._loadingState.enter(),this._requests.push(e),this._batchingMilliseconds?this._delayedTask.delay(this._batchingMilliseconds,this._sendRequests,this):this._sendRequests()},_sendRequests:function(){var a,i=this,r=this._requests,e=[];for(this._requests=[],a=0;a<r.length;a+=1)r[a].request.id=a,e.push(r[a].request);1===e.length&&(e=e[0]),i._doJsonPost(i._url,e,function(e,t){var n;if(e)n=i._isArray(t)?t:[t];else for(n=[],a=0;a<r.length;a+=1)n[a]={id:a,error:{message:t}};i._handleResponses(r,n)})},_handleResponses:function(e,t){var n,a,i;for(n=0;n<t.length;n+=1)i=e[(a=t[n]).id],this._handleResponse(i,a)},_handleResponse:function(e,t){var n=!t.error,a=n?t.result:t.error.message;this._loadingState.exit(),n?e.success.call(e.scope,a):e.failure.call(e.scope,a),e.callback.call(e.scope,n,a)},_getParams:function(){var e=this,t=Array.prototype.slice.call(arguments),n={request:{jsonrpc:"2.0",method:t.shift()}};for(n.request.params=[];1<t.length&&!this._isFunction(t[0]);){var a=t.shift();a&&n.request.params.push(a)}return this._isFunction(t[0])?(n.success=t[0],n.scope=t[1]):(n.success=t[0].success,n.failure=t[0].failure,n.callback=t[0].callback,n.scope=t[0].scope),n.success=n.success||function(){},n.failure=n.failure||function(){e.unhandledFailure.trigger.apply(e.unhandledFailure,arguments)},n.callback=n.callback||function(){},n},_isArray:function(e){return"[object Array]"===Object.prototype.toString.apply(e)},_isFunction:function(e){return"[object Function]"===Object.prototype.toString.apply(e)},_doJsonPost:function(e,t,n){var a=new XMLHttpRequest;a.open("POST",e,!0),a.setRequestHeader("Content-Type","application/json"),a.onreadystatechange=function(){if(4===a.readyState){var e=a.getResponseHeader("Content-Type");200!==a.status?n(!1,'Expected HTTP response "200 OK", found "'+a.status+" "+a.statusText+'"'):0!==e.indexOf("application/json")?n(!1,'Expected JSON encoded response, found "'+e+'"'):n(!0,JSON.parse(this.responseText))}},a.send(JSON.stringify(t))}},jsonrpc.Observable=function(){this._listeners=[]},jsonrpc.Observable.prototype={bind:function(e,t){var n={fn:e,scope:t||this};return this._listeners.push(n),n},unbind:function(e){var t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)},trigger:function(){var e;for(e=0;e<this._listeners.length;e+=1)this._listeners[e].fn.apply(this._listeners[e].scope,arguments)}},before=function(e,t){$(e).before(t)},after=function(e,t){$(e).after(t)},html=function(e,t){$(e).html(t)},append=function(e,t){$(e).append(t)},replaceWith=function(e,t){$(e).replaceWith(t)},prepend=function(e,t){$(e).prepend(t)},offsetElement=function(e){for(var t=0,n=0;e;)t+=parseFloat(e.offsetTop),n+=parseFloat(e.offsetLeft),e=e.offsetParent;return{top:Math.round(t),left:Math.round(n)}},getXPathForElement=function(e,t){for(var n,a,i="";e!==t.documentElement;){for(n=0,a=e;a;)1===a.nodeType&&a.nodeName===e.nodeName&&(n+=1),a=a.previousSibling;i="#"!=e.nodeName[0]?e.nodeName+"[position() = "+n+"]/"+i:e.nodeName.substr(1)+"()/"+i,e=e.parentNode}return i=(i="./"+t.documentElement.nodeName+"/"+i).replace(/\/$/,"")},decodeSeoLinks=function(e){return e=(e=e.replace(/;equal;/g,"=")).replace(/;ques;/g,"?")},encodeSeoLinks=function(e){return e=(e=e.replace(/=/g,";equal;")).replace(/\?/g,";ques;")};var copyText=function(e){var t=trim(e.text());if(window.clipboardData&&window.clipboardData.setData)return clipboardData.setData("Text",t);if(document.queryCommandSupported&&document.queryCommandSupported("copy")){var n=document.createElement("textarea");n.textContent=t,n.style.position="fixed",document.body.appendChild(n),n.select();try{return document.execCommand("copy")}catch(e){return console.warn("Copy to clipboard failed.",e),!1}finally{document.body.removeChild(n)}}};function ecaretPosition(e,t,n){var a=e[0],i=document.createRange(),r=window.getSelection();i.setStart(a.childNodes[t],n),i.collapse(!0),r.removeAllRanges(),r.addRange(i)}function swipedetect(e,t,n){var a,i,r,o,s,l,u,c=e,d=t||function(e){};c.addEventListener("touchstart",function(e){var t=e.changedTouches[0];a="none",dist=0,i=t.pageX,r=t.pageY,u=(new Date).getTime()},!1),c.addEventListener("touchmove",function(e){},!1),c.addEventListener("touchend",function(e){var t=e.changedTouches[0];o=t.pageX-i,s=t.pageY-r,(l=(new Date).getTime()-u)<=300&&(150<=Math.abs(o)&&Math.abs(s)<=100?a=o<0?"left":"right":150<=Math.abs(s)&&Math.abs(o)<=100&&(a=s<0?"up":"down")),d(a,o,s,l)},!1)}fastars=function(e){$.each(e,function(){var t=$(this);t.find("i").on("mouseenter",function(){if(!t.attr("value")){var e=$(this).attr("value");t.attr("tempValue",e)}}),t.find("i").on("mouseleave",function(){t.removeAttr("tempValue")})})},sQuestion=function(e){var i=this;i.question=e.question,i.answers=e.answers;e.ajax;return i.value=null,i.user=null,i.id=e.id||makeid(),i.results=[],i.save=function(){i.user?(localStorage.sQuestionUser=i.user,localStorage.sQuestionValue=i.value||""):(localStorage.sQuestionUser="",localStorage.sQuestionValue="")},i.summary=function(){return _.reduce(i.results||[],function(e,t){return e+t.count},0)},i.findResult=function(t){return _.find(i.results,function(e){return e.v==t})},i.send=function(n,a){i.user?app.ajax.run({data:{Action:"ADDSURVEY",ID:i.id,UserID:i.user,OptionID:n},success:function(e){i.value=n,i.save();var t=i.findResult(i.value);t?t.count++:i.results.push({v:i.value,count:1}),a&&a()}}):a&&a(!1)},i.results=function(t){app.ajax.run({data:{Action:"GETSURVEY",ID:i.id},success:function(e){i.results=_.map(e.Survey||[],function(e){return{v:e.OptionID,count:Number(e.count)}}),t&&t()}})},i.init=function(e){i.user=localStorage.sQuestionUser||makeid(),i.value=localStorage.sQuestionValue||null,i.save(),i.results(e)},i},search=function(e,r){r||(r={}),r.events||(r.events={});var n,a,o=null,s=null,l=!1,u=!1,c="0",d={openResults:function(){o.hasClass("fastSearchShow")||(o.addClass("fastSearchShow"),$("html").on("click",d.closeclickResults))},closeResults:function(){$("html").off("click",d.closeclickResults),o.removeClass("fastSearchShow")},closeclickResults:function(e){0===o.has(e.target).length&&o.hasClass("fastSearchShow")&&d.closeResults()},clear:function(){o.find(".sminput").val(""),o.removeClass("searchActive"),o.removeClass("searchFilled")}},f={clear:function(e){o.find(".sminput").val(""),o.removeClass("searchActive"),o.removeClass("searchFilled"),d.closeResults(),r.events.clear&&r.events.clear()},search:function(e){var t=e.val();d.closeResults(),r.events.search&&t&&(l=!0,o.addClass("searchActive"),r.events.search(t,function(e){c=0,l=!1,d.closeResults(),o.removeClass("searchActive"),u||o.removeClass("searchActive")},f,d))},showlast:function(e){var t=r.last.get();t.length&&r.last.tpl(t,function(e,t){s.html(e),d.openResults(),t&&t(s,d)})},fastsearch:function(n,e,t){var a=n.val();if(a&&r.events.fastsearch&&!l){o.addClass("searchActive"),u=!0;var i=c=t||makeid();r.events.fastsearch(a,function(e,t){i==c&&n.val()&&!l&&(u=!1,o.removeClass("searchActive"),e&&(s.html(e),d.openResults(),t&&t(s,d)))},e)}a?o.addClass("searchFilled"):(d.closeResults(),o.removeClass("searchFilled"),u&&o.removeClass("searchActive"),r.last&&f.showlast(n),r.events.clear&&r.events.clear())}};e.html(function(){r.class||(r.class="");var e=['<div class="searchIconLabel">'+(r.icon||'<i class="fa fa-search" aria-hidden="true"></i><i class="fas fa-circle-notch fa-spin"></i>')+"</div>",'<div class="searchInputWrapper"><input class="sminput" tabindex="2" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" id="text" maxlength="400" type="text" placeholder="'+(r.placeholder||"Search")+'"></div>','<div class="searchPanel"><div class="searchPanelWrapper"><div class="searchPanelItem" event="clear"><i class="fa fa-times-circle" aria-hidden="true"></i></div></div></div>'];return r.right&&(e.reverse(),r.class+=" right"),r.collectresults&&(e[1]='<div class="searchInputWrapper"><div class="sminput" contenteditable="true" tabindex="2" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" id="text" maxlength="400" type="text" placeholder="'+(r.placeholder||"Search")+'"></div></div>'),'<div class="search '+(r.class||"")+'"><div class="searchInput"><div class="searchInputIcon">'+e.join(" ")+'</div></div><div class="searchFastResultWrapper">'}()),o=e.find(".search"),s=e.find(".searchFastResultWrapper"),(a=o.find(".sminput")).on("keyup",function(e){if(13!=(e.keyCode||e.which))if(void 0===r.time&&(r.time=100),r.time){var t=makeid();n=slowMade(function(){f.fastsearch(a,e,t)},n,r.time)}else f.fastsearch(a,e)}),a.on("focus",function(){$(this).val()?f.fastsearch(a):r.last&&f.showlast(a)}),a.on("keypress",function(e){13==(e.keyCode||e.which)&&f.search(a)}),o.find(".searchIconLabel").on("click",function(){!a.val()&&r.events.blank?r.events.blank():f.search(a)}),o.find(".searchPanelItem").on("click",function(){var e=$(this),t=e.attr("event");f[t]&&f[t](e)}),r.clbk&&r.clbk(o)},thinput=function(e){$.each(e,function(){var e=$(this),t={"-1":"1",1:"0",0:"-1"};e.on("click",function(){var e=$(this).attr("value");$(this).attr("value",t[e])})})},editable=function(a){var i;a||(a={}),a.el&&$.each(a.el,function(){var t=$(this);t.wrap("<div class='editable "+a.class+"'></div>"),t.addClass("editEl");var n=t.closest(".editable");n.append("<div class='editForm'><input type='text' value='"+a.el.text()+"'></div>\t\t\t\t\t\t <label><div class='lwr'><div class='editButton edt'><i class='fa fa-pencil'></i></div>\t\t\t\t\t\t <div class='editButton success'><i class='fa fa-check'></i></div>\t\t\t\t\t\t <div class='editButton fail'><i class='fa fa-times'></i></div></div></label>");var e=a.mmoneyparam||null;e&&n.find("input").maskMoney(e),n.find(".edt").on("click",function(){i=t.text(),a.synk?(a.el.closest(".editable").find("input").val(i),a.el.closest(".editable").addClass("editNow")):(n.find("input").val(i),n.addClass("editNow"))}),n.find(".success").on("click",function(){var e=n.find("input").val();a.synk?(a.el.text(e),a.el.closest(".editable").removeClass("editNow")):(t.text(e),n.removeClass("editNow")),a.success&&a.success(e)}),n.find(".fail").on("click",function(){t.text(i),a.fail&&a.fail(i,a),n.removeClass("editNow")}),n.find("input")[0].addEventListener("keyup",function(){a.input&&(e?a.input(n.find("input").maskMoney("unmasked",e)[0].value):a.input(n.find("input").val()))}),n.find("input").on("input",function(){a.synk&&a.el.closest(".editable").find("input").val(n.find("input").val())})})},initUpload=function(c){c||(c={});var i,t,n=c.el,a=c.multiple||!1,d=1024*(c.maxFileSize||10)*1024;c.mode;c.data||(c.data={});var r=function(e,t){e.size>d?t("filesize"):!function(e){var t=e.name.split("."),n=t[t.length-1].toLowerCase();if(c.ext)if(_.isArray(c.ext)){if(-1==_.indexOf(c.ext,n))return!1}else if(c.ext!=n)return!1;return!0}(e)?t("fileext"):t(!1)},f=function(e,n,l){"image/jpeg"!=e.type||c.notexif||"undefined"==EXIF?l&&l(n):EXIF.getData(e,function(){var e,a,i,r,o,s,t=EXIF.getAllTags(this);exifOrientation=t.Orientation,exifOrientation?l&&l(n):(e=n,a=exifOrientation,i=function(e){l&&l(e)},r=new Image,o=document.createElement("canvas"),s=o.getContext("2d"),r.src=e,r.onload=function(){var e=r.width,t=r.height;switch(-1<$.inArray(a,[5,6,7,8])?(o.width=t,o.height=e):(o.width=e,o.height=t),a){case 2:s.transform(-1,0,0,1,e,0);break;case 3:s.transform(-1,0,0,-1,e,t);break;case 4:s.transform(1,0,0,-1,0,t);break;case 5:s.transform(0,1,1,0,0,0);break;case 6:s.transform(0,1,-1,0,t,0);break;case 7:s.transform(0,-1,-1,0,t,e);break;case 8:s.transform(0,-1,1,0,0,e);break;default:s.transform(1,0,0,1,0,0)}s.drawImage(r,0,0,e,t);var n=o.toDataURL("image/jpeg",1);$(o).remove(),i(n)})})},o=function(e){var n,t=$(this);e.stopPropagation(),e.preventDefault(),i.removeClass("hover"),i.addClass("loading"),n=void 0===e.dataTransfer?this.files:e.dataTransfer.files;var a=function(){i.removeClass("loading"),i.removeClass("hover"),i.removeClass("focus"),t.val("")};_.each(n,function(e){e.id=makeid()}),c.onStartUpload&&(n=c.onStartUpload(n)),lazyEach({sync:!0,array:n,all:{success:function(){a(),c.onSuccess&&c.onSuccess()},fail:function(){a(),c.onFail&&c.onFail()}},action:function(s){var l=s.item,u=makeid();r(l,function(o){var e,a,i,r,t=new FileReader;e=l,a=n,i=function(r){f(l,r.base64,function(e){r.base64=e;var t=(d/1024/1024).toFixed(0),n={filesize:"Your photo has size greater than "+t+"MB. Please upload a photo under "+t+"MB in size.",fileext:"Invalid format of picture. Only png and jpeg are allowed"};if(o)c.onError&&c.onError(o,r,l,n[o]),s.fail();else{var a=new FormData;if(a.append("file",l),_.each(c.data,function(e,t){"function"==typeof e&&(e=e()),"data"==t&&c.user&&c.user.extendAjaxData(e),(_.isArray(e)||_.isObject(e))&&(e=JSON.stringify(e)),a.append(t,e)}),c.beforeUpload&&c.beforeUpload(r,u),c.server){var i=new XMLHttpRequest;i.onreadystatechange=function(e){var t,n;n=function(e){(e=deep(e,"root"))&&"Success"==e.Result?(s.success(e),c.onUpload&&c.onUpload(e,u)):(c.onError&&c.onError("serverError",r,l),s.fail())},4==(t=e).target.readyState&&(200==t.target.status?n(JSON.parse(t.target.response)):n())},i.open("POST",c.server),i.send(a)}else c.action?c.action(r,s.success):s.success()}})},t.onload=(r=e,function(e){var t=r.name.split("."),n=t[t.length-1];i&&i({base64:e.target.result,file:r,ext:n,filesCount:a.length})}),t.readAsDataURL(l)})}})};!function(){var e="";a&&(e="multiple");n.html();n.addClass("upload dropZone"),n.wrapInner('<div class="fileUploader"><div class="elContent"></div></div>'),n.find(".fileUploader").append('<div class="spinner"></div><div class="inputWrapper"><input type="file" '+e+"></div>"),i=c.dropZone||n,t=n.find("input"),void 0===window.FileReader&&(i.text("Не поддерживается браузером!"),i.addClass("error")),n.find("input").focus(function(){n.addClass("focus")}).blur(function(){n.removeClass("focus")}),i[0]&&(i[0].ondragover=function(){return i.addClass("hover"),!1},i.on("dragout",function(e){return i.removeClass("hover"),!1}),i[0].ondrop=o,t.on("change",o),t.on("click",function(){c.onStart&&c.onStart()}))}()},checkboxValue=function(e,t){t?e.prop("checked",!0):e.prop("checked",!1)},topPreloader=function(e){if(!_Node){var t=$(".topPreloader"),n=t.find("div");0==n.length&&(n=$("<div>"),t.append(n)),t.removeClass("complete");var a=t.attr("percent")||0;t.attr("percent",e),n.width(e-a+"%"),e<=0||100<=e?(t.addClass("complete"),t.attr("percent",0),setTimeout(function(){t.fadeOut(300),setTimeout(function(){t.html("")},300)},500)):t.fadeIn(1)}},onlyNumbers=function(e){46==e.keyCode||8==e.keyCode||9==e.keyCode||27==e.keyCode||65==e.keyCode&&!0===e.ctrlKey||110==e.keyCode||190==e.keyCode||189==e.keyCode||109==e.keyCode||188==e.keyCode||35<=e.keyCode&&e.keyCode<=39||(e.keyCode<48||57<e.keyCode)&&(e.keyCode<96||105<e.keyCode)&&e.preventDefault()},settingsLocalstorage=function(e){var t=this,n=e.options.localStoragePrefix,i={},a=function(e){return"undefined"!=typeof localStorage&&localStorage[n+e]?i[e]=JSON.parse(localStorage[n+e]):i[e]={},this},r=function(e){return"undefined"!=typeof localStorage&&i[e]&&(localStorage[n+e]=JSON.stringify(i[e])),this};return t.get=function(e,t){if(0==e&&(e="general"),a(e),void 0===t){if(i[e])return i[e]}else if(null!=typeof i[e][t])return i[e][t]},t.setAll=function(n,a){return 0==n&&(n="general"),_.each(i[n],function(e,t){i[n][t]=a}),r(n),this},t.set=function(e,t,n){return 0==e&&(e="general"),void 0!==t?(i[e]||(i[e]={}),i[e][t]=n):i[e]=n,r(e),this},t.delete=function(e,t){return 0==e&&(e="general"),void 0!==t&&(i[e]||(i[e]={}),delete i[e][t],r(e)),this},t.clear=function(){_.each(getVars(localStorage),function(e,t){-1<t.indexOf(n)&&localStorage.removeItem(t)})},_.each(e.map,function(e){a(e.uri)}),t.prefix=n,t},retry=function(e,t,n,a){n||(n=20);var i=setInterval(function(){e()&&(a||clearInterval(i),t&&t())},n);return i},retryLazy=function(e,t,n){n||(n=200);var a=function(){e(function(e){e?t&&t():setTimeout(a,n)})};a()},slowMade=function(e,t,n){return n||(n=20),t&&clearTimeout(t),t=setTimeout(e,n)},mouse={getX:function(e){return e.pageX?e.pageX:e.clientX?e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft)-document.documentElement.clientLeft:0},getY:function(e){return e.pageY?e.pageY:e.clientY?e.clientY+(document.documentElement.scrollTop||document.body.scrollTop)-document.documentElement.clientTop:0}},fixWhich=function(e){!e.which&&e.button&&(1&e.button?e.which=1:4&e.button?e.which=2:2&e.button&&(e.which=3))},fakeClick=function(e,t){var n=document.getElementById(t);if(n.click)n.click();else if(document.createEvent&&e.target!==n){var a=document.createEvent("MouseEvents");a.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null);n.dispatchEvent(a)}},addToFunction=function(n,a){return function(){for(var e=[],t=0;t<arguments.length;t++)e.push(arguments[t]);n&&n.apply(this,arguments),a&&a(this,arguments)}},"undefined"!=typeof window&&function(a){var i=a.event.special.dragout={current_elem:!1,setup:function(e,t,n){a("body").on("dragover.dragout",i.update_elem)},teardown:function(e){a("body").off("dragover.dragout")},update_elem:function(e){e.target!=i.current_elem&&(i.current_elem&&a(i.current_elem).parents().andSelf().each(function(){0==a(this).find(e.target).size()&&a(this).triggerHandler("dragout")}),i.current_elem=e.target,e.stopPropagation())}};a.browser||(a.browser={},a.browser.mozilla=/mozilla/.test(navigator.userAgent.toLowerCase())&&!/webkit/.test(navigator.userAgent.toLowerCase()),a.browser.webkit=/webkit/.test(navigator.userAgent.toLowerCase()),a.browser.opera=/opera/.test(navigator.userAgent.toLowerCase()),a.browser.msie=/msie/.test(navigator.userAgent.toLowerCase()))}(window.jQuery),videoImage=function(e){var t=e;return _.isObject(t)||(t=parseVideo(t)),"youtube"==t.type?"http://img.youtube.com/vi/"+t.id+"/mqdefault.jpg":"vimeo"==t.type?"http://i.vimeocdn.com/video/"+t.id+"_320.jpg":void 0},hashFnv32a=function(e,t,n){var a,i,r=void 0===n?2166136261:n;for(a=0,i=e.length;a<i;a++)r^=e.charCodeAt(a),r+=(r<<1)+(r<<4)+(r<<7)+(r<<8)+(r<<24);return t?("0000000"+(r>>>0).toString(16)).substr(-8):r>>>0},hash_32b_to_16b=function(e){var t=4294901760&e;return 65535&e^(t>>>=16)},parseVideo=function(e){var t=e.match(/(http:\/\/|https:\/\/|)(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),n=null,a=null;return t&&t[3]&&(-1<t[3].indexOf("youtu")?(n="youtube",a=t[6]):-1<t[3].indexOf("vimeo")&&(n="vimeo",a=t[2])),{type:n,url:e,id:a}},nl2br=function(e){return e.replace(/\n/g,"<br/>")},trimHtml=function(e,t){for(var n,a,i=[],r=e.length,o=e,s=0,l=0,u=!1,c=!1,d=!1,f="",p=0;p<r&&s<t;p++){var v=e[p];"<"==v?(u=e[p+1]&&"/"==e[p+1]?d=!0:c=!0,f=""):">"==v?(d&&(n=f,void 0,-1<(a=_.indexOf(i,n))&&i.splice(a,1)),c&u&&i.push(f),u=c=d=!1,f=""):d||c?" "!=v&"/"!=v&u?f+=v:c&u&&(i.push(f),u=!1):u||s++,l++}return e.length>l&&(o=e.substr(0,l)+"&hellip;",_.each(i,function(e){"br"!=e&&"img"!=e&&(o=o+"</"+e+">")})),o},extMessageForL2=function(e){return e.length%2!=0&&(e+="0"),e},vis=function(e,t,n,a){n||(n=0);var i={thousands:",",decimal:".",allowZero:!0,precision:0,prefix:"$ ",input:!1,allowNegative:!0};if(a||(a="&mdash;"),t){if(void 0===e)return a;if("percent"==t)return(100*e).toFixed(n)+" %";if("dollars"==t)return i.value=Number(e).toFixed(n).toString(),maskValue(i);if("dollarshtml"==t)return i.prefix="$&nbsp;",i.value=Number(e).toFixed(n).toString(),maskValue(i);if("dollarslight"==t)return i.prefix="",i.value=Number(e).toFixed(n).toString(),maskValue(i);if("range0-100"==t){return{0:"0",1:"<25%",26:"<50%",51:"<75%",76:">75%"}[e]}if("yesno"==t){if("yes"==e||1==e)return"Yes";if("no"==e||0==e)return"No";if(!e)return""}if("yesno12"==t){if("yes"==e||1==e)return"Yes";if("no"==e||2==e)return"No";if(!e)return""}if("number"==t)return _.isNumber(Number(e))&&"NaN"!=e.toString()&&"undefined"!=e.toString()&&"null"!=e.toString()?(e=Number(e).toFixed(n),i.prefix="",i.precision=n,i.value=e,maskValue(i)):a;if("date"==t)return convertDate(e)}return e},hexEncode=function(e){for(var t=0,n="",a=0;a<e.length;a++){for(255<(t=e.charCodeAt(a))&&(t-=848),t=t.toString(16);t.length<2;)t="0"+t;n+=t}return n},hexDecode=function(e){var t=0,n="";e=trim(e);for(var a=2;a<=e.length;a+=2)128<=(t=parseInt(e.substring(a-2,a),16))&&(t+=848),n+=t=String.fromCharCode("0x"+t.toString(16));return n},checkUrlForImage=function(t){if(t=t.split("?")[0].toLowerCase(),_.find([".jpg",".gif",".png",".jpeg"],function(e){if(-1<t.indexOf(e))return!0}))return!0},donottrustLink=function(e){return e.replace(/<a /g,'<a donottrust="donottrust" ')},clearScripts=function(e){return e.replace(/<script[^>]*?>[^<]*<\/script[^>]*?>/gim,"")},boolToNumber=function(e){return e?1:0},numberToBool=function(e){return!!e},findAndReplaceLink=function(e){function u(e){return(r="<textarea>"+(e||"").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")+"</textarea>",(t="div",n={innerHTML:r},i=document.createElement(t),n&&function e(){var t,n=arguments,a=n[0]||{},i=1,r=n.length,o=!1;for("boolean"==typeof a&&(o=a,a=n[1]||{},i=2),"object"==typeof a||isFunction(a)||(a={});i<r;++i)if(null!=(t=n[i]))for(var s in t){var l=a[s],u=t[s];a!==u&&(o&&u&&"object"==typeof u&&!u.nodeType?a[s]=e(o,l||(null!=u.length?[]:{}),u):void 0!==u&&(a[s]=u))}return a}(i,n),a&&function n(a,t,i){if(a=ge(a)){if("object"==typeof t)return each(t,function(e,t){n(a,e,t)});if("opacity"==t)browser.msie&&((i+"").length?a.style.filter=1!==i?"alpha(opacity="+100*i+")":"":a.style.cssText=a.style.cssText.replace(/filter\s*:[^;]*/gi,""),a.style.zoom=1),a.style.opacity=i;else try{var e="number"==typeof i;e&&/height|width/i.test(t)&&(i=Math.abs(i)),a.style[t]=e&&!/z-?index|font-?weight|opacity|zoom|line-?height/i.test(t)?i+"px":i}catch(e){debugLog("setStyle error: ",[t,i],e)}}}(i,a),i).firstChild).value;var t,n,a,i,r}return(e||"").replace(/(^|[^A-Za-z0-9А-Яа-яёЁ\-\_])(https?:\/\/)?((?:[A-Za-z\$0-9А-Яа-яёЁ](?:[A-Za-z\$0-9\-\_А-Яа-яёЁ]*[A-Za-z\$0-9А-Яа-яёЁ])?\.){1,5}[A-Za-z\$рфуконлайнстРФУКОНЛАЙНСТ\-\d]{2,22}(?::\d{2,5})?)((?:\/(?:(?:\&amp;|\&#33;|,[_%]|[A-Za-z0-9А-Яа-яёЁ\-\_#%&\?+\/\$.~=;:]+|\[[A-Za-z0-9А-Яа-яёЁ\-\_#%&\?+\/\$.,~=;:]*\]|\([A-Za-z0-9А-Яа-яёЁ\-\_#%&\?+\/\$.,~=;:]*\))*(?:,[_%]|[A-Za-z0-9А-Яа-яёЁ\-\_#%&\?+\/\$.~=;:]*[A-Za-z0-9А-Яа-яёЁ\_#%&\?+\/\$~=]|\[[A-Za-z0-9А-Яа-яёЁ\-\_#%&\?+\/\$.,~=;:]*\]|\([A-Za-z0-9А-Яа-яёЁ\-\_#%&\?+\/\$.,~=;:]*\)))?)?)/gi,function(){var e=Array.prototype.slice.apply(arguments),t=e[1]||"",n=e[2]||"http://",a=e[3]||"",i=a+(e[4]||""),r=(e[2]||"")+e[3]+e[4];if(-1==a.indexOf(".")||-1!=a.indexOf(".."))return e[0];var o,s=a.split(".").pop();if((6<s.length||-1==function(e,t,n){for(var a=n||0,i=(e||[]).length;a<i;a++)if(e[a]==t)return a;return-1}("info,name,aero,arpa,coop,museum,mobi,travel,xxx,asia,biz,com,net,org,gov,mil,edu,int,tel,ac,ad,ae,af,ag,ai,al,am,an,ao,aq,ar,as,at,au,aw,ax,az,ba,bb,bd,be,bf,bg,bh,bi,bj,bm,bn,bo,br,bs,bt,bv,bw,by,bz,ca,cc,cd,cf,cg,ch,ci,ck,cl,cm,cn,co,cr,cu,cv,cx,cy,cz,de,dj,dk,dm,do,dz,ec,ee,eg,eh,er,es,et,eu,fi,fj,fk,fm,fo,fr,ga,gd,ge,gf,gg,gh,gi,gl,gm,gn,gp,gq,gr,gs,gt,gu,gw,gy,hk,hm,hn,hr,ht,hu,id,ie,il,im,in,io,iq,ir,is,it,je,jm,jo,jp,ke,kg,kh,ki,km,kn,kp,kr,kw,ky,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mh,mk,ml,mm,mn,mo,mp,mq,mr,ms,mt,mu,mv,mw,mx,my,mz,na,nc,ne,nf,ng,ni,nl,no,np,nr,nu,nz,om,pa,pe,pf,pg,ph,pk,pl,pm,pn,pr,ps,pt,pw,py,qa,re,ro,ru,rs,rw,sa,sb,sc,sd,se,sg,sh,si,sj,sk,sl,sm,sn,so,sr,ss,st,su,sv,sx,sy,sz,tc,td,tf,tg,th,tj,tk,tl,tm,tn,to,tp,tr,tt,tv,tw,tz,ua,ug,uk,um,us,uy,uz,va,vc,ve,vg,vi,vn,vu,wf,ws,ye,yt,yu,za,zm,zw,рф,укр,сайт,онлайн,срб,cat,pro,local".split(","),s))&&(!/^[a-zA-Z]+$/.test(s)||!e[2]))return e[0];if(-1!=e[0].indexOf("@"))return e[0];try{r=decodeURIComponent(r)}catch(e){}55<r.length&&(r=r.substr(0,53)+".."),r=(o=r,o?o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):"").replace(/&amp;/g,"&");i=u(i).replace(/([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g,encodeURIComponent);var l=i.indexOf("#/");return 0<=l?i.substr(l+1):0<=(l=i.indexOf("#!"))&&"/"+i.substr(l+2).replace(/^\//,""),t+'<a href="'+(n+i).replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")+'" target="_blank">'+r+"</a>"})},hideString=function(e){for(var t="",n=0;n<e.length;n++)n<.666*e.length?t+="*":t+=e[n];return t},checkAddress=function(e){var i=function(e){var t,n="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",a=new Array;for(t=0;t<58;t++)a[n[t]]=int2bigInt(t,8,0);var i,r=e.length,o=int2bigInt(0,1,0),s=int2bigInt(58,8,0);for(t=0;t<r;t++)i=e[r-t-1],o=add(o,mult(a[i],p(s,t)));var l,u=bigInt2str(o,16),c=f(u);for(l=0;e[l]==n[0];l++);var d=c;return 0<l&&(d=v("\0",l)+c),d},f=function(e){for(var t="",n=0;n<e.length;n+=2)t+=String.fromCharCode(parseInt(e.substr(n,2),16));return t},p=function(e,t){if(0==t)return int2bigInt(1,1,0);var n,a=e;for(n=1;n<t;n++)a=mult(a,e);return a},v=function(e,t){for(var n=[];n.length<t;)n.push(e);return n.join("")};return function(e){var t=i(e);if(25!=t.length)return!1;var n=t.substr(t.length-4),a=t.substr(0,t.length-4);return n==f(sha256_digest(f(sha256_digest(a)))).substr(0,4)}(e)},"undefined"==typeof filterXSS&&(filterXSS=function(e){return e});
 /*_____*/ 
User=function(n,o){o||(o={});var r=this,e=(n.ajax,n.options.name,n.settings||null),t=null,a=0;r.imgur={clientId:"61175058f8e21f4",secret:"ea4020d8024dfb78d372d1cd21c2f3215c72ead4"};var i={private:{set:function(e){this.value=e||null},value:null},public:{set:function(e){this.value=e||null},value:null}};return r.address={set:function(e){this.value=e||null},value:null},r.data={},r.tokenExpired=function(){r.isState(function(e){if(e){tokenInterval=setInterval(function(){r.isState(function(e){if(e);else clearInterval(tokenInterval)})},20)}})},r.prepare=function(e){r.tokenExpired(),n.platform.clear(),n.platform.prepareUser(function(){e&&e(a)})},r.signin=function(e,t){var o=function(){r.isState(function(e){e?(console.log("signin"),localStorage.waslogged=!0,localStorage.popupsignup="showed",r.prepare(t)):t&&t(e)})};console.log("self.stay",r.stay),r.stay?n.platform.cryptography.api.aeswc.encryption(e,n.options.fingerPrint,{},function(e){console.log("mnemonic",e),localStorage.mnemonic=e}):localStorage.mnemonic="",bitcoin.bip39.validateMnemonic(e)?r.setKeys(e,function(){o()}):r.setKeysPairFromPrivate(e,function(e){e?o():(a=0,t&&t(a))})},r.signout=function(){t&&t.destroy(),console.log("signout"),localStorage.mnemonic="",i.private.set(),i.public.set(),e.clear(),n.platform.clear(),n.platform.ws&&n.platform.ws.destroy(),n.platform.rtc&&n.platform.rtc.destoryAll(),r.data={},a=0},r.isState=function(t){if(o||(o={}),2!==a){if(i.private.value&&i.public.value)localStorage.waslogged=!0,localStorage.popupsignup="showed",$(".survicate-widget").remove(),a=1;else{if(localStorage.mnemonic&&r.stay){var e=localStorage.mnemonic;return void n.platform.cryptography.api.aeswc.decryption(e,n.options.fingerPrint,{},function(e){e?bitcoin.bip39.validateMnemonic(e)?r.setKeys(e,function(){r.isState(t)}):r.setKeysPairFromPrivate(e,function(){r.isState(t)}):(localStorage.mnemonic="",t(a=0))})}a=0}t(a)}else retry(function(){return 2!=a},function(){r.isState(t)})},r.validate=function(){return!r.address.value||deep(n,"platform.sdk.user.storage.me.name")},r.isItMe=function(e){return r.address.value&&r.address.value.toString("hex")==e},r.keysFromMnemo=function(e){var t=bitcoin.bip39.mnemonicToSeed(e);return r.keysFromSeed(t)},r.keysFromSeed=function(e){bitcoin.crypto.sha256(Buffer.from(e));var t=bitcoin.bip32.fromSeed(e).derivePath(n.platform.sdk.address.path(0)).toWIF();return bitcoin.ECPair.fromWIF(t)},r.setKeysPair=function(e,t){i.private.set(e.privateKey),i.public.set(e.publicKey);var o=n.platform.sdk.address.pnet();r.address.set(o.address),topPreloader(20),t&&t()},r.setKeysPairFromPrivate=function(e,t){var o=bitcoin.ECPair.fromPrivateKey(Buffer.from(e,"hex"));console.log("keyPair",o),r.setKeysPair(o,function(){t&&t(!0)})},r.setKeys=function(e,t){var o=r.keysFromMnemo(e);r.setKeysPair(o,t)},r.key=i.public,r.private=i.private,r.keys=function(){return bitcoin.ECPair.fromPrivateKey(i.private.value)},r.stay=Number(localStorage.stay||"1"),r},topPreloader(25),"undefined"!=typeof module&&(module.exports=User);
 /*_____*/ 
nModule=function(){var l=this,a={templates:{}};l.storage={els:{},templates:{}},l.options={},l.api={},l.map={},l.essenses={},l.inserts={wnd:{obj:wnd,storageKey:"wnd",after:!0},tooltip:{obj:tooltip,storageKey:"tooltip",after:!0}},l.anonimus=function(t,i){l.map.anonimus?t(!0):l.user.isState(function(e){if(e){if(!l.user.validate())if(n=deep(l,"map.redirect.validate"))return l.redirect(i,n),void t(!1);t(!0)}else{var n;(n=deep(l,"map.redirect.auth"))&&l.redirect(i,n),t(!1)}})},l.shell=function(o,n,t){o||(o={});var s=function(e){t||l.nav.api.links(),e.el&&(e.el.find("[data-jdenticon-value]").each(function(){var e=$(this),n=e.data("jdenticon-value");e.html(jdenticon.toSvg(n,e.width()))}),bgImages(e.el,e.bgImages)),"function"==typeof n&&n(e)};o.completeClbk=s,l.loadTemplate(o,function(e){l.renderTemplate(e,function(e){var n=!1;if(!_.isObject(o.el)||o.insert){var t=l.inserts[o.insert];if(t){var i=o[t.storageKey]||{};if(i.content=e,i.el=o.el,i.app=l.app,t.after&&(i.clbk=function(e){e||(e={}),o=_.extend(o,e),s(o)}),i.destroy=function(){return l.app.nav.api.history.removeParameters(["m"+o.id]),o.destroy()},l.container=t.obj(i),o.container=l.container,l.container.essenseDestroy=i.destroy,t.after)return void topPreloader(100);(a=deep(l,"container.el"))&&(o.el=a),n=!0}else{var a;(a=l.app.el[o.el])&&(o.el=a)}}"function"==typeof o.el&&(o.el=o.el()),n||o.el&&l.insertTemplate(o,e),o.animation||s(o)},o)})},l.insertTemplate=function(m,c){var u="<div class='animation'></div>",p=function(){m.completeClbk&&m.completeClbk(m)},f=function(e){m.el.find(".animation").contents().unwrap(),m.el.css("position",e.position),m.el.height(""),m.el.width(""),m.el.css("overflow",e.overflow)};if(m.inner||(m.inner=html),m.animation){if(m.animation.timeouts||(m.animation.timeouts=100),"fadeIn"==m.animation)return m.el.fadeOut(100),void setTimeout(function(){m.inner(m.el,c),m.el.fadeIn(200),p(),setTimeout(function(){m.postAnimation&&m.postAnimation(m)},200)},100);_.isObject(m.animation)&&(m.animation.hideOnAnimationPeriod&&m.animation.hideOnAnimationPeriod.fadeOut(m.animation.timeouts),setTimeout(function(){var e,n,t,i,a,o,s=(e=m.el.css("position"),n=m.el.css("overflow"),t=m.el.css("height"),i=m.el.css("width"),a=m.el.height(),o=m.el.width(),m.el.height(a),m.el.width(o),m.el.wrapInner(u),m.el.find(".animation").height(a+"px"),m.el.find(".animation").width(o+"px"),m.el.css("overflow","hidden"),"absolute"!=e&&"fixed"!=e&&m.el.css("position","relative"),{height:a,width:o,position:e,overflow:n,cssheight:t,csswidth:i}),l=m.el.find(".animation");if("slide"==m.animation.id&&(m.inner=html,m.animation.direction||(m.animation.direction="onright"),l.addClass([m.animation.direction,m.animation.id,"leave"].join(" ")),l.on("transitionend",function(){m.el.html(u),(l=m.el.find(".animation")).addClass([m.animation.direction,m.animation.id,"enter"].join(" ")),m.inner(l,c),p(),m.el.height(l.height()+"px"),m.el.width(l.width()+"px"),setTimeout(function(){l.addClass("original"),l[0].addEventListener("transitionend",function(){f(s),m.animation.hideOnAnimationPeriod&&m.animation.hideOnAnimationPeriod.fadeIn(2*m.animation.timeouts),m.postAnimation&&m.postAnimation()})},m.animation.timeouts)})),"fadeInByElement"==m.animation.id){m.inner=html,m.animation.selector||(m.animation.selector=".fadeInByElement");var r=[];l.find(m.animation.selector).each(function(){r.unshift($(this))});var d=1;lazyEach({array:r,sync:!0,action:function(e){e.item.fadeOut(m.animation.timeouts/d),d+=.333,setTimeout(function(){e.success()},m.animation.timeouts/d)},all:{success:function(){m.el.html(u),(l=m.el.find(".animation")).addClass([m.animation.direction,m.animation.id,"enter"].join(" ")),m.inner(l,c),l.find(m.animation.selector).fadeOut(1),p(),m.el.height(l.height()+"px"),m.el.width(l.width()+"px");var e=[];l.find(m.animation.selector).each(function(){e.push($(this))});var n=0;lazyEach({array:e,sync:!0,action:function(e){e.item.fadeIn(m.animation.timeouts/n),n+=.333,setTimeout(function(){e.success()},m.animation.timeouts/n)},all:{success:function(){l.addClass("original"),f(s),m.postAnimation&&m.postAnimation()}}})}}})}},m.animation.timeouts))}else m.inner(m.el,c),m.display||(m.display="block"),m.el.css("display",m.display),m.postAnimation&&m.postAnimation()},l.renderTemplate=function(n,t,i){i||(i={}),l.user.isState(function(e){i.data||(i.data={}),i.data.app=l.app,i.data.e=l.app.localization.e,i.data.state=e,i.data.module=l,i.data.user=l.user,i.data.essenseData=i.essenseData||{},i.rendered=n(i.data),i.clear&&(i.rendered=""),t&&t(i.rendered)})},l.loadTemplate=function(n,t){if(n||(n={}),n.name||(n.name="index"),a.templates[n.name])retry(function(){return!a.templates[n.name]},function(){l.loadTemplate(n,t)});else if(l.storage.templates[n.name]||n.clear)t&&t(l.storage.templates[n.name]);else{var e;a.templates[n.name]=!0;var i=l.map.pathtpl||l.map.path||"";_Node&&(i="https://getbitcoins.io/"),e=n.common?i+"common":i+l.componentsPath+(n.turi||l.map.uri),e+="/templates/"+n.name+".html",l.ajax.run({url:e,type:"GET",dataType:"html",success:function(e){l.storage.templates[n.name]=_.template(e),t&&t(l.storage.templates[n.name]),a.templates[n.name]=!1}})}},l.fastTemplate=function(e,t,i){l.loadTemplate({name:e},function(n){l.renderTemplate(n,function(e){t&&t(e,n)},{data:i||null})})};return l.add=function(e,n){topPreloader(10);var t=_.clone(e),i=l.map.add;"function"==typeof i&&(i=i(t,n)),t=_.extend(t,i),t=_.extend(t,n),l.user.isState(function(e){t.getdata(function(e){topPreloader(45),t.data=e||{},n.preshell&&n.preshell(),l.shell(t,function(n){topPreloader(100),n.clbk=addToFunction(n.clbk,function(){var e;(e=n).history&&e.el&&!n.inWnd&&!n.noscroll&&_scrollTop(0,null,50),t.auto&&t.auto(n)}),t.init&&t.init(n)},!0)},{state:e,settings:t})})},l.init=function(n,t){t||(t={}),n||(n={}),l.anonimus(function(e){e?(l.inited=!0,l.add(n,t)):t.clbk&&t.clbk("anonimus")},t)},l.redirect=function(e,n){var t={};t.href=n,t.history=!0,t.open=!0,t.preshell=e.preshell,t.clbk=e.clbk,l.nav.api.load(t)},l.restart=function(e){e||(e={}),l.stop(e),l.run(e)},l.addEssense=function(e,n,t){l.essenses=e;var i=new n(t),a=i.id||t.eid||"secondary";return(t.primary||t.loadDefault)&&(i.primary=!0),i.primary&&(a="primary"),e[a]?delete i:e[a]=i,e[a].destroyed=!1,e[a]},l.removeEssense=function(e,n){e[n]&&(e[n].destroy(),delete e[n])},l.closeContainer=function(){var e=deep(l,"container.close");if(e)return e(),!0},l.clearCanvas=function(e){e.clear=!0,l.shell(e)},l.parametersHandler=function(){_.each(l.essenses,function(e){e.parametersHandler&&e.parametersHandler()})},l},"undefined"!=typeof module&&(module.exports=nModule);
 /*_____*/ 
var electron = null

if(typeof _Electron != 'undefined'){
	electron = require('electron');
}

Nav = function(app)
{	
	var self = this;

	var options = {
		navPrefix : '/',
		path: 'components/',

		cashe: true,
		history : true,
		links : true,
	}



	var protocol = null;

	if (typeof window != 'undefined'){
		protocol = window.location.protocol.replace(":",'');
	}

	

	if (protocol == "http" || protocol == "https" || _Node)
	{
		protocol = "web"
	}

	var current = {
		href : null
	}

	var loading = {

	}

	var cssimported = {};

	var relations = {}

	self.wnds = {};

	var module = {
		find : function(href){

			return _.find(app.map, function(mdl, index){
				return (mdl.href == href);
			})

		},
		run : function(p){

			p.clbk = addToFunction(p.clbk, function(){

				core.links();

			})

			p.module.nav = self;
			p.module.app = app;
			p.module.sdk = app.platform.sdk;
			p.module.user = app.user;
			p.module.ajax = app.ajax;
			p.module.componentsPath = options.path;
			p.module.data = p.data || {};
			p.module.essenseData = p.essenseData || {};
			p.module.run(p);


		}
	}



	var historyManager = {
		addParametersToHref : function(href, p){

			if(!href) return href


			var _p = parameters(href, true);

				_p = _.extend(_p, p);

			href = href.split('?')[0];

			return href + collectParameters(_p);
		},
		addParameters : function(p, _p){

			var currentParameters = parameters();

			var previousParameters = parameters();

				currentParameters = _.extend(currentParameters, p);

			if(_.isEqual(previousParameters, currentParameters)) return;

			delete currentParameters.back;

			var href = current.href + collectParameters(currentParameters);

			this.add(href, _p);
		},
		removeParameters : function(ids, _p){

			if(!_.isArray(ids)) ids = [ids];

			var pathname = self.get.pathname();

			var currentParameters = parameters();

				_.each(ids, function(id){
					delete currentParameters[id]
				})

			var href = current.href + collectParameters(currentParameters);

			this.add(href, _p);
		},
		add : function(href, p){


			if(!p) p = {}

			if (p.inWnd){

				var pa = parameters(href, true);
					pa['m' + p.id] = true

				historyManager.addParameters(pa)
				self.wnds[p.id] = p

				return
			}

			if (options.history === true && !_Node)
			{	
				if(history.state && history.state.href == href){
					return
				}

				if (self.addParameters){
					href = self.addParameters(href)
				}


				history.pushState({

					href : href,

					lfox : true

				}, null, href);
				
			}

		},

		changes(href1, href2){

		},	

		openCurrent : function(){
			

			if (history.state && history.state.lfox) { 

				core.removeWindows(history.state.href)

				if(history.state.href.split('?')[0] != current.href){

					self.api.load({
		        		href : history.state.href,
		        		open : true,
			   			//history : true,
			   			loadDefault : true
		        	}); 

				}
				else
				{

					_.each(self.wnds, function(w){
						if (w.module.parametersHandler){
							w.module.parametersHandler()
						}
					})
				}

	    	}
		}
		
	}

	var core = {

		removeWindows : function(href){
			var p = parameters(href, true)

			var deleted = [];

			_.each(self.wnds, function(pa, id){
				if(!p['m' + id]){

					var c = deep(pa, 'module.closeContainer');

					if (c){

						deleted.push(id)

						c()
					}

				}
			})

			_.each(deleted, function(id){
				delete self.wnds[id]
			})
		},
		
		open : function(p){

			if(!p) p = {};

				p.clbk || (p.clbk = emptyFunction);

			var lastHref = current.href;

			var run = true;


			if((p.history || p.loadDefault) && options.history)
			{

				if(p.href == current.href){

					if (current.module && current.module.parametersHandler && p.handler){
						
						run = false;

						historyManager.add(p.completeHref, p);

						current.completeHref = p.completeHref;

						_scrollTop(0, null, 50);

						current.module.parametersHandler(function(){							

							p.clbk(null, p);



						})

						_.each(self.clbks.history, function(c){
								
							c(p.href);
							
						})

						return;
					}
				}

				if(p.completeHref == current.completeHref && !p.loadDefault)
				{
					run = false;
				}
				else
				{


					//if(p.loadDefault || p.reload){

					if(!p.reload)
						historyManager.add(p.completeHref, p);

					//}

					if (current.module && !p.inWnd){

						var stop = current.module.stop();

						if (stop && _.isObject(stop)){

							if (stop.action){
								stop.action(function(){
									core.open(p)
								})
							}

							return
						}

						if (stop && typeof stop == 'function'){
							p.preshell = stop;
						}
					}

					if(p.href && !p.inWnd){
						current.href = p.href;
						current.completeHref = p.completeHref;
						current.module = p.module;		
					}	

					p.module.active = true;

					_.each(self.clbks.history, function(c){
						
						c(p.href);
						
					})
				}
			}


			if(p.restart)
			{
				run = true;
			}

			if (run)
			{
				module.run(p)
			}

			else
			{
				p.clbk(null, p);
			}
		},
		
		loadSource : function(map, clbk){

			var cashed = app.module(map.id);

			var importScriptClbk = function(){
				topPreloader(50)

				core.loadTemplates(map, function(){

					topPreloader(100)

					loading[map.id] = false;

					clbk(app.module(map.id));

				})
			}

			if(loading[map.id]) {

				retry(
					function(){
						return !loading[map.id];
					},
					function(){
						core.loadSource(map, clbk)
					}
				)
			
				return;
			}

			loading[map.id] = true;

			var path = map.path || "";

			var src =  path + options.path + map.uri + "/index.js"; 

			topPreloader(20)
			

			core.loadRelations(map, function(){

				topPreloader(40)

				if (window.design)
				{

					if(!cssimported[map.uri])
					{
						importCss( (map.uri.csspath || path) + options.path + map.uri + "/index.css");
						cssimported[map.uri] = true
					}
				}
				

				if(options.cashe && cashed)
				{
					importScriptClbk()
				}
				else
				{



					importScript(src, function(){

						importScriptClbk()

					}, null, app, map.id);
				}

				

			})

				
		},
		loadTemplates : function(map, clbk){

			lazyEach({
				array : map.templates,
				action : function(p){


					app.module(map.id).loadTemplate({
						name : p.item
					}, p.success);
					
				},
				all : {
					success : clbk
				}
			})
		},
		loadRelations : function(map, clbk){

			var rel = _.filter(map.relations, function(r){

				if(!r.if || r.if()) return true 
			})


			if(!map.relationsSunc)
			{

				lazyEach({
					array : rel,
					action : function(p){

						var relation = p.item

						if(!relations[relation.src] && (!_Node || !relation.nodeIgnore))
						{
							if(relation.f == 'js')
							{
								importScript(relation.src, function(){

									relations[relation.src] = true;

									p.success();

								}, null, app, null, relation.require);
							}

							if(relation.f == 'css')
							{
								relations[relation.src] = true;
								
								importCss(relation.src);

								p.success();
							}
						}
						else
						{
							p.success();
						}
						
					},

					all : {
						success : function(){
							clbk();
						}
					}
					
				})
			}
			else
			{

				var cssRelations =  _.filter(rel, function(relation){
					if(relation.f == 'css') return true;
 				})

 				_.each(cssRelations, function (relation) {
 					importCss(relation.src); 
 				});

				var jsRelations = _.filter(rel, function(relation){

					if(_Node && relation.nodeIgnore) return false;

					if(relation.f == 'js') return true;
 				})

 				jsRelations = _.map(jsRelations, function(relation){
 					return {
 						src : relation.src,
 						require : relation.require
 					};
 				})


				importScripts(jsRelations, relations, function(){

					clbk();

				}, null, null, app);
			}
		},
		openInitialModules : function(clbk, _map){

			var map = _.filter(_map || app.map, function(map){
				if(map.now === true) return true;
			})	
			
			
			lazyEach({
				array : map,
				sync : false,
				action : function(p){
					var obj = p.item;

					core.load({
						href : obj.href,
						open : true,
						clbk : function(error)
						{
							if(error)
							{
								
							}

							if (p.success)
								p.success();
						}
					})
				},

				all : {
					success : clbk
				}
			})
		},
		load : function(p){
			if(!p) p = {};



			if(!p.href && !p.id) {
				p.clbk("href and id aren't exist");

				return;
			}

			p.clbk || (p.clbk = emptyFunction);

			if(typeof p.animation == 'undefined')
				p.animation = 'fadeIn'

			if(p.href){

				p.completeHref = p.href;

				p.href = p.href.split("?")[0];

				p.map = module.find(p.href);


			}

			if (p.id)
				p.map = app.map[p.id];

			else
			{
				if (p.map)
					p.id = p.map.id
			}


			if(!p.map)
			{

				p.clbk("map for module isn't exist")

				p.href = 'page404'
				p.map = module.find(p.href);
			}

			/*if(p.history){
				app.el.content.addClass("navtransition")
			}*/

			core.loadSource(p.map, function(module){

				if(!module)
				{
					p.clbk("module haven't been loaded");

					return;
				}
				else
				{
					p.module = module;
					p.module.map = p.map;

					var prms = parameters();
					
					app.localization.set(prms.loc, function(){

						if(!p.open)
						{
							p.clbk(null, p);
						}
						else
						{
							core.open(p)
						}

					})
					

					
				}
				
			})
		},
		externalLink : function(link){

			var href = link.attr('href').toLowerCase(),
				external = link.attr('external');

			var e = (!href 

				|| external
				|| href.indexOf("mailto") > -1
				|| href.indexOf("skype:") > -1 
				|| href.indexOf('/') > -1 
				|| href.indexOf('.') > -1
				|| href == "#")
				|| href.indexOf(self.get.hostname()) != -1

			if (!e) return true;
		},
		externalTarget : function(link){
			var href = link.attr('href');

			var e = href && (href.indexOf('/') > -1 || href.indexOf('.') > -1)

			if (href.indexOf('http') == -1){
				link.attr('href', 'https://' + href)
			}

			if (e)
			{
				link.attr('target', '_blank')
			}
		},

		thisSiteLink : function(href){

			var c = href.toLowerCase().split(self.get.hostname())

			if (c.length > 1){
				return c[1]
			}
			else
			{
				return href
			}
		},

		links : function(action, _el, additionalActions){

			if(!options.links) return;	

			var _links = null;

			if(_el) _links = _el.find('a');

			else _links = $('a');		

			_links.each(function(){

				var link = $(this)

				if(!link.attr('href')) return

				var external = core.externalLink(link);

				if(!external)
				{
					if(link.attr('donottrust'))
					{

						link.off('click')
							.on('click', function(){
								var href = $(this).attr('href');	

								if (href.indexOf('http') == -1) href = 'http://' + href						

								self.api.load({
									open : true,
									id : 'anothersite',
									inWnd : true,

									essenseData : {
										link : href
									}
								})

								return false;
							})
					}
					else
					{
						core.externalTarget(link)
						/*
						if(typeof _Electron == 'undefined'){
							
						}
						else{
							console.log('links', link.attr('href'))
							link.off('click')
								.on('click', function(){

									console.log("SDSD", this.href)

									electron.shell(this.href)


									return false;
								})

							
						}*/
						
					}
					
				}
				else
				{


					if (_SEO){

						var _href = link.attr('href');
							_href = decodeSeoLinks(_href).replace("#!", "");

						var hrefParameters = parameters(_href, true);

							hrefParameters.loc || (hrefParameters.loc = app.localization.key);

							_href = _href.split("?")[0];

							_href = _href + collectParameters(hrefParameters);

							_href = "#!" + _href;

							link.attr('href', encodeSeoLinks(_href));
					}

					link.off('click')
						.on('click', function(){
							
							var href = core.thisSiteLink($(this).attr('href'));

							var handler = $(this).attr('handler') || null

							core.go({
								action : action,
								href : href,
								history : true,
								open : true,
								handler : handler
							})

							if (additionalActions){
								additionalActions();
							}				
							
							return false;
						})
				}

			})

			var p = {};

				p.href = $(this).attr('href');
		},
		go : function(p){
			if(!p) p = {};

			if(!p.href) return;

			if(!p.action) p.action = core.load;

			if (p.href[0] == "?"){

				var currentParameters = parameters(),
					hrefParameters = parameters(p.href.substr(1));

				currentParameters = _.extend(currentParameters, hrefParameters);

				p.href = current.href + collectParameters(currentParameters, p.exclude);

			}

			p.action(p);
		},
	}

	var protocolActions = {
		file : {
			prefix : function(){
				var pathname = window.location.pathname;

				if (pathname.indexOf('android') > -1)
				{
					options.navPrefix = '/android_asset/www/';
				}
				else
				{
					options.navPrefix = pathname
				}
			},

			pathnameSearch : function(){
				var loc =  window.location; 

				return protocolActions.file.pathname() + loc.search
			},

			pathname : function(){
				var loc =  window.location; 

				return loc.pathname.replace(options.navPrefix, '').replace(".html", "")
			}

		},
		web : {

			pathnameSearch : function(){
				var loc =  window.location; 

				return protocolActions.web.pathname() + loc.search
			},

			pathname : function(){
				var loc =  window.location; 

				return loc.pathname.replace(options.navPrefix, '')
			},

			seoRedirect : function(){
				var loc =  window.location; 

				var href = decodeSeoLinks(loc.href.replace("#!", "").replace(/&amp;/g, '&'))

				if (href != loc.href){
					historyManager.add(href);
				}
			}
		}
	}

	var protocolAction = function(actionName){

		var action = deep(protocolActions, protocol + "." + actionName)

		var args = [];

		for (var i = 1; i < arguments.length; i++) {
		    args.push(arguments[i])
		}

		if (action)
			return action.apply(this, args);

		else
		{
			if(args.length == 1) return args[0];
		}
	}

	self.api = {
		history : historyManager,
		links : core.links,
		go : core.go,
		ini : core.openInitialModules,

		load : function(p){
			var clbk = p.clbk;

			p.clbk = function(error, r){

				var e = false;

				if(error)
				{
					console.log(p, error);
					e = true;
				}

				if (clbk)
					clbk(e, r);

			}

			core.load(p)
		},
		loadDefault : function(p){
			if(!p) p = {};

			if(!p.href)
				p.href = self.get.pathnameSearch() || 'index';

			if (p.href == 'blank')
				p.href  = 'index'

			console.log("LOADDEFAULT", p.href, self.get.pathnameSearch())

			self.api.load(p);
		},

		loadSameThis : function(href, p){

			if(p.container) p.container.close();

			var loadParameters = {
        		open : true,
				href : href,
				essenseData : p.essenseData,
				history : p.history,
				inWnd : p.inWnd,
				inTooltip : p.inTooltip,
				animation : p.animation
        	}

        	this.load(loadParameters)

		},

		loadRelations : core.loadRelations
	}

	self.get = {
		href : function(){
			var loc =  window.location;  

			var pathname = protocolAction('pathname')
			
			return decodeSeoLinks(pathname + loc.search).replace("#!", "");
		},
		pathname : function(){

			var pathname = protocolAction('pathname')

			if (pathname == 'blank')
				pathname = 'index'

			return decodeSeoLinks(pathname).replace("#!", "");
		},

		pathnameSearch : function(){
			var pathnameSearch = protocolAction('pathnameSearch')

			if (pathnameSearch == 'blank')
				pathnameSearch = 'index'

			return decodeSeoLinks(pathnameSearch).replace("#!", "");
		},
		hostname : function(){

			//return 'pocketnet.app/'

			return window.location.hostname + '/'
		}
	}

	self.init = function(p){

		if(!p) p = {};

		if(typeof window != 'undefined'){

			protocolAction('prefix');
			protocolAction('seoRedirect');

			if (options.history === true)
			{
				window.onpopstate = function(event)
				{
			   		historyManager.openCurrent();
				};
			}

			core.openInitialModules(function(){

				p.open = true;
				p.history = true;
				p.loadDefault = true;

				self.api.loadDefault(p);

			});

		}

		
	}

	self.clbks = {
		history : {}
	}

	if(app.options.nav){
		options = _.extend(options, app.options.nav)
	}

	self.relations = relations;
	self.current = current

	return self;
}
	

if(typeof module != "undefined")
{
	module.exports = Nav;
}


topPreloader(45);
	
 /*_____*/ 
Validation=function(f){var u,l,i,t=f.form,c=[],e=this,n=f.errorPath||"",a=f.errorPathKey||"after",s={rpass:function(e){return t.find(".password").val()==$(e).val()},freeemaillist:function(e){var t=!0,i="@"+e.split("@")[1];return-1<FreeEmails.indexOf(i)&&(t=!1),t},checked:function(e){return e.is(":checked")}},d={"0001":"Fill in this field please","0002":"The email address for the recipient is invalid","0003":"Password must be minimum of 6 characters, with at least one number","0004":"Passwords do not match","0005":"The Name is invalid","0006":"The Name of Bank is invalid","0007":"The Phone Number Format is (XXX) XXX-XXXX","0008":"Please enter your work email","0011":"Please agree with it"},o={email:{r:/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,f:"0002"},pass:{r:/((?=.*\d)(?=.*[a-zA-Z]).{6,})/,f:"0003"},rpass:{r:/((?=.*\d)(?=.*[a-zA-Z]).{6,})/,f:"0003",a:s.rpass,fa:"0004"},name:{r:/^[a-zA-Zа-яА-Я0-9 .\-_@#&]{1,30}$/,f:"0005"},bank:{r:/^[a-zA-Z .,&]{3,30}$/,f:"0006"},phone:{r:/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/,f:"0007"},date:{r:"empty",f:"0001"},time:{r:"empty",f:"0001"},number:{r:/[0-9]+/,f:"0009"},vendorcode:{r:/[0-9]{14}/,f:"0010"},empty:{r:"empty",f:"0001"},checkbox:{fa:"0011",a:s.checked}},h=function(){$(this).val()&&$(this).addClass("initedInput")},v=function(){for(var e=0;e<=this.nmbr;e++)c[e]=!0;L()?p():b()},m=function(){for(var e=0;e<=this.nmbr;e++)c[e]=!0;$(this).closest(".inputLabel").hasClass("novalidate")?this.addEventListener("keyup",v,!1):this.removeEventListener("keyup",v),this.getAttribute("norelax")&&L("noshow")},p=f.success||function(){},b=f.fail||function(){},g=function(e,t){i||(i=$("<div>",{text:d[e],class:"validationFail"}),t&&(n&&(t=n(t)),t[a](i)))},y=function(){i&&(i.remove(),i=null)},L=function(t,e){e||(e={});var i,n,a,s,d,l=0,o=0,h="";return u.each(function(e){l++,"all"!=t&&0==c[e]||($(this).closest(".inputLabel").removeClass("validate"),$(this).closest(".inputLabel").removeClass("novalidate"),r=k($(this)),1==r[0]?(o++,$(this).closest(".inputLabel").addClass("validate")):""==h&&($(this).closest(".inputLabel").addClass("novalidate"),h=r[1],n=$(this)))}),i=o==l,f.afterEach&&f.afterEach(o),"noshow"==t||e.noerrors||(a=i,s=h,d=n,y(),0==a?d&&(d.hasClass("initedInput")||""!=d.val())&&g(s,d):p()),i},k=function(e){var t=e.data("validate")||"name",i=e.val(),n=!0,a="0000";if("hidden"!=e.attr("type"))return""!=i||"checkbox"==e.attr("type")?t&&t in o&&(1==n&&("r"in o[t]&&("empty"==o[t].r?""===i?(n=!1,a=o[t].f):n=!0:o[t].r.test(i)?n=!0:(n=!1,a=o[t].f)),!0===n&&"fu"in o[t]&&(!0===o[t].fu(i)?n=!0:(n=!1,a=o[t].fuerror))),1==n&&"a"in o[t]&&(o[t].a(e)||(n=!1,a=o[t].fa))):(n=!1,a="0001"),[n,a]},w=function(){for(var e=$(this).val(),t=!1,i=!1,n=!1,a=!1,s=0;s<e.length;s++)t||-1=="qwertyuiopasdfghjklzxcvbnm".indexOf(e[s])?i||-1=="QWERTYUIOPLKJHGFDSAZXCVBNM".indexOf(e[s])?n||-1=="0123456789".indexOf(e[s])?a||-1=="!@#$%^&*()_-+=|/.,:;[]{}".indexOf(e[s])||(a=!0):n=!0:i=!0:t=!0;var r=0,d="";t&&r++,i&&r++,n&&r++,a&&r++,e.length<6&&r<3&&(d="simple"),e.length<6&&3<=r&&(d="medium"),8<=e.length&&r<3&&(d="medium"),8<=e.length&&3<=r&&(d="strong"),6<=e.length&&1==r&&(d="simple"),6<=e.length&&1<r&&r<4&&(d="medium"),6<=e.length&&4==r&&(d="strong"),8<=e.length&&4==r&&(d="super"),0==e.length&&(d=""),l.find("div").removeClass().addClass(d)};return e.init=function(){t&&((u=f.inputsSelector?t.find(f.inputsSelector):t.find('input[type!="hidden"][data-validate!="none"]')).each(function(e){this.nmbr=e,c[e]=!1}),l=$("<div>",{class:"pwdDiff",html:"<div class='indicator'></div>"}),t.find(".password").after(l),u.each(function(){this.addEventListener?(this.addEventListener("blur",v,!1),this.addEventListener("change",v,!1),this.addEventListener("change",h,!1),this.addEventListener("keyup",m,!1),this.addEventListener("change",m,!1),$(this).hasClass("password")&&$(this).on("keyup",w)):this.onfocusout=v}))},e.validation=function(e){return L("all",e)},e.inputValidation=k,e.init(),e},"undefined"!=typeof module&&(module.exports=Validation);
 /*_____*/ 
__map={__vendor:["js/vendor/underscore-min.js","js/vendor/fingerprint2.js","js/vendor/tooltipster.core.js","js/vendor/tooltipster.bundle.js","js/vendor/jquery-ui.min.js","js/vendor/imagesloaded.pkgd.min.js","js/vendor/timer.js","js/vendor/ion.sound/ion.sound.min.js","js/vendor/aesjs.js","js/vendor/btc/src/btc.js","js/vendor/pbkdf2.js","js/vendor/sha1.js","js/vendor/jdenticon.js","js/vendor/paste.js","js/vendor/jquery.md5.js","js/vendor/jquery.animate-number.js","js/vendor/emojione.js","js/vendor/plyr.js","js/vendor/reconnectingwebsocket.js","js/vendor/rtc/db.js","js/vendor/xss.min.js"],__sources:["js/functions.js","js/user.js","js/module.js","js/navn.js","js/validation.js","js/_map.js","js/localization.js","js/kit.js","js/satolist.js","messenger2/clientrtc.js","js/app.js","js/main.js"],__css:["css/normalize.css","css/tooltipster.core.min.css","css/tooltipster.bundle.min.css","css/main.css","css/plyr.css","css/jquery-ui.min.css","css/medium/medium-editor.css","css/medium/medium-editor-insert-plugin.css","css/medium/beagle.css"],about:{uri:"about",href:"about",add:function(n,e){return e.inWnd?{insert:"wnd"}:{el:"content"}},anonimus:!0},terms:{uri:"terms",href:"terms",add:function(n,e){return e.inWnd?{insert:"wnd"}:{el:"content"}},anonimus:!0},page404:{uri:"page404",href:"page404",add:{el:"content"},anonimus:!0,relationsSunc:!0},registration:{uri:"registration",href:"registration",add:function(n,e){return e.inWnd?{insert:"wnd"}:e.inTooltip?{insert:"tooltip"}:{el:"content"}},anonimus:!0,relations:[{src:"js/vendor/qrscanner.js",f:"js"},{src:"js/vendor/jquery.inputmask.bundle.min.js",f:"js"},{src:"js/validation.js",f:"js"},{src:"js/vendor/qrcode.min.js",f:"js",require:function(){QRCode=require("./js/vendor/qrcode.min.js")}}]},anothersite:{uri:"anothersite",href:"anothersite",add:function(n,e){return e.inWnd?{insert:"wnd"}:e.inTooltip?{insert:"tooltip"}:{el:"content"}},anonimus:!0,relationsSunc:!0,relations:[]},token:{uri:"token",href:"token",add:{el:"content"},anonimus:!0},filluser:{uri:"filluser",href:"filluser",add:function(n,e){return e.inWnd?{insert:"wnd"}:e.inTooltip?{insert:"tooltip"}:{el:"content"}},redirect:{auth:"authorization"},relationsSunc:!0,relations:[{src:"js/vendor/circular-progress.js",f:"js"}]},usersettings:{uri:"usersettings",href:"usersettings",add:{el:"content"},redirect:{auth:"authorization",validate:"filluser"}},test:{uri:"test",href:"test",add:{el:"content"},redirect:{auth:"authorization"},relationsSunc:!0,relations:[{src:"js/vendor/exif.js",f:"js",require:function(){EXIF=require("./js/vendor/exif.js")}},{src:"js/vendor/picker.js",f:"js",if:function(){return"undefined"==typeof _Electron||0==_Electron}},{src:"js/vendor/picker.date.js",f:"js",if:function(){return"undefined"==typeof _Electron||0==_Electron}},{src:"js/vendor/jquery.inputmask.bundle.min.js",f:"js"}]},accounts:{uri:"accounts",href:"accounts",add:{el:"content"},redirect:{auth:"authorization",validate:"filluser"}},messenger:{uri:"messenger",href:"messenger",add:{el:"content"},redirect:{auth:"authorization",validate:"filluser"}},articles:{uri:"articles",href:"articles",add:function(n,e){return e.inWnd?{insert:"wnd"}:e.inTooltip?{insert:"tooltip"}:{el:"content"}}},article:{uri:"article",href:"article",add:function(n,e){return e.inWnd?{insert:"wnd"}:e.inTooltip?{insert:"tooltip"}:{el:"content"}},relations:[{src:"js/vendor/medium-editor.js",f:"js",if:function(){return"undefined"==typeof _Electron||0==_Electron}},{src:"js/vendor/mediuminsert/handlebars.runtime.min.js",f:"js",require:function(){}},{src:"js/vendor/mediuminsert/jquery-sortable-min.js",f:"js",require:function(){}},{src:"js/vendor/mediuminsert/jquery.ui.widget.js",f:"js"},{src:"js/vendor/mediuminsert/jquery.iframe-transport.js",f:"js"},{src:"js/vendor/mediuminsert/jquery.fileupload.js",f:"js"},{src:"js/vendor/mediuminsert/medium-editor-insert-plugin.js",f:"js",require:function(){var n=require("./js/vendor/mediuminsert/medium-editor-insert-plugin.js"),e=require("./js/vendor/mediuminsert/handlebars.runtime.min.js");require("./js/vendor/mediuminsert/jquery-sortable-min.js"),n($,e)}}],relationsSunc:!0},video:{uri:"video",href:"video",add:{el:"content"},anonimus:!0},help:{uri:"help",href:"help",add:{el:"content"},anonimus:!0},donations:{uri:"donations",href:"donations",add:{el:"content"},relations:[{src:"js/vendor/jquery.inputmask.bundle.min.js",f:"js"}]},faq:{uri:"faq",href:"faq",add:{el:"content"},anonimus:!0},embeding20:{uri:"embeding20",href:"embeding20",add:function(n,e){return e.inWnd?{insert:"wnd"}:e.inTooltip?{insert:"tooltip"}:{el:"content"}},relations:[{src:"js/vendor/jquery.inputmask.bundle.min.js",f:"js"}]},embeding:{uri:"embeding",href:"embeding",add:function(n,e){return e.inWnd?{insert:"wnd"}:e.inTooltip?{insert:"tooltip"}:{el:"content"}},relations:[{src:"js/vendor/jquery.inputmask.bundle.min.js",f:"js"}]},userpage:{uri:"userpage",href:"userpage",add:{el:"content"},redirect:{auth:"authorization"}},chat:{uri:"chat",href:"chat",add:{el:"content"},anonimus:!0,relations:[{src:"js/vendor/emojionearea.min.js",f:"js"},{src:"js/vendor/emojionearea.min.css",f:"css"}],redirect:{auth:"authorization",validate:"filluser"}},mchat:{uri:"mchat",href:"mchat",add:{el:"content"},anonimus:!0,relations:[{src:"js/vendor/emojionearea.min.js",f:"js"},{src:"js/vendor/emojionearea.min.css",f:"css"}],redirect:{auth:"authorization",validate:"filluser"}},wallet:{uri:"wallet",href:"wallet",add:{el:"content"},relations:[{src:"js/vendor/jquery.inputmask.bundle.min.js",f:"js"},{src:"js/vendor/chart.min.js",f:"js",require:function(){Chart=require("./js/vendor/Chart.js")}}],relationsSunc:!0},share:{uri:"share",href:"share",add:{el:"content"},relations:[{src:"js/vendor/exif.js",f:"js",require:function(){EXIF=require("./js/vendor/exif.js")}},{src:"js/vendor/Sortable.min.js",f:"js",require:function(){Sortable=require("sortablejs")}},{src:"js/vendor/isotope.pkgd.js",f:"js",if:function(){return"undefined"==typeof _Electron||0==_Electron}},{src:"js/vendor/emojionearea.min.js",f:"js",if:function(){return"undefined"==typeof _Electron||0==_Electron}},{src:"js/vendor/emojionearea.min.css",f:"css"}]},comments:{uri:"comments",href:"comments",add:{el:"content"},relations:[{src:"js/vendor/exif.js",f:"js",require:function(){EXIF=require("./js/vendor/exif.js")}},{src:"js/vendor/emojionearea.min.js",f:"js",if:function(){return"undefined"==typeof _Electron||0==_Electron}},{src:"js/vendor/emojionearea.min.css",f:"css"}]},lenta:{uri:"lenta",href:"lenta",add:{el:"content"},relations:[{src:"js/vendor/isotope.pkgd.js",f:"js",if:function(){return"undefined"==typeof _Electron||0==_Electron}}],anonimus:!0},s:{uri:"s",href:"s",add:{el:"content"},anonimus:!0},send:{uri:"send",href:"send",add:{el:"content"},relations:[{src:"js/vendor/jquery.inputmask.bundle.min.js",f:"js"}],anonimus:!0},imageGalleryEdit:{uri:"imageGalleryEdit",href:"imagesEdit",add:function(n,e){return e.inWnd?{insert:"wnd"}:{el:"content"}},anonimus:!0},imagegallery:{uri:"imagegallery",href:"imagegallery",add:function(n,e){return e.inWnd?{insert:"wnd"}:{el:"content"}},anonimus:!0,relationsSunc:!0},aboutus:{uri:"aboutus",href:"aboutus",add:{el:"content"},anonimus:!0},menu:{uri:"menu",href:"menu",add:{el:"menu"},now:!0,anonimus:!0,renew:!0,reload:!0},toppanel:{uri:"toppanel",href:"toppanel",add:{el:"toppanel"},now:!0,anonimus:!0,renew:!0,reload:!0},navigation:{uri:"navigation",href:"navigation",add:{el:"navigation"},now:!0,renew:!0},footer:{uri:"footer",href:"footer",add:{el:"footer"},now:!0,anonimus:!0,reload:!0},support:{uri:"support",href:"support",add:{el:"content"},relations:[{src:"js/validation.js",f:"js"}],anonimus:!0,reload:!0},notifications:{uri:"notifications",href:"notifications",add:function(n,e){return e.inTooltip?{insert:"tooltip"}:{el:"content"}}},panel:{uri:"panel",href:"panel",add:function(n,e){return e.inWnd?{insert:"wnd"}:e.inTooltip?{insert:"tooltip"}:{el:"content"}}},discussions:{uri:"discussions",href:"discussions",add:function(n,e){return e.inWnd?{insert:"wnd"}:e.inTooltip?{insert:"tooltip"}:{el:"content"}},redirect:{auth:"authorization",validate:"filluser"}},authorization:{uri:"authorization",href:"authorization",add:function(n,e){return e.inWnd?{insert:"wnd"}:e.inTooltip?{insert:"tooltip"}:{el:"content"}},relations:[{src:"js/vendor/jquery.inputmask.bundle.min.js",f:"js"},{src:"js/validation.js",f:"js"},{src:"js/vendor/qrscanner.js",f:"js"}],anonimus:!0},addaccount:{uri:"addaccount",href:"addaccount",add:function(n,e){return e.inWnd?{insert:"wnd"}:e.inTooltip?{insert:"tooltip"}:{el:"content"}},relations:[{src:"js/vendor/jquery.inputmask.bundle.min.js",f:"js"},{src:"js/validation.js",f:"js"},{src:"js/vendor/qrscanner.js",f:"js"}]},complain:{uri:"complain",href:"complain",add:function(n,e){return e.inWnd?{insert:"wnd"}:{el:"content"}}},scheduler:{uri:"scheduler",href:"scheduler",add:function(n,e){return e.inWnd?{insert:"wnd"}:e.inTooltip?{insert:"tooltip"}:{el:"content"}}},surveyiframe:{uri:"surveyiframe",href:"surveyiframe",add:function(n,e){return e.inWnd?{insert:"wnd"}:e.inTooltip?{insert:"tooltip"}:{el:"content"}}},socialshare:{uri:"socialshare",href:"socialshare",add:function(n,e){return e.inWnd?{insert:"wnd"}:e.inTooltip?{insert:"tooltip"}:{el:"content"}},relations:[{src:"js/vendor/SocialShare.min.js",f:"js"}]},main:{uri:"main",href:"index",add:{el:"content"},anonimus:!0},author:{uri:"author",href:"author",add:{el:"content"},anonimus:!0},post:{uri:"post",href:"post",add:function(n,e){return e.inWnd?{insert:"wnd"}:e.inTooltip?{insert:"tooltip"}:{el:"content"}},anonimus:!0},userslist:{uri:"userslist",href:"userslist",add:function(n,e){return e.inWnd?{insert:"wnd"}:e.inTooltip?{insert:"tooltip"}:{el:"content"}},anonimus:!0},ustate:{uri:"ustate",href:"ustate",add:function(n,e){return e.inTooltip?{insert:"tooltip"}:{el:"content"}}}},"undefined"!=typeof module&&(module.exports=__map);
 /*_____*/ 
Localization=function(a){var i=this;"undefined"==typeof window?i.key="en":i.key=(window.navigator.userLanguage||window.navigator.language||"en").split("-")[0],i.available={en:{name:"English",key:"en"},ru:{name:"Русский",key:"ru"}},i.loaded={};var o={};return i.current=function(){return i.available[i.key]||{}},i.locLinks=function(){return _.reduce(i.available,function(e,n){return e+'<a href="?loc='+n.key+'">'+n.name+"</a>"},"")},i.availableMap=function(n){return _.map(i.available,function(e){return e[n]})},i.findByName=function(n){return _.find(i.available,function(e){return e.name==n})},i.lightSet=function(e,n){e&&i.available[e]&&i.key!=e?(i.key=e,i.locSave(),i.import(function(){n&&n()})):n&&n()},i.set=function(e,n){i.available[e]&&i.key!=e?(a.nav&&a.nav.api.history.removeParameters(["loc"]),i.key=e,i.locSave(),i.import(function(){a?a.reload({clbk:n,current:!0}):n&&n()})):n&&n()},i.locSave=function(){localStorage.loc=i.key||(window.navigator.userLanguage||window.navigator.language||"en").split("-")[0]},i.init=function(e){"undefined"!=typeof loclib&&loclib||(loclib={});parameters();i.key="en",i.locSave(),i.import(e)},i.import=function(e){if(i.loaded[i.key])e&&e();else{var n="localization/"+i.key+".js";importScript(n,function(){i.loaded[i.key],o=loclib[i.key]||{},e&&e()})}},i.e=function(e,n){var a=o[e]||deep(loclib,i.key+"."+e)||"";return"function"==typeof a&&(a=a(n)),a},i},"undefined"!=typeof module&&(module.exports=Localization);
 /*_____*/ 
SubscribePrivate=function(){var e=this;return e.address={set:function(e){this.v=e},v:""},e.encrypted={set:function(e){this.v=e},v:""},e.opreturn=function(){return e.encrypted.v},e.validation=function(){return e.address.v?e.encrypted.v?void 0:"encrypted":"address"},e.serialize=function(){return e.address.v},e.export=function(){return{address:e.encrypted.v}},e.type="subscribePrivate",e},Subscribe=function(){var e=this;return e.address={set:function(e){this.v=e},v:""},e.validation=function(){if(!e.address.v)return"address"},e.serialize=function(){return e.address.v},e.export=function(){return{address:e.address.v}},e.type="subscribe",e},Unsubscribe=function(){var e=this;return e.address={set:function(e){this.v=e},v:""},e.validation=function(){if(!e.address.v)return"address"},e.serialize=function(){return e.address.v},e.export=function(){return{address:e.address.v}},e.type="unsubscribe",e},Comment=function(e){var r=this;return r.txid=e,r.message={set:function(e){this.v=e||"",r.on.change&&r.on.change("message",this.v)},v:""},r.images={set:function(e){if(e)if(_.isArray(e)){if(10<e.length)return!1;this.v=e}else{if(!e)return;if(9<this.v.images)return!1;this.v.push(e)}else this.v=[];return r.on.change&&r.on.change("images",this.v),!0},remove:function(e){e?removeEqual(this.v,e):this.v=[]},get:function(){return _.map(this.v,function(e){return e})},v:[]},r.url={set:function(e){this.v=e||"",r.on.change&&r.on.change("url",this.v)},v:""},r.clear=function(){r.message.set(),r.images.set(),r.url.set()},r.on={},r.off=function(e){delete r.on[e]},r.validation=function(){return r.images.v.length||r.url.v||r.message.v?r.message.v&&1e3<r.message.v.length?"messagelength":null:"content"},r.serialize=function(){return encodeURIComponent(r.message.v)+r.images.v.join(",")+encodeURIComponent(r.url.v||"")},r.export=function(e){return e?{message:r.message.v,url:r.url.v,images:r.images.v}:{m:encodeURIComponent(r.message.v),u:encodeURIComponent(r.url.v),i:r.images.v}},r.import=function(e){r.url.set(e.u||e.url),r.message.set(e.m||e.message),r.images.set(e.i||e.images)},r.alias=function(e,t,n,s,i){var a=new pComment;return a._import(r.export()),a.id=e,a.txid=r.txid,a.children=s,a.address=i,a.setTime(t,n),a},r.type="comment",r},UpvoteShare=function(){var e=this;return e.share={set:function(e){this.v=e},v:""},e.address={set:function(e){this.v=e},v:""},e.value={set:function(e){this.v=e},v:""},e.ustate="score",e.opreturn=function(){return e.address.v+" "+e.value.v},e.validation=function(){if(!e.share.v||!e.value.v)return"share"},e.serialize=function(){return e.share.v+e.value.v},e.export=function(){return{share:e.share.v,value:e.value.v}},e.type="upvoteShare",e},ComplainShare=function(){var e=this;return e.share={set:function(e){this.v=e},v:""},e.reason={set:function(e){this.v=e},v:""},e.validation=function(){return e.share.v?e.reason.v?void 0:"reason":"share"},e.serialize=function(){return e.share.v+"_"+e.reason.v},e.export=function(){return{share:e.share.v,reason:e.reason.v}},e.type="complainShare",e},Share=function(){var a=this;return a.clear=function(){a.message.set(),a.images.set(),a.tags.set(),a.url.set(),a.caption.set(),_.each(a.settings,function(e,t){a.settings[t]=null})},a.caption={set:function(e){this.v=e||"",_.each(a.on.change||{},function(e){e("caption",this.v)})},v:"",drag:!1},a.message={set:function(e){this.v=e||"",_.each(a.on.change||{},function(e){e("message",this.v)})},v:"",drag:!0},a.ustate="post",a.tags={have:function(e){return-1<this.v.indexOf(e)},set:function(e){if(void 0===e)this.v=[];else if(_.isArray(e)){if(30<e.length)return!1;this.v=e}else{if(!e)return;if(29<this.v.length)return!1;removeEqual(this.v,e),this.v.push(e)}return _.each(a.on.change||{},function(e){e("tags",this.v)}),!0},remove:function(e){e?(removeEqual(this.v,e),_.each(a.on.change||{},function(e){e("tags",this.v)})):this.v=[]},get:function(){return _.map(this.v,function(e){return e})},v:[]},a.images={set:function(e){if(e)if(_.isArray(e)){if(10<e.length)return!1;this.v=e}else{if(!e)return;if(9<this.v.length)return!1;this.v.push(e)}else this.v=[];return _.each(a.on.change||{},function(e){e("images",this.v)}),!0},remove:function(e){e?removeEqual(this.v,e):this.v=[],_.each(a.on.change||{},function(e){e("images",this.v)})},get:function(){return _.map(this.v,function(e){return e})},v:[],drag:!0},a.url={set:function(e){return this.v=e||"",a.settings.image="",_.each(a.on.change||{},function(e){e("url",this.v)}),!0},v:"",drag:!0},a.on={change:{}},a.off=function(e){delete a.on[e]},a.default={a:["cm","i","u"],v:"p",videos:[],image:"a"},a.settings={a:"",v:"",videos:[],image:""},a.uploadImages=function(i,e){lazyEach({array:a.images.v,action:function(t,n){var e=t.item;if(-1<e.indexOf("data:image")){var s=e.split(",");s[1]&&i.ajax.run({type:"POST",imgur:!0,data:{Action:"image",image:s[1]},success:function(e){a.images.v[n]=deep(e,"data.link"),t.success()}})}else n++,t.success()},all:{success:function(){e&&e()}}})},a.validation=function(){return a.message.v||a.caption.v?!a.tags.v.length&&"a"!=a.settings.v&&"tags":"message"},a.serialize=function(){return encodeURIComponent(a.url.v)+encodeURIComponent(a.caption.v)+encodeURIComponent(a.message.v)+_.map(a.tags.v,function(e){return encodeURIComponent(e)}).join(",")+a.images.v.join(",")},a.export=function(e){return e?{caption:a.caption.v,message:a.message.v,url:a.url.v,tags:a.tags.v,images:a.images.v,settings:_.clone(a.settings)}:{c:encodeURIComponent(a.caption.v),m:encodeURIComponent(a.message.v),u:encodeURIComponent(a.url.v),t:_.map(a.tags.v,function(e){return encodeURIComponent(e)}),i:a.images.v,s:_.clone(a.settings)}},a.import=function(e){if(a.caption.set(e.c||e.caption),a.url.set(e.u||e.url),a.tags.set(e.t||e.tags),a.message.set(e.m||e.message),a.images.set(e.i||e.images),e.s)try{a.settings=e.s}catch(e){}else e.settings&&(a.settings=e.settings)},a.alias=function(e){var t=new pShare;return t.time=new Date,t._import(a.export()),t.txid=e,t},a.type="share",a},UserInfo=function(){var s=this;return s.clear=function(){s.image.set(),s.name.set(),s.language.set(),s.about.set(),s.site.set(),s.addresses.set()},s.addresses={set:function(e){var t=this.v;e?_.isArray(e)?_.each(e,function(e){t.push(e)}):this.v.push(e):this.v=[],s.on.change&&s.on.change("addresses",this.v)},v:[]},s.image={set:function(e){this.v=e||"",s.on.change&&s.on.change("image",this.v)},v:""},s.name={set:function(e){this.v=e||"",s.on.change&&s.on.change("name",this.v)},v:""},s.ref={set:function(e){this.v=e||"",s.on.change&&s.on.change("ref",this.v)},v:""},s.language={set:function(e){this.v=e||"",s.on.change&&s.on.change("language",this.v)},v:""},s.about={set:function(e){this.v=e||"",s.on.change&&s.on.change("about",this.v)},v:""},s.site={set:function(e){this.v=e||"",s.on.change&&s.on.change("site",this.v)},v:""},s.uploadImage=function(t){var e=s.image.v;if(-1<e.indexOf("data:image")){var n=e.split(",");n[1]&&app.ajax.run({type:"POST",imgur:!0,data:{Action:"image",image:n[1]},success:function(e){s.image.v=deep(e,"data.link"),t&&t()}})}else t&&t()},s.on={},s.off=function(e){delete s.on[e]},s.validation=function(){return!1},s.serialize=function(){return encodeURIComponent(s.name.v)+encodeURIComponent(s.site.v)+s.language.v+encodeURIComponent(s.about.v)+s.image.v+JSON.stringify(s.addresses.v)+s.ref.v},s.alias=function(e){var t=new pUserInfo;return t._import(s.export()),t.txid=e,t},s.export=function(e){return e?{name:s.name.v,about:s.about.v,site:s.site.v,language:s.language.v,image:s.image.v,addresses:JSON.stringify(s.addresses.v||[]),ref:s.ref.v}:{n:encodeURIComponent(s.name.v),l:s.language.v,a:encodeURIComponent(s.about.v),s:encodeURIComponent(s.site.v),i:s.image.v,b:JSON.stringify(s.addresses.v||[]),r:s.ref.v}},s.import=function(e){s.name.set(e.c||e.name),s.language.set(e.l||e.language),s.about.set(e.a||e.about),s.site.set(e.s||e.site),s.image.set(e.i||e.image),s.addresses.set(JSON.parse(e.b||e.addresses||"[]")),s.ref.set(e.r||e.ref)},s.type="userInfo",s},pUserInfo=function(){var n=this;return n.name="",n.image="",n.language="",n.about="",n.site="",n.txid="",n.ref="",n.postcnt=0,n.subscribes=[],n.subscribers=[],n.address="",n.rc=0,n._import=function(e){n.name=decodeURIComponent(e.n||e.name||""),n.image=e.i||e.image,n.about=decodeURIComponent(e.a||e.about||""),n.language=e.l||e.language,n.site=decodeURIComponent(e.s||e.site||""),n.ref=e.r||e.ref,n.rc=e.rc||0,n.postcnt=e.postcnt||0,e.subscribes&&(n.subscribes=e.subscribes),e.subscribers&&(n.subscribers=e.subscribers),e.txid&&(n.txid=e.txid),n.addresses=JSON.parse(e.b||e.addresses||"[]"),(e.adr||e.address)&&(n.address=e.adr||e.address),n.temp=e.temp||null},n.export=function(){var e={};return e.n=encodeURIComponent(n.name),e.image=n.image,e.a=encodeURIComponent(n.about),e.l=n.language,e.s=encodeURIComponent(n.site),e.r=n.ref,e.rc=n.rc,e.b=JSON.stringify(n.addresses||[]),e.adr=n.address,e},n.import=function(e){e=JSON.parse(e),n._import(e)},n.relation=function(t,e){return e||(e="subscribes"),_.find(n[e],function(e){return e.adddress==t||e.address==t})},n.addRelation=function(e,t){t||(t="subscribes"),n[t]||(n[t]=[]),n[t].push(e)},n.removeRelation=function(e,t){t||(t="subscribes"),removeEqual(n[t],e)},n.type="userInfo",n},pShare=function(){var n=this;return n.url="",n.tags=[],n.message="",n.caption="",n.images=[],n.txid="",n.time=null,n.comments=0,n.lastComment=null,n.on={},n.off=function(e){delete n.on[e]},n.default={a:["cm","i","u"],v:"p",videos:[],image:"a"},n.settings={a:"",v:"",videos:[],image:""},n.findComment=function(t){return _.find(n.comments,function(e){return e.txid==t})},n._import=function(e,t){if(e.i&&!_.isArray(e.i)&&(e.i=[e.i]),e.t&&!_.isArray(e.t)&&(e.t=[e.t]),t?(n.message=e.m||e.message||"",n.caption=e.c||e.caption||"",n.tags=e.t||e.tags||[],n.url=e.u||e.url||""):(n.url=decodeURIComponent(e.u||e.url||""),n.message=decodeURIComponent((e.m||e.message||"").replace(/\+/g," ")),n.caption=decodeURIComponent((e.c||e.caption||"").replace(/\+/g," ")),n.tags=_.map(e.t||e.tags||[],function(e){return decodeURIComponent(e)})),e.myVal&&(n.myVal=Number(e.myVal)),n.images=e.i||e.images||[],e.txid&&(n.txid=e.txid),n.temp=e.temp||null,e._time&&(n._time=e._time),e.comments&&(n.comments=e.comments),e.lastComment&&(n.lastComment=e.lastComment),e.s)try{n.settings=e.s}catch(e){}else e.settings&&(n.settings=e.settings)},n.export=function(){var e={};return e.m=encodeURIComponent(n.message),e.c=encodeURIComponent(n.caption),e.u=encodeURIComponent(n.url),e.t=_.map(n.tags||[],function(e){return encodeURIComponent(e)}),e.i=_.clone(n.images),e._time=n._time,e.s=_.clone(n.settings),e},n.import=function(e){e=JSON.parse(e),n._import(e)},n.renders={caption:function(){return n.caption?n.caption:n.message.length<100?n.message:""},message:function(){return!n.caption&&n.message.length<100?"":n.message},xssmessage:function(e){return e||(e=n.renders.message()),e="a"!=n.settings.v?nl2br(findAndReplaceLink(filterXSS(e,{whiteList:[],stripIgnoreTag:!0}))):filterXSS(e,{whiteList:{a:["href","title","target"],br:["style"],b:["style"],span:["style"],figure:["style"],figcaption:["style","class"],i:["style"],img:["src","width","height"],div:["class","data-plyr-provider","data-plyr-embed-id"],p:[],ul:[],ol:[],li:[],h2:[],h1:[],h3:[],h4:[],h5:[],em:[],u:[],blockquote:[],strong:[]}})}},n.upvote=function(e){if(n.myVal&&"0"!=n.myVal)return null;var t=new UpvoteShare;return t.share.set(n.txid),t.value.set(e),t.address.set(n.address||""),n.myVal=Number(e),t},n.complain=function(e){var t=new ComplainShare;return t.share.set(n.txid),t.reason.set(e),t},n.type="share",n},pComment=function(){var n=this;return n.url="",n.message="",n.images=[],n.txid="",n.time=0,n.timeupd=0,n.children=0,n.address="",n.parentid="",n.answerid="",n._import=function(e){n.url=decodeURIComponent(e.u||e.url||""),n.message=decodeURIComponent((e.m||e.message||"").replace(/\+/g," ")),n.images=e.i||e.images||[]},n.import=function(e){e=JSON.parse(e),n._import(e)},n.export=function(){var e={};return e.m=encodeURIComponent(n.message),e.u=encodeURIComponent(n.url),e.i=_.clone(n.images),e},n.serialize=function(){return encodeURIComponent(n.message)+n.images.join(",")+encodeURIComponent(n.url||"")},n.upvote=function(){var e=new UpvoteShare;return e.share.set(n.txid),e},n.setTime=function(e,t){n.time=new Date,n.time.setTime(1e3*e),n.timeupd=new Date,n.timeupd.setTime(1e3*t)},n.renders={preview:function(){var e=filterXSS(n.message,{whiteList:[],stripIgnoreTag:!0}),t=emojione.toImage(trimHtml(e,90));return nl2br(t)}},n.type="comment",n},Img=function(e){e||(e={});var t=this;return t.type=e.type,t.name=e.name,t.app=e.app,t.refId=e.refId,t},kits={ini:{},alias:{userInfo:pUserInfo,share:pShare,comment:pComment}};
 /*_____*/ 
var electron = null

if(typeof _Electron != 'undefined'){
	electron = require('electron');
}

Platform = function(app){

	var self = this;

		self.app = app;

		self.focus = true;	

		self.salt = 'vd45dzxcsOBWjLe2p4jmSMmMDSp90o01lkxvSl34MspyHG9sbu1092';

		self.currentBlock = 1;

	var TXFEE = 1

		self.avblocktime = 45;

		self.mp = {
			dollars : function(value, p){
				if(!p) p = {};

				if(typeof p.precision == 'undefined')
					p.precision = 2;

				p.allowNegative = false;

				if(typeof p.prefix == 'undefined')
					p.prefix = "$&nbsp;";

				p.value = Number(value).toFixed(p.precision);

				return maskValue(p)
			},

			coin : function(value, p){
				if(!p) p = {};

				if(typeof p.precision == 'undefined'){

					p.precision = 2;

					if (value >= 1){
						p.precision = 2;
					}

					/*if (value > 100){
						p.precision = 4;
					}

					if (value > 1000){
						p.precision = 3;
					}

					if (value > 10000){
						p.precision = 2;
					}

					if (value > 100000){
						p.precision = 1;
					}*/

					if (value > 1000000){
						p.precision = 0;
					}

					
				}



				p.allowNegative = false;

				p.value = Number(value).toFixed(p.precision);

				return maskValue(p)
			},

			coinwithsmall : function(value, p){

				if(!p) p = {}

				if(typeof p.precision == 'undefined')
					p.precision = 2;

				if(typeof p.dprecision == 'undefined')
					p.dprecision = 6;

				if(typeof p.suffix == 'undefined')
					p.suffix = "POC";

				var suffix = p.suffix;

				delete p.suffix

				value = Number(Number(value).toFixed(p.dprecision));

				var s = Math.pow(10, p.precision)

				p.allowNegative = false;

				p.value = ((Math.floor(value * s)) / s).toFixed(p.precision);
		

				value = (value - p.value).toFixed(p.dprecision).substr(2 + p.precision);

				var fp = maskValue(p)

				var html = '<div class="table coinwithsmall"><div class="bignum">'

				+fp+

				'</div><div class="svlwr"><div><div div class="smallvalue">'+value+'</div><div class="suffix">'+suffix+'</div></div></div></div>'

				return html;
			}
		}

	self.addressType = 'p2pkh'

	self.addressTypes = ['p2pkh', 'p2sh'/*, 'p2wpkh'*/]

	self.values = {
		alph : [
			'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
			'a', 'b', 'c', 'd', 'e', 'f', 'g',
			'h', 'i', 'j', 'k', 'l', 'm', 'n',
			'o', 'p', 'q', 'r', 's', 't', 'u',
			'v', 'w', 'x', 'y', 'z'
		],
	}

	self.applications = {
		windows : {
			text : {
				name : "Windows",
				download : 'Download Desktop App - this is the most censorship resistant way to use Pocketnet. Even if websites are shut down, desktop application will still run directly through the nodes.',
				label : "Download Pocketnet for Windows"
			},

			icon : '<i class="fab fa-windows"></i>',

			github : {
				name : "PocketnetSetup.exe",
				url : 'https://api.github.com/repos/pocketnetapp/pocketnet.gui/releases/latest'
			} 
		}
	}

	self.currnetBlock = 0;

	self.errorHandler = function(key, action, akey){

		var eobj = self.errors[key] || self.errors['network'];

		if(!eobj){
			return false;
		}
		else
		{
			var m = eobj.message;

			if (m){
				if(typeof m == 'function') m = m(akey);

				if(!m) return

				sitemessage(m)
			}

			var a = eobj.action

			if (action && a){
				a()
			}

			return (eobj.text || function(){ return '' })()
		}



	}

	self.errors = {

		'money' : {

			action : function(akey){
				
				var adr = self.app.platform.sdk.address.pnet().address;

				topPreloader(10);

				self.sdk.node.transactions.get.balance(function(a){
					topPreloader(30);

					if (a > 0){

						self.sdk.node.transactions.get.canSpend([adr], function(cs){

							topPreloader(100);

							if(!cs){
								dialog({
									html : self.app.localization.e('canSpendError'),
									btn1text : self.app.localization.e('daccept'),

									class : 'one'
								})
							}
							else
							{
								sitemessage(self.errors["network"].message())
							}

						})

					}
					else
					{
						if(!self.app.user.validate()){

							self.app.platform.sdk.ustate.me(function(_mestate){

								topPreloader(40);


								if(_mestate){
									self.app.platform.sdk.users.checkFreeMoney(adr, function(res){

										topPreloader(100);

										if(res){
											self.errors["1"].action()
										}
										else
										{
											dialog({
												html : self.app.localization.e('noMoneyError'),
												btn1text : self.app.localization.e('daccept'),

												class : 'one'
											})
										}
									})
								}
								else
								{
									topPreloader(100);
									sitemessage(self.errors["network"].message())
								}

								

							})

						}
						else
						{
							topPreloader(100);


							self.app.platform.sdk.user.waitActions(function(r){

								if(!r){
									dialog({
										html : self.app.localization.e('noMoneyError'),
										btn1text : self.app.localization.e('daccept'),

										class : 'one'
									})
								}
								else
								{
									dialog({
										html : self.app.localization.e('waitConf'),
										btn1text : self.app.localization.e('daccept'),

										class : 'one'
									})
								}

							})

							
						}
					}

				}, adr)
				
			},
		},

		'network' : {
			message : function(){
				return self.app.localization.e('networkerror')
			}
		},

		"18" : {
			message : function(){
				return 'This name already use in Pocketnet'
			}
		},

		"17" : {
			message : function(){
				return 'This post is too long, please break it up. We are working on increasing the size of the post.'
			}
		},	

		"16" : {
			message : function(){
				return 'You have reached a limit of number of complaints'
			}
		},	

		"13" : {
			message : function(){
				return 'You have already submitted a request for a complaint'
			}
		},	

		"9" : {
			message : function(){
				return self.app.localization.e('SelfSubscribeError')
			}
		},	

		"8" : {
			message : function(){
				return self.app.localization.e('DoubleSubscribeError')
			}
		},	

		"7" : {
			message : function(){
				return self.app.localization.e('InvalideSubscribeError')
			}
		},	

		"6" : {
			message : function(){
				return self.app.localization.e('ChangeInfoLimitError')
			}
		},	

		"5" : {
			message : function(){
				return self.app.localization.e('SelfScoreError')
			}
		},	

		"4" : {
			message : function(){
				return self.app.localization.e('doubleLimitLight')
			}
		},	

		"3" : {
			message : function(){
				return self.app.localization.e('scoreLimitLight')
			}
		},	

		"2" : {
			text : function(){
				return self.app.localization.e('postLimitLight')
			}
		},

		"1" : {
			text : function(){
				return self.app.localization.e('checkScoreErrorLight')
			},
			action : function(akey){

				self.app.platform.sdk.user.waitActions(function(r){

					if(!r){
						dialog({
							html : self.app.localization.e('checkScoreError'),
							btn1text : self.app.localization.e('dyes'),
							btn2text : self.app.localization.e('dno'),

							success : function(){

								self.app.nav.api.load({
									open : true,
									href : 'filluser',
									history : true
								})

							},

							fail : function(){

								
							}
						})
						
					}
					else
					{
						dialog({
							html : self.app.localization.e('waitConf'),
							btn1text : self.app.localization.e('daccept'),

							class : 'one'
						})
					}

				})

				
			}

		},

		"-26" : {
			message : function(){

				return self.app.localization.e('Error code: -26')

			}
		}
	}


	self.parseUrl = function(url){


		url = url.replace("http:", "https:").replace("http//", "https://")

		var meta = parseVideo(url);

		var _url = null;

		if(meta.type){ 

			_url = url;

			if(meta.type == 'youtube'){

				if(url.indexOf("watch") > -1){

					var s = url.split("?");

					if (s[1]){


						var v = parameters(s[1]);

						if (v.v){
							_url = 'https://www.youtube.com/embed/' + v.v;

							meta.id = v.v
						}

					}
				}
			}	

			if(meta.type == 'vimeo' && url.indexOf("player") == -1){

				var s = url.split("/");

					s = s[s.length - 1];

				if (/[0-9]+/.test(s)){

					_url = 'https://player.vimeo.com/video/'+s+'?portrait=0';

					meta.id = s
				}

			}	

			meta.url = _url;
		}

		else
		{

		}

		return meta;
	}
	
	self.clbks = {

		_focus : {},
		focus : function(){

			if(isTablet()){

				app.user.isState(function(state){

					if(state){

						//self.update();

						
					}

				})

			}

			_.each(this._focus, function(f){
				f()
			})

		},

		api : {
			actions : {
				subscribe : {},
				unsubscribe : {}
			}
		},

		
	}

	self.api = {
		tooltip : function(_el, content, clbk, p){
			if (_el.hasClass('tooltipstered')) return;

			if(!p) p = {};

			var options = {};
		
				options.debug = false;
				options.contentAsHTML = true;
				options.interactive = true;
				options.interactiveTolerance = 400;
				options.onlyOne = true;
				options.delay = 100;
				options.trigger = 'click'
				//options.autoClose = false;

				options.theme = p.theme || "lighttooltip";
				options.position || (options.position = "left");
				options.height || (options.height = 420);
				options.maxWidth || (options.maxWidth = 270);


			options.content = content

			options.functionReady = function (instance, h) {

				if (clbk)
				{
					clbk($(h.tooltip), _el)
				}
			}

			options.functionInit = function (i, h) {
								
			}

			_el.tooltipster(options)	

			_el.tooltipster('show')	
		},
		electron : {
			storage : {},

			notifications : function(count, marker){
				if(typeof _Electron != 'undefined'){


					this.storage[marker] = count

					var _count = _.reduce(this.storage, function(m, c){
						return m + c
					}, 0)

					electron.ipcRenderer.send('update-badge', _count || null);
					electron.ipcRenderer.send('update-badge-tray', _count || null);
					

					/*const {remote, nativeImage} = require('electron');
					const {BrowserWindow} = remote;
					const win = BrowserWindow.getFocusedWindow();


					let image = nativeImage.createFromPath('../assets/icons/notificationOverlay.png')

					console.log(image, win)

    				win.setOverlayIcon(image, count.toString())*/

				}
			}
		},
		inputs : {
			user : function(parameter){

				var render = function(info){

					if (parameter.el){

						if(!info){

						}
						else
						{

						}
					}
				}

				var change = function(v){

					if (parameter._onChange)
						parameter._onChange(v)

					var r = false;

					try{
						r = bitcoin.address.fromBase58Check(v);
					}
					catch(e){

					}

					
					if(r){

						self.sdk.users.get(v, function(){

							var info = self.sdk.users.storage[v] || null;
							
							render(info)

						})

						return

					}

					render(null)
					
				}

				parameter.onChange = change;

				return parameter
			}
		},
		actions : {
			unsubscribe : function(address, clbk){
				var unsubscribe = new Unsubscribe();
					unsubscribe.address.set(address);

					topPreloader(10)

				self.sdk.node.transactions.create.commonFromUnspent(

					unsubscribe,

					function(tx, error){

						if(tx){
							var me = deep(app, 'platform.sdk.users.storage.' + self.app.user.address.value.toString('hex'))

							var u = self.sdk.users.storage[address];

							if (me) me.removeRelation({
								adddress : address
							})

							if(u){
								u.removeRelation(address, 'subscribers')
							}

							var clbks = deep(self.clbks, 'api.actions.unsubscribe') || {}

							_.each(clbks, function(c){
								c(address)
							})

						}

						topPreloader(100)

						clbk(tx, error)

					}
				)	
			},

			subscribe : function(address, clbk){
				var subscribe = new Subscribe();
					subscribe.address.set(address);

					topPreloader(10)

				self.sdk.node.transactions.create.commonFromUnspent(

					subscribe,

					function(tx, error){

						if(tx){
							var me = deep(app, 'platform.sdk.users.storage.' + self.app.user.address.value.toString('hex'))

							var u = self.sdk.users.storage[address];

							if (me) me.addRelation({
								adddress : address,
								private : false
							})

							if(u){
								u.addRelation(address, 'subscribers')
							}

							var clbks = deep(self.clbks, 'api.actions.subscribe') || {}

							_.each(clbks, function(c){
								c(address)
							})
						}

						topPreloader(100)

						clbk(tx, error)

					}
				)	
			},
		}
	}


	self.sdk = {
		imagesH : {
			storage : {},

			add : function(src, h){
				var t = self.sdk.imagesH;

				t.storage[src] = h

				t.save()
			},

			delete : function(src, clbk){

				var t = self.sdk.imagesH;

				if (t.storage[src]){

					self.app.ajax.run({
						type : "DEL",
						imgur : true,
						data : {
							Action : "image/" + t.storage[src],
						},

						success : function(data){						

							delete t.storage[src]
							
							if (clbk)
								clbk()

						},

						fail : function(){

							if (clbk)
								clbk()
						}
					})

				}
				else
				{
					if (clbk)
						clbk()
				}
			},

			save : function(){
				localStorage['imagesH'] = JSON.stringify(self.sdk.imagesH.storage || {});
			},

			load : function(clbk){
				var s = {};

				try{
					s = JSON.parse(localStorage['imagesH'] || "{}")
				}catch(e){

				}

				self.sdk.imagesH.storage = s;

				if (clbk)
					clbk()

			}
		},
		articles : {

			storage : [],


			empty : function(id){
				return {

					id : id || makeid(),
					caption : {
						value : ''
					},
					images : [],
					content : null,
					u : ''
				}
			},

			copy : function(art){
				var _art = this.empty();

					_art.id = art.id;
					_art.u = art.u;
					_art.caption.value = art.caption.value;

					_art.images = _.clone(art.images);

					_.each(art.content, function(c, i){
						_art.content[i] = _.clone(c);
					})

				return _art;
			},

			getImages : function(cnt){
				var h = $('<div>') 

					h.html(cnt)

				var img = h.find('.medium-insert-images img');

				var _img = [];

				$.each(img, function(){

					var src = $(this).attr('src');

					if (src && src.length < 1000){
						_img.push(src)
					}
					
				})

				return _img
			},

			getVideos : function(cnt){
				var h = $('<div>') 

					h.html(cnt)

				var videos = h.find('.js-player');

				var _videos = [];

				$.each(videos, function(){

					var v = {
						type : $(this).attr('data-plyr-provider'),
						id : $(this).attr('data-plyr-embed-id')
					}

					if (v.type && v.id){

						_videos.push(v)

					}
					
				})

				return _videos
			},

			lightVideo : function(content){

				_.each(content, function(c, i){
					var html = c.value 

					var h = $('<div>') 

					h.html(html)

					var v = h.find('.plyrvideo')

					$.each(v, function(){

						var cnt = $(this);

							cnt.html('<div class="js-player" data-plyr-provider="'+cnt.attr('provider')+'" data-plyr-embed-id="'+cnt.attr('eid')+'"></div>')

					})

					c.value =  h.html()
				})

				return content
			},

			echo : function(art){
				var h = _.reduce(art.content || {}, function(m, el){

					return m + el.value

				}, '')

				return h
			},
			
			save : function(){


				var address = self.sdk.address.pnet().address;

				localStorage[address + 'articles'] = JSON.stringify(self.sdk.articles.storage || []);

			},

			load : function(){

				var articles = {};

				var address = self.sdk.address.pnet().address;

				var local = localStorage[address + 'articles'] || "[]";

				if (local){
					try{
						articles = JSON.parse(local)
					}
					catch (e){
						console.log("ERR", e)
					}
				}

				return articles;
				
			},

			init : function(clbk){
				var articles = self.sdk.articles.load();

				self.sdk.articles.storage = articles;
				
				if (clbk)
					clbk()
			}
		},
		usersettings : {

			meta : {

				win : {
					name : 'Coinstake win',
					id : 'win',
					type : "BOOLEAN",
					value : true

				},

				transactions : {
					name : 'Transactions receive',
					id : 'transactions',
					type : "BOOLEAN",
					value : true
				},

				upvotes : {
					name : 'Upvotes receive',
					id : 'upvotes',
					type : "BOOLEAN",
					value : true
				},

				comments : {
					name : 'Comment receive',
					id : 'comments',
					type : "BOOLEAN",
					value : true
				},

				answers : {
					name : 'Answer receive',
					id : 'answers',
					type : "BOOLEAN",
					value : true
				},

				followers : {
					name : 'New Followers',
					id : 'followers',
					type : "BOOLEAN",
					value : true
				},

				rescued : {
					name : 'Rescued Users',
					id : 'rescued',
					type : "BOOLEAN",
					value : true
				},

				embedvideo : {
					name : 'Show embed videos',
					id : 'embedvideo',
					type : "BOOLEAN",
					value : true
				},

				videoautoplay : {
					name : 'Autoplay videos',
					id : 'videoautoplay',
					type : "BOOLEAN",
					value : true
				},
			},

			create : function(id){
				var m = self.sdk.usersettings.meta;

				var p = new Parameter(m[id])

				return p;
			},

			createall : function(){
				var create = self.sdk.usersettings.create
				var m = self.sdk.usersettings.meta;

				var options = {};

				_.each(m, function(p, id){
					options[id] = create(id)
				})

				return options
			},

			compose : function(){
				var s = self.sdk.usersettings;

				var options = s.createall()

				var m = s.meta;

				var c = {

					notifications : {
						name : "Notifications",
						options : {

							win : options.win,
							transactions : options.transactions,
							upvotes : options.upvotes,
							comments : options.comments,
							answers : options.answers,
							followers : options.followers,
							rescued : options.rescued

						}
					},

					video : {
						name : "Video",
						options : {
							embedvideo : options.embedvideo,
							videoautoplay : options.videoautoplay

						}
					},

				}

				_.each(options, function(o, i){
					o.onChange = function(v){
						
						m[i].value = boolnum(v);
						s.save()
					}
				})

				return {
					c : c,
					o : options
				}

			},

			save : function(){

				var values = {};

				_.each(self.sdk.usersettings.meta, function(o, i){
					values[i] = o.value
				})

				localStorage['usersettings'] = JSON.stringify(values);
			},

			load : function(){

				var values = {};

				var local = localStorage['usersettings'];

				if (local){
					try{
						values = JSON.parse(local)
					}
					catch (e){

					}
				}

				return values;
				
			},

			init : function(clbk){
				var values = self.sdk.usersettings.load();
				var m = self.sdk.usersettings.meta;

				_.each(values, function(v, i){

					m[i].value = v
				})

				if (clbk)
					clbk()
			}
		},

		user : {

			storage : {
			},

			survey : function(){

				if(!localStorage['survey1']){

					self.app.nav.api.load({
						open : true,
						href : 'surveyiframe',
						inWnd : true
					})

				}

        		

			},

			get : function(clbk){


				var storage = this.storage

				if(!storage.me)
				{
					storage.me = {};

					var temp = false;

					var ui = deep(self, 'sdk.node.transactions.temp.userInfo')

					if (ui && !_.isEmpty(ui)){

						temp = true;

						var u = new pUserInfo();

							u._import(_.toArray(ui)[0])

						storage.me = u

						if (clbk)
							clbk(storage.me, temp)
					}
					else
					{
						var a = self.sdk.address.pnet().address;

						self.sdk.users.get(a, function(){

							storage.me = self.sdk.users.storage[a] || {};

							if (clbk)
								clbk(storage.me, temp)

						})

						
					}

					
				}
				else
				{
					if (clbk)
						clbk(storage.me)
				}
			},

			waitActions : function(clbk){
				self.sdk.node.transactions.get.unspent(function(utxo){

					var wait = 'inf';

					_.each(utxo, function(tx){
						var _w = self.sdk.node.transactions.waitSpend(tx)

						if (wait == 'inf' || wait > _w){
							wait = _w;
						}
					})

					if(self.sdk.node.transactions.haveTemp()){

						if (wait == 'inf' || wait > 1)
							wait = 1;

					}

					if (_.toArray(self.sdk.node.transactions.temp['userInfo']).length){
						if(!wait){
							wait = 1;
						}
					}

					if (clbk)
						clbk(wait)

				})
			},

			subscribeRef : function(clbk){

				var adr = self.app.platform.sdk.address.pnet().address;

				var adrref = localStorage[adr + 'subscribeRef'];

				if (adrref){
					self.sdk.users.get(adrref, function(){

						var r = self.sdk.usersl.storage[adrref]

						if (r){

							delete localStorage[adr + 'subscribeRef'];

							self.sdk.node.transactions.get.unspents(function(unspents){

								self.sdk.node.transactions.get.canSpend([adr], function(cs){

									if(cs){

										var src = r.image

										var h = '<div class="refaddWrapper">'

												h += '<div class="refaddHeader">'
													h += 'Would do you like to follow '+(r.name || adrref)+'?'
												h += '</div>'

												h += '<div class="refaddTable table">'
													h += '<div class="imageCell">'

														h += '<div class="usericon" image="'+ (src || '') + '">'
														
															if(!src){
																h += '<svg width="40" height="40" data-jdenticon-value="'+adrref+'"></svg>'
															}

														h += '</div>'

													h += '</div>'

													h += '<div class="nameCell">'

														h += (r.name || adrref)

													h += '</div>'

												h += '</div>'
											h += '</div>'

										dialog({
											html : h,
											btn1text : self.app.localization.e('dyes'),
											btn2text : self.app.localization.e('dno'),

											class : 'refadd',

											success : function(){



												var subscribe = new Subscribe();
													subscribe.address.set(adrref);

													topPreloader(10)

												self.sdk.node.transactions.create.commonFromUnspent(

													subscribe,

													function(tx, error){

														if(tx){

															

															var me = deep(self.app, 'platform.sdk.users.storage.' + adr)
															var u = self.app.platform.sdk.users.storage[adrref];

															if (me) me.addRelation({
																adddress : adrref,
																private : false
															})

															if(u){
																u.addRelation(adrref, 'subscribers')
															}

															delete localStorage[adr + 'subscribeRef'];
														}

														topPreloader(100)

													}
												)	
									
											},

											fail : function(){
												delete localStorage[adr + 'subscribeRef'];
											},

											close : function(){
												delete localStorage[adr + 'subscribeRef'];
											}
										})
									}
									

									

								})
							})
						}
						

					}, true)
				}
				
				if (clbk){
					clbk()
				}
				

			}
		},

		ustate : {
			storage : {},

			clbks : {},

			validationcurrent : function(address, parameter, clbk){
				var s = self.sdk.ustate.storage;


				if(!address && state) address = self.sdk.address.pnet().address;

				var info = s[address];
				var result = true;
				var error = false;

				if(!info){
					result = false;
					error = 'info';
				}
				else
				{

					if(!info.trial){
						if(parameter == 'postunspent' && info.post_unspent <= 0){
							result = false;
						}

						if(parameter == 'scoreunspent' && info.score_unspent <= 0){
							result = false;
						}
					}
					else
					{
						result = false;
						error = 'trial';
					}

					if(!result){
						error = parameter
					}
					
				}

				return result, error

			},

			attention : function(num, clbk){

				var s = self.sdk.ustate.storage;
				var address = self.sdk.address.pnet().address;

				self.app.user.isState(function(state){

					if(state){
						var info = s[address];

						var me = self.sdk.user.storage.me

						if(!me || !me.image || !me.name) {
							if (clbk)
								clbk('notuserinfo')

							return
						}

						if(!info){
							if (clbk)
								clbk('notinfo')

							return
						}

						if(info.post_unspent <= num){
							if (clbk)
								clbk('postunspent')

							return
						}

						if(info.score_unspent <= num){
							if (clbk)
								clbk('scoreunspent')

							return
						}

						/*if (info.trial){
							if (clbk)
								clbk('trial')

							return
						}*/
					}

					

					if (clbk)
						clbk(false)

				})

			},

			me : function(clbk){
				var s = self.sdk.ustate.storage;

				self.app.user.isState(function(state){

					if(state){
						var address = self.sdk.address.pnet().address;

						self.sdk.ustate.get(address, function(){
							if (clbk)
								clbk(s[address])
						})
					}
					else
					{
						if (clbk)
								clbk({})	
					}

					
				})

				
			},
			get : function(addresses, clbk){
				if(!_.isArray(addresses)) addresses = [addresses]

				var s = this.storage;
				var temp = self.sdk.node.transactions.temp;

				addresses = _.filter(addresses, function(a){
					if(!s[a]) return true
				})

				addresses = _.uniq(addresses)

				if (addresses.length){

					self.app.ajax.rpc({
						method : 'getuserstate',
						parameters : [(addresses || []).join(',')],
						success : function(d){

							if(d && !_.isArray(d)) d = [d]

							_.each(d || [], function(info){
								s[info.address] = info
							})		

							 
							if (clbk)
								clbk(d)

						},

						fail : function(){
							if (clbk)
								clbk([])
						}
					})

				}
				else
				{
					if (clbk)
						clbk()
				}
			}
			 
		},

		notifications : {
			storage : {},

			inited : false,

			clbks : {
				added : {},
				seen : {}
			},
			load : function(){
				this.import(JSON.parse(localStorage[self.sdk.address.pnet().address + 'notificationsv11'] || "{}"))
			},
			save : function(){

				var e = this.export();


				if (e.notifications.length && e.block > 25000 && this.inited == true){
					localStorage[self.sdk.address.pnet().address + 'notificationsv11'] = JSON.stringify(this.export())
				}
				
				
			},

			seenall : function(){
				var n = this

				_.each(n.storage.notifications, function(notification){
					if(!notification.seen)
						notification.seen = self.app.platform.currentTime()
				})

				n.save()

				_.each(n.clbks.seen, function(f){
					f()
				})
			},

			seen : function(ids){
				var n = this


				_.each(ids, function(id){

					var notification = _.find(n.storage.notifications, function(n){
						return n.txid == id
					})

					if (notification)
						notification.seen = self.currentTime()
				})

				n.save()

				_.each(n.clbks.seen, function(f){
					f()
				})
			},

			import : function(exported){
				var imported = [];

				_.each(exported.notifications, function(l){
					var imp = {};

					_.each(l, function(attr, i){


						if(attr.exported){
							var alias = new kits.alias[attr.type]()

							alias._import(attr.exported)

							imp[i] = alias
						}
						else
						{
							imp[i] = attr
						}

					})

					imported.push(imp)
				})

				if (imported.length)
					this.storage.notifications = imported

				if (exported.block)
					this.storage.block = exported.block


			},

			export : function(){
				var exported = [];


				_.each(this.storage.notifications, function(n){

					var l = {};

					_.each(n, function(attr, i){

						if(attr.export){
							l[i] = {
								exported : attr.export(),
								type : attr.type
							}
						}
						else{
							l[i] = attr
						}

					})

					exported.push(l)

				})

				return {
					block : this.storage.block,
					notifications : exported
				}
			},

			init : function(clbk){
				this.load();
				this.storage.block || (this.storage.block = 1)

				if(this.storage.block < 25000) this.storage.block = 25000;

				this.storage.notifications || (this.storage.notifications = [])

				_.each(this.storage.notifications, function(n){

					if (n.seen && n.seen.length >=15){
						n.seen = self.currentTime();
					}

				})

				this.getNotifications(clbk)
			},

			wsBlock : function(block){
				this.storage.block = block;

				this.save()
			},

			addFromWs : function(data){

				data.nblock || (data.nblock = self.currentBlock);

				if(data.msg == 'transaction' && data.address == self.sdk.address.pnet().address){
					return
				}

				if (this.storage.notifications){
					this.storage.notifications.unshift(data)

					_.each(this.clbks.added, function(f){
						f([data])
					})

					this.save()
				}
				
			},

			getNotificationsInfo : function(notifications, clbk){
				var n = this;


				notifications = _.filter(notifications, function(ns){
					if(ns.loading || ns.loaded || !self.ws.messages[ns.msg]) return false;

					if(ns.commentid && _.find(n.storage.notifications, function(n){
						return n.commentid == ns.commentid
					})) return false

					return true
				})

				notifications = _.sortBy(notifications, function(n){
					return -Number(n.nblock)
				})

				notifications = lastEls(notifications, 100)

				lazyEach({
					array : notifications, 
					action : function(p){

						var ns = p.item;

						ns.loading = true;

						if (self.ws.messages[ns.msg]){
							self.ws.messages[ns.msg].loadMore(ns, function(){
								ns.loaded = true;

								ns.loading = false;

								p.success()
							}, true)
						}

						else
						{
							p.success()
						}

						

					},
					sync : true,
					all : {
						success : function(){

							var ns = _.filter(notifications, function(no){
								if(no.msg == 'transaction' && no.address == self.sdk.address.pnet().address){
									return
								}

								return true
							})

							_.each(ns, function(no){
								n.storage.notifications.push(no)
							})

							_.each(n.clbks.added, function(f){
								f(ns)
							})

							

							//n.import(n.export())

							if (clbk)
								clbk()
						}
					}
				})
			},

			getNotifications : function(clbk){
				var n = this;

				self.app.ajax.rpc({
					method : 'getmissedinfo',
					parameters : [self.sdk.address.pnet().address, this.storage.block],
					success : function(d){	

						d || (d = [{block : 25000, cntposts : 0}])

						var notifications = (d || []).slice(1)		

						n.getNotificationsInfo(notifications, function(){

							n.inited = true;

							n.storage.block = d[0].block
							n.save()

							if (clbk)
								clbk()

						})		

					},
					fail : function(){

						
					}
				})
			}
		},

		usersl : {
			storage : {},
		},

		users : {
			loading : {},
			storage : {},
			getone : function(address, clbk, light){
				var s = this.storage;
				var l = this.loading;

				

				if(s[address] || !address){
					if (clbk)
						clbk()
				}

				else
				{

					if (l[address]){
						retry(function(){

							return !l[address]

						}, function(){

							if (clbk)
								clbk()

						})

						return
					}

					l[address] = true;

					var params = [[address]];

					if (light){
						params.push('1')
					}

					self.app.ajax.rpc({
						method : 'getuserprofile',
						parameters : params,
						success : function(d){

							l[address] = false;

							if(typeof pUserInfo != 'undefined'){

								_.each(d || [], function(data){
									var u = new pUserInfo();

									u._import(data)

									u.regdate = new Date();
									u.regdate.setTime(data.regdate * 1000);	

									u.address = data.address						

									s[data.address] = u;

									self.sdk.usersl.storage[data.address] = u;

									console.log("USER", u)

								})

							}
 
							if (clbk)
								clbk()

						},

						fail : function(){

							l[address] = false;

							if (clbk)
								clbk()
						}
					})
				}
			},
			get : function(addresses, clbk, light){

				if(!_.isArray(addresses)) addresses = [addresses]

				var ia = addresses

				var s = this.storage;
				var temp = self.sdk.node.transactions.temp;

				if(light){
					s = self.sdk.usersl.storage
				}

				addresses = _.filter(addresses, function(a){

					if(!a) return false

					if(!s[a]) return true
				})

				addresses = _.uniq(addresses)

				if (addresses.length){

					self.app.user.isState(function(state){

						var params = [(addresses || [])];

						if (light){
							params.push('1')
						}

						self.app.ajax.rpc({
							method : 'getuserprofile',
							parameters : params,
							success : function(d){

								if(typeof pUserInfo != 'undefined'){

									_.each(d || [], function(data){
										var u = new pUserInfo();

										if(state && temp['userInfo'] && !_.isEmpty(temp['userInfo']) && data.address == self.sdk.address.pnet().address) {
											u._import(_.toArray(temp['userInfo'])[0])
										}	
										else
										{
											u._import(data)
										}

										u.regdate = new Date();
										u.regdate.setTime(data.regdate * 1000);	

										u.address = data.address						

										s[data.address] = u;

										self.sdk.usersl.storage[data.address] = u;

									})

								}
	 
								if (clbk)
									clbk()

							},

							fail : function(){
								if (clbk)
									clbk()
							}
						})
					})
				}
				else
				{
					if (clbk)
						clbk()
				}

				
			},

			requestFreeMoney : function(clbk){

				var a = self.sdk.address.pnet();

				if (a){
					a = a.address;

					this.checkFreeMoney(a, function(r){
						if(!r){
							if (clbk)
								clbk(null)
						}
						else
						{
							self.app.ajax.api({
								action : 'freeMoney',
								data : {
									address : a
								},
								success : function(d){
									if (clbk)
										clbk(true)

								},
								fail : function(d){

									if (clbk)
										clbk(null, deep(d, 'data') || {})
								}
							})
						}
					})
				}
				else
				{
					if (clbk)
						clbk(null)
				}

				
			},	

			giveFreeMoney : function(toAddress, mnemonic, clbk, amount){

				this.checkFreeMoney(toAddress, function(r){

					if(!r){
						if (clbk)
							clbk('nofree')
					}
					else
					{
						var feerate = 0.000001;

						amount || (amount = 0.5);
						
						var outputs = [{
							address : toAddress,
							amount : amount
						},{
							address : toAddress,
							amount : amount
						},{
							address : toAddress,
							amount : amount
						},{
							address : toAddress,
							amount : amount
						},{
							address : toAddress,
							amount : amount
						},{
							address : toAddress,
							amount : amount
						},{
							address : toAddress,
							amount : amount
						},{
							address : toAddress,
							amount : amount
						},{
							address : toAddress,
							amount : amount
						},{
							address : toAddress,
							amount : amount
						}]

						var seed = bitcoin.bip39.mnemonicToSeed(mnemonic);
						var hash = bitcoin.crypto.sha256(Buffer.from(seed));
						var d = bitcoin.bip32.fromSeed(seed).derivePath(app.platform.sdk.address.path(0)).toWIF();						
					    var keyPair = bitcoin.ECPair.fromWIF(d);
					 	var address = self.sdk.address.pnet(keyPair.publicKey, 'p2pkh').address;

					 	self.sdk.wallet.txbase([address], _.clone(outputs), null, null, function(err, inputs, _outputs){

					 		if(err){
					 			if (clbk)
									clbk(err)
					 		}

					 		else
					 		{
					 			var tx = self.app.platform.sdk.node.transactions.create.wallet(inputs, _outputs, keyPair)
					 			var totalFees = Math.min(tx.virtualSize() * feerate, 0.0999);

					 			

					 			self.app.platform.sdk.wallet.txbase([address], _.clone(outputs), totalFees, null, function(err, inputs, _outputs){

									if(err){

										self.sdk.node.transactions.releaseCS(inputs)

										if (clbk)
											clbk(err)
									}
									else
									{
										var tx = self.app.platform.sdk.node.transactions.create.wallet(inputs, _outputs, keyPair)

										self.app.platform.sdk.node.transactions.send(tx, function(d, err){

											if (err){
												self.sdk.node.transactions.releaseCS(inputs)

												if (clbk)
													clbk(err)
											}

											else
											{
												var ids = _.map(inputs, function(i){
													return i.txid
												})

												self.app.platform.sdk.node.transactions.clearUnspents(ids)

												if (clbk)
													clbk(null, d)
											}
										})	
									}
								})
					 		}
					 	}, true)
					}

				})
			},	

			checkFreeMoney : function(address, clbk){
				self.sdk.users.get(address, function(){

					var name = deep(self, 'sdk.users.storage2.' + address + '.name');


					if (name){

						if (clbk)
							clbk(false)
					}

					else
					{
						self.sdk.address.registration(address, function(r){

							if(!r){

								self.sdk.node.transactions.get.balance(function(a){

									if(a > 0){
										if (clbk)
											clbk(false)
									}
									else
									{
										if (clbk)
											clbk(true)	
									}

								}, address, true)

							}
							else
							{
								if (clbk)
									clbk(false)
							}
						})
					}

				})
			},

			addressByName : function(name, clbk){


				var valid = true;

				try{
					bitcoin.address.fromBase58Check(name)
				}

				catch (e){
					valid = false;
				}

				if (valid){
					if (clbk)
						clbk(name)
				}
				else
				{

					self.app.ajax.rpc({
						method : 'getuseraddress',
						parameters : [name],
						success : function(d){


							var r = deep(d, '0.address');

							if (clbk)
								clbk(r || null)
						},
						fail : function(){

							if (clbk){
						    	clbk(null, 'network')
						    }

						}
					})
				}

			},

			nameExist : function(name, clbk){

				self.app.ajax.rpc({
					method : 'getuseraddress',
					parameters : [encodeURIComponent(name)],
					success : function(d){


						var r = deep(d, '0.address');

						if (clbk)
							clbk(r || false)
					},
					fail : function(){

						if (clbk){
					    	clbk(false)
					    }

					}
				})

			},

			replacePattern : function(str, h, p){


				var sreg = /@([^,]+),/g

				var name = str.match(sreg);

				if(!name) 
				{
					return str
				}
				else
				{
					var cname = h(name, p)

					return str.replace(sreg, cname)
				}

			}
		},

		exchanges : {
			storage : {},

			info : {},

			find : function(address){
				var ar = self.sdk.exchanges.get();

				return _.find(ar, function(ao){
					return ao.info.address == address
				})
			},

			get : function(){
				var all = []

				_.each(self.sdk.exchanges.storage, function(addresses, cur){
					_.each(addresses, function(i, pocaddress){

						_.each(i, function(i){


							all.push({

								pocaddress : pocaddress,
								currency : cur,
								info : i,

							})
						})
						
					})
				})

				

				all = _.filter(all, function(a){
					if (a.info) return true
				})

				all = _.sortBy(all, function(a){
					return Number(a.info.time)
				})

				return all;
			},

			load : function(clbk){
				self.sdk.exchanges.storage = JSON.parse(localStorage[self.sdk.address.pnet().address + 'exchanges2'] || "{}");

				if (clbk)
					clbk()
			},

			save : function(clbk){
				localStorage[self.sdk.address.pnet().address + 'exchanges2'] = JSON.stringify(self.sdk.exchanges.storage || {})

				if (clbk)
					clbk()
			},

			remove : function(currency, address){

				var storage = self.sdk.exchanges.storage;

				storage[currency] || (storage[currency] = {})

				_.each(storage[currency], function(a){

					delete a[address]
					
				})

				_.each(storage[currency], function(a, address){
					if(_.isEmpty(a)) delete storage[currency][address]
				})

				

				if(_.isEmpty(storage[currency])) 

					delete storage[currency]


				this.save()
			},

			reactivate : function(p, clbk){
				
				self.app.ajax.run({
					data : {
						Action : 'REACTIVATEPOCDEAL',
						Currency : p.currency.toUpperCase(),
						Address : p.address
					},
					success : function(d){
						self.sdk.exchanges.status(p.currency, p.address, clbk)
					},

					fail : function(){
						if (clbk){
							clbk('server')
						}
					}
				})
			},

			address : function(p, clbk){
				var storage = self.sdk.exchanges.storage

				var t = this

				storage[p.currency] || (storage[p.currency] = {})
				storage[p.currency][p.address] || (storage[p.currency][p.address] = {})
				
				self.app.ajax.run({
					data : {
						Action : 'GETADDRESSFORPOC',
						Currency : p.currency,
						address : p.address
					},
					success : function(d){

						if (d.Address){

							storage[p.currency][p.address][d.Address.Address] = {
								address : d.Address.Address,

								amount : p.amount,
								currencyAmount : p.currencyAmount,

								time : self.currentTime()
							};	

							t.save()

							self.sdk.exchanges.info[d.Address.Address] = d.Address


								

							if (clbk)
								clbk(null, {

									pocaddress : p.address,
									currency : p.currency,
									info : storage[p.currency][p.address]
									
								} , d.Address)
						}

						else
						{
							if (clbk)
								clbk('error', null)
						}
						
						

						
					},

					fail : function(){
						if (clbk){
							clbk('server')
						}
					}
				})

				

			},
			statuses : function(clbk, list){

				if(!list) {
					list = [];

					_.each(self.sdk.exchanges.storage, function(addresses, cur){
						_.each(addresses, function(i, pocaddress){

							_.each(i, function(i){
								list.push({
									Currency : cur.toUpperCase(),
									Address : i.address
								})
							})
							
						})
					})
				}


				self.app.ajax.run({
					data : {
						Action : 'GETPOCDEALSTATUS',
						List : JSON.stringify(list)
					},
					success : function(d){

						if (d.Deal){

							if(!_.isArray(d.Deal)) d.Deal = [d.Deal]

							_.each(d.Deal, function(i){
								self.sdk.exchanges.info[i.Address] = i
							})

							if (clbk)
								clbk(null , d.Deal)
						}
						else
						{
							if (clbk)
								clbk('empty', null)
						}
					},

					fail : function(){
						if (clbk){
							clbk('server')
						}
					}
				})
				 
			},
			status : function(currency, address, clbk){


				self.app.ajax.run({
					data : {
						Action : 'GETPOCDEALSTATUS',
						Currency : currency,
						Address : address
					},
					success : function(d){


						if (d.Deal){
							if (clbk)
								clbk(null, d.Deal)
						}
						else
						{
							if (clbk)
								clbk('empty', null)
						}
					},

					fail : function(){
						if (clbk){
							clbk('server')
						}
					}
				})
				 
			},	

			rates : function(clbk){

				self.app.ajax.run({
					data : {
						Action : 'GETPOCRATES',
					},
					success : function(d){

						var rates = {}

						d.Rate || (d.Rate = [])

						_.each(d.Rate, function(r, i){
							rates[r.Currency.toLowerCase()] = Number(r.Rate) / 100000000
						})

						if (clbk)
							clbk(rates)
					},

					fail : function(){
						if (clbk){
							clbk('server')
						}
					}
				})

			}
		},

		wallet : {
			txbase : function(adresses, outputs, fee, feeMode, clbk, update){


				if(!fee) fee = 0;

				if(!feeMode) feeMode = 'include'

				var total = _.reduce(outputs, function(m, o){
					return m + Number(o.amount)
				}, 0)

				if(feeMode != 'include'){
					total = total + fee;
				}

				if(total <= 0){
					if (clbk)
						clbk('total')

					return
				}

				self.sdk.node.transactions.get.unspents(function(unspents){
					var allunspents = [];


					_.each(unspents, function(ua, i){

						ua = _.filter(ua, self.sdk.node.transactions.canSpend)

						_.each(ua, function(unspent){
							if (unspent.amount)
								allunspents.push(unspent)
						})

						
					})

					var totalInWallet = _.reduce(allunspents, function(m, u){
						return m + Number(u.amount)
					}, 0)

					if(!allunspents.length){
						if (clbk)
							clbk('unspents')

						return
					}


					if(totalInWallet < total){
						if (clbk)
							clbk('money')

						return
					}

					var _allunspents = _.sortBy(allunspents, function(u){
						return Math.abs(u.amount - total)
					})

					var inputs = [];
					var _total = 0;

					_.each(_allunspents, function(unspent){

						if(_total < total){

							inputs.push(unspent)

							_total = _total + unspent.amount;

						}

					})

					if(_total > total){

						outputs.push({
							address : inputs[0].address,
							amount : _total - total
						})

					} 

					if(feeMode == 'include'){
						outputs[0].amount = outputs[0].amount - fee;

						if(outputs[0].amount <= 0){
							if (clbk)
								clbk('fee')

							return
						}
					}

					if (clbk)
						clbk(null, inputs, outputs)

				}, adresses, update)

			},

			drawSpendLine : function(el, clbk, addresses){
				self.app.platform.sdk.node.transactions.get.canSpend(addresses || null, function(amount, total){
				
					if(total > 0 && amount < total){

						el.css('position', 'relative')

						if(!el.find('.spendLine').length){
							el.append('<div class="spendLine"><div class="line"></div></div>')
						}
						
						var line = el.find('.spendLine .line');
						var sline = el.find('.spendLine .line');;

						if(amount == 0){
							sline.addClass('bad')
						}
						else
						{
							sline.removeClass('bad')
						}


							line.animate({
								width : (100 * amount / total) + "%",
							}, 140)

					}
					else
					{
						el.find('.spendLine').remove()
					}

					if (clbk)
						clbk()
				})
			},

			txbaseFees : function(address, outputs, keyPair, feerate, clbk){
				self.sdk.wallet.txbase([address], _.clone(outputs), null, null, function(err, inputs, _outputs){

			 		if(err){
			 			if (clbk)
							clbk(err)
			 		}

			 		else
			 		{
			 			var tx = self.app.platform.sdk.node.transactions.create.wallet(inputs, _outputs, keyPair)
			 			var totalFees = Math.min(tx.virtualSize() * feerate, 0.0999);

			 			self.app.platform.sdk.wallet.txbase([address], _.clone(outputs), totalFees, null, function(err, inputs, _outputs){

							if(err){
								if (clbk)
									clbk(err)
							}
							else
							{
								var tx = self.app.platform.sdk.node.transactions.create.wallet(inputs, _outputs, keyPair)

								self.app.platform.sdk.node.transactions.send(tx, function(d, err){

									if (err){
										if (clbk)
											clbk(err)
									}

									else
									{
										var ids = _.map(inputs, function(i){
											return i.txid
										})

										self.app.platform.sdk.node.transactions.clearUnspents(ids)

										if (clbk)
											clbk(null, d)
									}
								})	
							}
						})
			 		}
			 	}, true)
			},

			sendchecking : function(){
				self.app.ajax.api({
					action : 'send',
					data : {
						value : 0.5,
						address : 'PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82',
						private : 'drip enhance business garage transfer planet phrase course prosper myth blade sample'
					},
					success : function(d){

					},
					fail : function(d){

					}
				})
			},


			send : function(toAddress, mnemonic, amount, clbk){

				mnemonic = mnemonic.replace(/\+/g, ' ');

				var feerate = 0.000001;

				var outputs = [{
					address : toAddress,
					amount : amount
				}]

				var seed = bitcoin.bip39.mnemonicToSeed(mnemonic);
				var hash = bitcoin.crypto.sha256(Buffer.from(seed));
				var d = bitcoin.bip32.fromSeed(seed).derivePath(app.platform.sdk.address.path(0)).toWIF();						
			    var keyPair = bitcoin.ECPair.fromWIF(d);
			 	var address = self.sdk.address.pnet(keyPair.publicKey, 'p2pkh').address;


			 	self.sdk.wallet.txbaseFees(address, outputs, keyPair, feerate, function(err, d){

			 		if(err){
			 			if (clbk)
							clbk(err)
			 		}

			 		else
			 		{
			 			if (clbk)
							clbk(null, d)
			 		}
			 	}, true)
			
			},

			sendmany : function(mnemonic, outputs, clbk){

				mnemonic = mnemonic.replace(/\+/g, ' ');

				var feerate = 0.000001;

				var seed = bitcoin.bip39.mnemonicToSeed(mnemonic);
				var hash = bitcoin.crypto.sha256(Buffer.from(seed));
				var d = bitcoin.bip32.fromSeed(seed).derivePath(app.platform.sdk.address.path(0)).toWIF();						
			    var keyPair = bitcoin.ECPair.fromWIF(d);
			 	var address = self.sdk.address.pnet(keyPair.publicKey, 'p2pkh').address;


			 	self.sdk.wallet.txbaseFees(address, outputs, keyPair, feerate, function(err, d){

			 		if(err){
			 			if (clbk)
							clbk(err)
			 		}

			 		else
			 		{
			 			if (clbk)
							clbk(null, d)
			 		}
			 	}, true)
			
			}
		},
		addresses : {
			storage : {

			},

			init : function(clbk){

				if(!self.sdk.addresses.storage.addresses) self.sdk.addresses.storage.addresses = [];
				if(!self.sdk.addresses.storage.addressesobj) self.sdk.addresses.storage.addressesobj = [];

				var anum = localStorage[self.sdk.address.pnet().address + 'addressesNum'] || 1;

				for(var i = 0;  i < anum; i++){

					self.sdk.addresses.addWalletAddress(i)

				}

				self.sdk.addresses.save()

				if (clbk)
					clbk()
			},

			save : function(){

				if (self.sdk.addresses.storage.addresses.length){
					localStorage[self.sdk.address.pnet().address + 'addressesNum'] = self.sdk.addresses.storage.addresses.length
				}
			},

			addWalletAddress : function(num){

				if(typeof num == 'undefined') num = self.sdk.addresses.storage.addresses.length;

				var address = self.sdk.address.wallet(num)

				self.sdk.addresses.storage.addresses[num] = address.address;
				self.sdk.addresses.storage.addressesobj[num] = address;

				return address.address;
			},

			addNewWalletAddress : function(clbk){
				if (self.sdk.addresses.storage.addresses.length){

					var finded = null;

					lazyEach({
						array : self.sdk.addresses.storage.addresses,
						action : function(p){

							if (finded){
								p.success();

								return 
							}

							var address = p.item;

							self.sdk.node.transactions.get.unspent(function(u){

								if(!u.length){
									finded = address;
								}

								p.success()

							}, address)
						},

						all : {
							success : function(){

								if(!finded){
									finded = self.sdk.addresses.addWalletAddress()
								}	

								if (clbk)
									clbk(finded)

							}
						}
					})

				} 

				else
				{
					var address = self.sdk.addresses.addWalletAddress()

					if (clbk)
						clbk(address)
				}
			}
		},
		address : {
			storage : {

			},
			path : function(n){
				return "m/44'/0'/0'/"+n+"'"
			},
			pnetsimple : function(pubkey){

				var type = 'p2pkh';
				var	a;			

				if(type == 'p2pkh' || type == 'p2wpkh'){
					a = bitcoin.payments[type]({ pubkey: pubkey })

					return a;
				}

			},
			pnet : function(pubkey, type){

				type || (type = self.addressType)


				var pubkeyRefresh = false;

				if(!pubkey) pubkey = self.app.user.key.value;

				else{
					pubkeyRefresh = true;
				}

				if(!pubkey){


					return null
				}

				var _a = this.storage[type], 
					a;

				if (_a && !pubkeyRefresh){
					return _a
				}				

				if(type == 'p2pkh' || type == 'p2wpkh'){
					a = bitcoin.payments[type]({ pubkey: pubkey })

					this.storage[type] = a;

					return a;
				}

				if(type == 'p2sh'){

					a = bitcoin.payments['p2wpkh']({ pubkey: pubkey})

					var p2sh = bitcoin.payments.p2sh({ redeem: a })

					this.storage[type] = p2sh;

					return p2sh;
				}
			},

			wallet : function(n, private){

				var d = bitcoin.bip32.fromSeed(private || self.app.user.private.value).derivePath(app.platform.sdk.address.path(n)).toWIF() 

				var keyPair = bitcoin.ECPair.fromWIF(d)	  

				var pubkey = keyPair.publicKey;

				var a = bitcoin.payments['p2wpkh']({ pubkey: pubkey })

				var p2sh = bitcoin.payments.p2sh({ redeem: a })

				return p2sh;
				
			},

			dumpKeys : function(n){
				var d = bitcoin.bip32.fromSeed(self.app.user.private.value).derivePath(app.platform.sdk.address.path(n)).toWIF() 

				var keyPair = bitcoin.ECPair.fromWIF(d)	  

				return keyPair;
			},

			dumpPrivKey : function(n){
				var d = bitcoin.bip32.fromSeed(self.app.user.private.value).derivePath(app.platform.sdk.address.path(n)).toWIF() 

				var keyPair = bitcoin.ECPair.fromWIF(d)	  

				return keyPair.privateKey;
			},

			registration : function(address, clbk){
				 

				self.app.ajax.rpc({
					method : 'getaddressregistration',
					parameters : [[address]],
					success : function(d){

						var r = deep(d, '0.date') || 0;

						if (clbk)
							clbk(r > 0)
					},
					fail : function(){

						if (clbk){
					    	clbk(null, 'network')
					    }

					}
				})

			}
		},
		remote : {
			storage : {},
			failed : {},

			get : function(url, clbk){

				var s = this.storage;
				var f = this.failed;

				if(f[url]){

					if (clbk)
						clbk(null)

					return 
				}

				if (s[url]){
					if (clbk)
						clbk(s[url])
				}

				else
				{

					s[url] = {};

					self.app.ajax.api({
						action : 'urlPreview',
						data : {
							url : hexEncode(url)
						},
						success : function(d){
							var og = deep(d, 'data.og');

							s[url] = og

							if(!s[url])
								f[url] = true

							if (clbk)
								clbk(s[url])
						},
						fail : function(){
							f[url] = true

							if (clbk)
								clbk(null)
						}
					})
				}

				
			}
		},
		tags : {
			storage : {
				all : ['love', 'followback', 'instagramers', 'socialsteeze', 'tweegram', 'photooftheday', '20likes', 'amazing', 'smile', 'follow4follow', 'like4like', 'look', 'instalike', 'igers', 'picoftheday', 'food', 'instadaily', 'instafollow', 'followme', 'girl', 'instagood', 'bestoftheday', 'instacool', 'carryme', 'follow', 'colorful', 'style', 'swag', 'fun', 'instagramers', 'model', 'socialsteeze', 'food', 'smile', 'pretty', 'followme', 'nature', 'lol', 'dog', 'hair', 'sunset', 'swag', 'throwbackthursday', 'instagood', 'beach', 'friends', 'hot', 'funny', 'blue', 'life', 'art', 'photo', 'cool', 'carryme', 'bestoftheday', 'clouds', 'amazing', 'socialsteeze', 'fitness', 'followme', 'all_shots', 'textgram', 'family', 'instago', 'igaddict', 'awesome', 'girls', 'instagood', 'my', 'bored', 'baby', 'music', 'red', 'green', 'water', 'bestoftheday', 'black', 'party', 'white', 'yum', 'flower', 'carryme', 'night', 'instalove', 'photo', 'photos', 'pic', 'pics', 'socialsteeze', 'picture', 'pictures', 'snapshot', 'art', 'beautiful', 'instagood', 'picoftheday', 'photooftheday', 'color', 'all_shots', 'exposure', 'composition', 'focus', 'capture', 'moment', 'hdr', 'hdrspotters', 'hdrstyles_gf', 'hdri', 'hdroftheday', 'hdriphonegraphy', 'hdr_lovers', 'awesome_hdr']
			},

			search : function(str, clbk){

				str = str.toLowerCase().replace(/[^a-z0-9_]/g, '');

				var s = _.filter(this.storage.all, function(t){

					if(t.indexOf(str) > -1) return true; 

				})

				s = _.uniq(s)

				if (clbk)
					clbk(lastEls(s, 7))

			}
		},

		search : {
			storage : {},

			get : function(value, type, clbk){

				var s = this.storage;

				type || (type = 'fs')
				
				self.app.ajax.rpc({
					method : 'search',
					parameters : [encodeURIComponent(value), type],
					success : function(d){

						s[value] = d

						if (clbk)
							clbk(s[value])
					},
					fail : function(){
						if (clbk){
					    	clbk({})
					    }
					}
				})

			}
		},

		comments : {
			storage : {},

			sendclbks : {
			},

			find : function(txid, id, pid){
				var s = self.sdk.comments.storage;

				var comments = deep(s, txid + '.' + (pid || '0')) || [];

				var comment = _.find(comments, function(c){
					return c.id == id
				})

				return comment
			},

			address : function(txid, id, pid){

				var comment = self.sdk.comments.find(txid, id, pid);

				if(comment) return comment.address

				return '' 
			},

			users : function(comments, clbk){
				var addresses = _.map(comments, function(r){
					return r.address
				})

				self.sdk.users.get(addresses, function(){
					if (clbk)
						clbk()
				}, true)
			},

			info : function(ids, clbk){
				var s = self.sdk.comments.storage;
				var i = self.sdk.comments.ini;

				self.app.ajax.rpc({
					method : 'getcomments',
					parameters : ['', '', ids],
					success : function(d){

						var m = i(d);

						if (clbk)
							clbk(null, m)
						
					},
					fail : function(d){
						if (clbk){
					    	clbk('network', d)
					    }
					}
				})
			},

			checkSign : function(comment, signature, pubkey){

				var verify = false

				try {
					var keyPair = bitcoin.ECPair.fromPublicKey(Buffer.from(pubkey, 'hex'))

					var str = comment.serialize();

					var hash = Buffer.from(bitcoin.crypto.hash256(str), 'utf8')

					verify = keyPair.verify(hash, Buffer.from(signature, 'hex'));

					if(!verify)
					{
						//console.log(comment)
						//console.log(str, signature, pubkey)
					}
				}

				catch (e){

				}

				return verify

			},

			ini : function(d){

				var c = _.map(d || [], function(data){
					var comment = new pComment();

					comment.setTime(data.time, data.timeupd)

					comment.txid = data.postid
					comment.children = data.children
					comment.address = data.address;
					comment.id = data.id

					comment.parentid = data.parentid
					comment.answerid = data.answerid

					var msg = {};

					try{

						msg = JSON.parse(data.msg)

					}
					catch (e){
						msg = {
							m : msg
						}
					}

					comment._import(msg)


					comment.verify = self.sdk.comments.checkSign(comment, data.signature, data.pubkey)

					return comment
				})

				c = _.filter(c, function(comment){
					if(comment.verify) return true
				})

				return c
			},

			get : function(txid, pid, clbk, ccha){

				var s = self.sdk.comments.storage;
				var i = self.sdk.comments.ini;

				s[txid] || (s[txid] = {})


				/*if(!ccha && ((!pid && s[txid]['0']) || s[txid][pid])){

					if (clbk)
						clbk(s[txid][pid])

					return
				}*/


				self.app.ajax.rpc({
					method : 'getcomments',
					parameters : [txid, pid || ''],
					success : function(d){

						var c = i(d)

						s[txid][pid || '0'] = c

						self.sdk.comments.users(c, function(){

							if (clbk)
								clbk(c)

						})

						
						
					},
					fail : function(d){
						if (clbk){
					    	clbk('network', d)
					    }
					}
				})
			},

			send : function(txid, comment, pid, aid, clbk, editid, fid){

				var s = self.sdk.comments.storage;

				var keyPair = self.app.user.keys();

				//comment.message.v = 'tst'
				//
				

				
				var signature = keyPair.sign(Buffer.from(bitcoin.crypto.hash256(comment.serialize()), 'utf8'));	

				var id = editid || makeid();

				var parameters = [
					id,
					txid, 
					self.app.platform.sdk.address.pnet().address, 
					keyPair.publicKey.toString('hex'), 
					signature.toString('hex'), 
					JSON.stringify(comment.export()), 
					pid || '', 
					aid || ''
				];

				var verify = keyPair.verify(
					bitcoin.crypto.hash256(comment.serialize()), 
					Buffer.from(signature.toString('hex'), 'hex')
				);


				self.app.ajax.rpc({
					method : 'sendcomment',
					parameters : parameters,
					success : function(d){

						var temptime = self.currentTime()

						var alias = comment.alias(id, temptime, temptime, 0, self.app.platform.sdk.address.pnet().address);

						var share = deep(self.app.platform, 'sdk.node.shares.storage.trx.' + txid);

						if (share) share.comments++

						alias.parentid = pid || ''
						alias.answerid = aid || ''

						s[txid] || (s[txid] = {})

						s[txid][pid || '0'] || (s[txid][pid || '0'] = [])
						s[txid][pid || '0'].push(alias)

						alias.verify = true

						if (clbk)
							clbk(null, alias)

						_.each(self.sdk.comments.sendclbks, function(c){
							c(null, alias, txid, pid, aid, editid, fid)
						})
						
					},
					fail : function(d){
						if (clbk){
					    	clbk('network', d)
					    }

					    _.each(self.sdk.comments.sendclbks, function(c){
							c('network')
						})
					}
				})
			}
		},
		
		node : {
			storage : {
				balance : {

				}
			},
			loading : {

			},
			updating : null, 

			update : function(){
				var a = ['get.lastBlockHeader']

				var update = function(){
					self.sdk.node.loading.update = true;

					lazyEach({
						array : a,
						action : function(p){
							var a = deep(self.sdk.node, p.item)

							if(!a){
								p.success()
							}
							else
							{
								a(p.success)
							}
							
						},

						all : {
							success : function(){
								self.sdk.node.loading.update = false;
							}
						}
					})
				}

				update();

				this.updating = retry(function(){

					return !self.sdk.node.loading.update

				}, function(){

					update();

				}, 40000, true)
			},

			get : {

				time : function(clbk){

					self.app.ajax.rpc({
						method : 'getBlockchainInfo',
						parameters : [],
						success : function(d){

							var t = deep(d, 'time') || 0
							self.currentBlock = deep(d, 'blocks') || 0
							self.timeDifference = 0;

							if (t){
								self.timeDifference = t - Math.floor((new Date().getTime()) / 1000)
							}

							if (clbk)
								clbk()
						},
						fail : function(){
							if (clbk){
						    	clbk()
						    }
						}
					})

					
				},

				address : function(){

					if(typeof _Test != 'undefined' && _Test){
						return self.nodes_test[0]
					}

					return self.nodes[1]
				},
				callNode : function(action, clbk, cashe){

					if(cashe && self.sdk.node.loading[cashe]){
						retry(function(){

							return !self.sdk.node.loading[cashe]

						}, function(){

							if (clbk)
								clbk(self.sdk.node.loading[cashe])

						})
					}
					else
					{
						if(cashe)
							self.sdk.node.loading[cashe] = true;

						self.app.ajax.rpc({
							method : action,
							success : function(d){

								if(cashe){
									self.sdk.node.storage[cashe] = d;
									self.sdk.node.loading[cashe] = false;
								}
								

								if (clbk)
									clbk(d)
							},
							fail : function(){
								if (clbk)
									clbk(null)
							}
						})
					}

				},
				
				blockNumber : function(clbk){
					this.callNode('getbestblockhash', function(num){

						self.currnetBlock = num;

					}, 'blocknumber')
				},

				balance : function(address, clbk){

					var s = self.sdk.node.storage.balance;

					self.app.ajax.rpc({
						method : 'getBalance',
						parameters : ["*", 6],
						success : function(d){

							s[address] = d.result;
							
							if (clbk)
								clbk(s[email])
						},
						fail : function(){
							if (clbk){
						    	clbk(s[email])
						    }
						}
					})
				}
			},

			account : {
				import : function(address, clbk){
					self.app.ajax.rpc({
						method : 'importAddress',
						parameters : [address, address, 1],
						success : function(d){
						
							if (clbk)
								clbk()
						},
						fail : function(){
							if (clbk){
						    	clbk()
						    }
						}
					})
				},

				get : function(address, clbk){
					self.app.ajax.rpc({
						method : 'getAccount',
						parameters : [address, 1],
						success : function(d){
							if (clbk)
								clbk(d.result)
						},
						fail : function(){
							if (clbk){
						    	clbk()
						    }
						}
					})
				},

				getset : function(email, address, clbk){
					self.sdk.node.account.get(address, function(r){
						if(r){
							if (clbk){
						    	clbk()
						    }
						}
						else
						{
							self.sdk.node.account.import(email, address, clbk)
						}
					})
				}
			},

			shares : {
				storage : {

				},
				clbks : {
					added : {

					}
				},

				getWithTemp : function(id){

					var share = deep(self.app.platform, 'sdk.node.shares.storage.trx.' + id)

					if(!share){
						var temp = _.find(self.sdk.node.transactions.temp.share, function(s){
							return s.txid == id
						})


						share = new pShare();
						share._import(temp);
						share.temp = true;
						share.address = self.app.platform.sdk.address.pnet().address
					}

					return share
				},

				users : function(shares, clbk){
					var users = [];

					_.each(shares || [], function(s){
						users.push(s.address) 

						var cuser = deep(s, 'lastComment.address')

						if (cuser)
							users.push(cuser) 
					})

					self.sdk.users.get(users, clbk, true)
				},
				add : function(share){

				////todo

					this.storage[share.txid] = share;

					_.each(this.clbks.added, function(a){
						a(share)
					})
				},

				tempLikes : function(shares){
					_.each(self.sdk.node.transactions.temp.upvoteShare, function(tempShare){

						var txid = tempShare.txid;

						_.find(shares, function(share){

							if(share.txid == txid){
								share.upvote(tempShare.value)

								return true
							}

							
						})

					})
				},

				txids : function(p, clbk, refresh){
					this.getbyid(p.txids, clbk, refresh)
				},

				getbyid : function(txids, clbk, refresh){

					var storage = this.storage;
						storage.trx || (storage.trx = {})

					var loaded = [];

					if(!_.isArray(txids)) txids = [txids];

					if(!refresh){
						txids = _.filter(txids, function(id){

							if(!storage.trx[id]) {
								return true;
							}
							else
							{
								loaded.push(storage.trx[id])
							}
						})
					}

					if(txids.length){

						var parameters = [txids]

						var temp = self.sdk.node.transactions.temp;

						var a = self.sdk.address.pnet()

						if (a){
							parameters.push(a.address)
						}

						self.app.user.isState(function(state){
							self.app.ajax.rpc({
								method : 'getrawtransactionwithmessagebyid',
								parameters : parameters || [],
								success : function(d){

									if(d && !_.isArray(d)) d = [d];

									d = _.filter(d || [], function(s){
										if(s.address) return true
									})

									var shares = _.map(d || [], function(share){

										var s = new pShare();

											s._import(share);

											s.txid = share.txid;

											s.time = new Date();

											s.address = share.address

											s.time.setTime(share.time * 1000);

											s.score = share.scoreSum;
											s.scnt = share.scoreCnt;

											storage.trx[s.txid] = s;

											if(state && temp['share'] && temp['share'][s.txid]) delete temp['share'][s.txid]


										return s

									})

									loaded = loaded.concat(shares)

									self.sdk.node.shares.tempLikes(loaded)

									if (clbk)
										clbk(loaded, null, {
											count : txids.length
										})
								},
								fail : function(){
									if (clbk){
								    	clbk(null, 'network', {})
								    }
								}
							})
						})

					}
					else
					{
						if (clbk)
							clbk(loaded, true)
					}

					
				},	

				get : function(parameters, clbk, method){

					method || (method = 'getrawtransactionwithmessage')

					var storage = this.storage;

					var temp = self.sdk.node.transactions.temp;

						storage.trx || (storage.trx = {})

						

					self.app.user.isState(function(state){
						self.app.ajax.rpc({
							method : method,
							parameters : parameters || [],
							success : function(d){

								d = _.filter(d || [], function(s){
									if(s.address) return true
								})

								var shares = _.map(d || [], function(share){

									var s = new pShare();

										s._import(share);

										s.txid = share.txid;

										s.time = new Date();

										s.address = share.address

										s.time.setTime(share.time * 1000);

										s.score = share.scoreSum;
										s.scnt = share.scoreCnt;

										if(state && temp['share'] && temp['share'][s.txid]) delete temp['share'][s.txid]


									storage.trx[s.txid] = s;

									return s

								})

								self.sdk.node.shares.tempLikes(shares)

								if (clbk)
									clbk(shares)
							},
							fail : function(){
								if (clbk){
							    	clbk([], 'network')
							    }
							}
						})
					})
				},

				recomended : function(p, clbk){

					self.app.user.isState(function(state){

						if(state){
							if(!p) p = {};

								p.count || (p.count = '10')

								p.address = self.sdk.address.pnet().address;

							var key = (p.address || "") + "_recomended"

							var storage = self.sdk.node.shares.storage;
							var s = self.sdk.node.shares;

							if (storage[key]){
								if (clbk)
									clbk(storage[key])
							}
							else
							{
								s.get([p.address, p.count], function(shr){

									storage[key] = shr || [];

									if (clbk)
										clbk(storage[key])


								}, 'getrecommendedposts')
							}

						}
						else{
							if (clbk)
								clbk([])
						}

						

					})
				},

				recommended : function(p, clbk){

				
					if(!p) p = {};

					self.app.user.isState(function(state){


					
							p.count || (p.count = '30')

							var storage = self.sdk.node.shares.storage
							var key = 'recommended'

							if (storage[key]){

								if (clbk)
									clbk(storage[key], null, p)

							}
							else
							{
								var parameters = [p.count];

								self.sdk.node.shares.get(parameters, function(shares, error){

									if(shares){

										storage[key] = shares;

										if (clbk)
											clbk(storage[key], null, p)
									}

									else{
										if (clbk)
											clbk(shares, error, p)
									}

								}, 'gethotposts')
							}

					})
				},

				common : function(p, clbk, cache){

					self.app.user.isState(function(state){

						if(!p) p = {};

							p.count || (p.count = 10)

						if(state){
							p.address = self.sdk.address.pnet().address;
						}

						var key = (p.address || "") + "_" + (p.author || "") + "_" + (p.begin || "")

						var temp = self.sdk.node.transactions.temp;

						var storage = self.sdk.node.shares.storage

							storage[key] || (storage[key] = [])

						var s = self.sdk.node.shares;

						if (cache == 'cache' && storage[key]){

							var tfinded = null;
							var added = 0;

							if(!p.txid) tfinded = true;

							var shares = _.filter(storage[key], function(s, i){
								if(tfinded && added < p.count){

									added++;

									return true;
								}

								if(s.txid == p.txid) {
									tfinded = true;
								}
							})

							if (clbk)
								clbk(storage[key])

						}
						else
						{

							if(cache == 'clear') storage[key] = [];

							if(!p.txid){
								if(storage[key].length){

									if(p.count > 0){
										var st = storage[key][storage[key].length - 1]

										p.txid = st.txid
									}
									else
									{
										var st = storage[key][0]

										p.txid = st.txid
									}

								}
							}

							if(!p.txid) p.txid = p.begin || ''

							var parameters = [p.address, p.author || "", p.txid || "", p.count];

							s.get(parameters, function(shares, error){

								if(shares){
									if(state){


										if(!p.author || p.author == p.address){
											_.each(temp.share, function(ps){

												var s = new pShare();
													s._import(ps);
													s.temp = true;
													s.address = ps.address

												shares.unshift(s)
											})
										}
									}

									_.each(shares || [], function(s){

										if(p.count > 0){
											storage[key].push(s)
										}
										else
										{
											storage[key].unshift(s)
										}

									})
									
									self.sdk.node.transactions.saveTemp()

									if (clbk)
										clbk(shares, null, p)
								}

								else{
									if (clbk)
										clbk(shares, error, p)
								}

							})
							
						
						}
					})
				}
			},

			transactions : {

				unspent : null,

				storage : {},

				loading : {},

				unspentLoading : {},

				temp : {},

				clbks : {

				},

				tempOptions : {
					userInfo : {
						count : 'one'
					}
				},

				addressFromScryptSig : function(asm){

					if(!asm) return ''

					var pub = asm.split(" ")[1];

					if(!pub) return ''

					var keyPair = bitcoin.ECPair.fromPublicKey(Buffer.from(pub, 'hex'))

					var a = self.sdk.address.pnetsimple(keyPair.publicKey).address

					return a
				},

				toUT : function(tx, address){

					var vout = _.find(tx.vout, function(v){
						return _.find(v.scriptPubKey.addresses, function(a){
							return a == address && (typeof n == 'undefined' || n == vout.n)
						})
					})

					var coinbase = deep(tx, 'vin.0.coinbase') || (deep(tx, 'vout.0.scriptPubKey.type') == 'nonstandard') || false


					var t = {
						txid : tx.txid,
						vout : vout.n,
						address : address,
						confirmations : tx.confirmations,
						coinbase : coinbase || tx.coinstake,
						amount : vout.value,
						scriptPubKey : vout.scriptPubKey.hex,
						pockettx : tx.pockettx
					}

					return t
					
				},

				toUTs : function(tx, address){

					var outs = [];

					_.each(tx.vout, function(vout){
						var a = _.find(v.scriptPubKey.addresses, function(a){
							return a == address && (typeof n != 'undefined' && n == vout.n)
						})

						if (a){
							var coinbase = deep(tx, 'vin.0.coinbase') || (deep(tx, 'vout.0.scriptPubKey.type') == 'nonstandard') || false

							var t = {
								txid : tx.txid,
								vout : vout.n,
								address : address,
								confirmations : tx.confirmations,
								coinbase : coinbase || tx.coinstake,
								amount : vout.value,
								scriptPubKey : vout.scriptPubKey.hex,
								pockettx : tx.pockettx
							}

							outs.push(t)

						}
					})

					

					return outs
					
				},

				waitSpend : function(tx){


					if(tx.confirmations < 10 && tx.pockettx){

						return 10 - tx.confirmations

					}

					if(tx.confirmations == 0 && !tx.coinbase && !tx.coinstake){

						return 1

					}


					if(tx.confirmations < 100 && (tx.coinbase || tx.coinstake)){

						return 100 - tx.confirmations

					}

					return 0
				},


				releaseCS : function(inputs){
					_.each(inputs, function(t){
		 				delete t.cantspend
		 			})
				},


				canSpend : function(tx){
					if (tx.cantspend) return false;

					var wait = self.sdk.node.transactions.waitSpend(tx)

					if(!wait) return true
				},

				sign : function(tx, clbk){
					var hex = tx.toHex();

				   	self.app.ajax.rpc({
						method : 'signrawtransactionwithkey',
						parameters : [hex, ['5x4PRe8jsgQNRykfmvqBbTNzBJZw4P2r5gD4zn1VksE8HRCz1sbE']],
						success : function(d){

							
							if (clbk)
								clbk(d)
						},
						fail : function(){

							if (clbk){
						    	clbk(null, 'network')
						    }

						}
					})
				   },

				send : function(tx, clbk){
					var hex = tx.toHex();
						   
				   	self.app.ajax.rpc({
						method : 'sendrawtransaction',
						parameters : [hex],
						success : function(d){

							
							if (clbk)
								clbk(d)
						},
						fail : function(d){

							if (clbk){
						    	clbk(null, 'network')
						    }

						}
					})
				},

				saveTemp : function(clbk){
					var a = self.sdk.address.pnet();

					if (a){
						self.app.settings.set(self.sdk.address.pnet().address, 'temp', JSON.stringify(self.sdk.node.transactions.temp))
					}

					if (clbk)
						clbk()
					
				},

				loadTemp : function(clbk){

					var a = self.sdk.address.pnet();

					if (a){
						self.sdk.node.transactions.temp = JSON.parse(self.app.settings.get(self.sdk.address.pnet().address, 'temp') || "{}")
					}
					else
					{
						self.sdk.node.transactions.temp = {};
					}

					if (clbk)
						clbk()

					
				},

				findTemp : function(txid){
					var t = this.temp;

					var finded = null;

					_.each(t, function(ts){

						if(ts[txid]){

							finded = ts[txid]
						}

							
					})


					return finded
				},

				clearTemp : function(txid){
					var t = this.temp;

					var finded = null;

					_.each(t, function(ts){

						if(ts[txid]){

							finded = ts[txid]

							delete ts[txid]
						}

							
					})


					return finded
				},

				checkTemps : function(clbk){


					var c = this.checkTemp
					var t = this.temp;

					var temps = [];

					var deleted = false;

					_.each(t, function(ts){

						_.each(ts, function(alias){
							temps.push(alias)
						})
					})


					lazyEach({
						array : temps,
						action : function(p){
							c(p.item, function(result){

								if(result){
									_.each(t, function(ts){

										if(ts[p.item.txid]){

											deleted = true

											delete ts[p.item.txid]
										}

											
									})
								}

								self.sdk.node.transactions.saveTemp()

								p.success()
							})
						},

						all : {
							success : function(){

								if(deleted){

									_.each(self.sdk.node.transactions.clbks, function(c){
										c();
									})

								}

								if(clbk)
									clbk()
							}
						}
					})

				},
				checkTemp : function(alias, clbk){
					if (alias && alias.txid){

						self.sdk.node.transactions.get.tx(alias.txid, function(d, _error){


							if (clbk){

								clbk((deep(d, 'data.code') == -5) || (deep(d, 'confirmations') > 0))
							
							}
						})


					}
					else
					{
						if (clbk){
					    	clbk(null)
					    }
					}
				},

				tempInputs : function(){
					var t = this.temp;

					var inputs = [];

					_.each(t, function(ts){

						_.each(ts, function(alias){

							if(alias.inputs){

								_.each(alias.inputs, function(i){
									inputs.push(i)
								})

							}
						})
					})




					return inputs

				},

				tempBalance : function(){
					var inputs = this.tempInputs()


					return _.reduce(inputs, function(m, i){

						return m + i.amount

					}, 0)
				},

				haveTemp : function(){
					var t = this.temp;

					var temps = 0;

					_.each(t, function(ts){

						_.each(ts, function(alias){
							temps++
						})
					})

					return temps
				},

				clearUnspents : function(txids){

					var cleared = false;
					var s = self.sdk.node.transactions;
					var amount = 0;
					var pnet = self.sdk.address.pnet();

					_.each(txids, function(id){				


						_.each(s.unspent, function(unspents, address){



							var r = removeEqual(unspents, {
								txid : id
							}) 

							/*_.find(byuser, function(unspents){

								return removeEqual(unspents, {
									txid : id
								})
							})*/

							if(r){ 
								cleared = true;

								if (pnet && address == pnet.address){
									amount = amount + Number(r.amount)
								}
								
							}

						})			

						
					
					})

					if(cleared){
						_.each(s.clbks, function(c){
							c(-amount);
						})
					}
				},

				get : {

					lenta : {
						common : function(){

						}
					},

					balanceAr : function(clbk, addresses, update, canSpend){
						this.unspents(function(us){

							var total = 0;

							var allunspents = [];

							_.each(us, function(unspent){

								if(canSpend){
									unspent = _.filter(unspent, self.sdk.node.transactions.canSpend)

								}

								var amount = _.reduce(unspent, function(m, u){
									return m + Number(u.amount)
								}, 0)

								allunspents = allunspents.concat(unspent)

								total += amount
							})

							if (clbk)
								clbk(total, allunspents)

						}, addresses, update)
					},



					allBalance : function(clbk, update){
						var addresses = [self.sdk.address.pnet().address].concat(self.sdk.addresses.storage.addresses || [])
					
						this.balanceAr(clbk, addresses, update)
					},

					canSpend : function(addresses, clbk){

						addresses || (addresses = [self.sdk.address.pnet().address].concat(self.sdk.addresses.storage.addresses || []))

						if(!_.isArray(addresses)) addresses = [addresses];

						this.balance(function(total, us){

							var usCanSpend = _.filter(us, self.sdk.node.transactions.canSpend);

							var amount = _.reduce(usCanSpend, function(m, u){
								return m + Number(u.amount)
							}, 0)

							if (clbk){
								clbk(amount, total)
							}


						}, addresses)
					},	

					balance : function(clbk, address, update, canSpend){

						if(_.isArray(address)){
							this.balanceAr(clbk, address, update, canSpend)

						}
						else{
							this.unspent(function(unspent){

								if(canSpend){
									unspent = _.filter(unspent, self.sdk.node.transactions.canSpend)
								}

								var amount = _.reduce(unspent, function(m, u){
									return m + Number(u.amount)
								}, 0)

								if (clbk)
									clbk(amount, unspent)

							}, address, update)
						}

						
					},

					

					_unspent : function(clbk){

						var s = self.sdk.node.transactions;

						var p2pkh = self.sdk.address.pnet();
					

						self.app.ajax.rpc({
							method : 'listUnspent',
							parameters : [1, 9999999, [p2pkh.address]],
							success : function(d){							

								if (clbk)
									clbk(d || [])
							},
							fail : function(){
								if (clbk){
							    	clbk([])
							    }
							}
						})
					},

					_unspents : function(clbk, addresses, update){

						var a = {};


						lazyEach({
							array : addresses,

							action : function(p){
								var address = p.item;

								self.sdk.node.transactions.get.unspent(function(u){


									a[address] = u

									p.success()

								}, address, update)
							},

							all : {
								success : function(){


									if (clbk)
										clbk(a)
								}
							}
						})
					},

					unspents : function(clbk, addresses, update){


						var loadingAddressesClbk = function(){
							addresses = _.filter(addresses, function(address){
								if(s.unspent[address] && !update){

									a[address] = s.unspent[address]

									return false;
								}
								else
								{
									s.unspentLoading[address] = true;

									return true;
								}
							})

							if(!addresses.length){
								if (clbk)
									clbk(a)
							}

							else
							{

								self.app.ajax.rpc({
									method : 'txunspent',
									parameters : [addresses, 1, 9999999],
									success : function(d){

										_.each(addresses, function(address){
											s.unspentLoading[address] = false;
											s.unspent[address] = []

											a[address] = [];
										})

										_.each(d || [], function(tr){

											var address = tr.address

											s.unspent[address].push(tr)
											a[address].push(tr)
										})

										_.each(self.sdk.node.transactions.clbks, function(c){
											c()
										})

										if (clbk)
											clbk(a)
									},
									fail : function(){

										_.each(addresses, function(address){

											s.unspent[address] = [];
											s.unspentLoading[address] = false;

											a[address] = [];
										})
										
										if (clbk){
									    	clbk(a)
									    }
									}
								})
							}
						}

						var s = self.sdk.node.transactions;

						if(!s.unspent) 
							s.unspent = {};	

						var a = {};

						var loadingAddresses = _.filter(addresses, function(address){
							if(s.unspentLoading[address])

								return true;
						})

						if(loadingAddresses.length){

							retry(function(){

								var _loadingAddresses = _.filter(addresses, function(address){
									if(s.unspentLoading[address])

										return true;
								})

								if(!_loadingAddresses.length) return true;

							}, function(){

								loadingAddressesClbk()

							}, 10)

						}
						else
						{
							loadingAddressesClbk()
						}

						

					},
					
					unspent : function(clbk, address, update){

						var s = self.sdk.node.transactions;

						if(!s.unspent) 
							s.unspent = {};						

						address || (address = self.sdk.address.pnet().address);

						if (s.unspentLoading[address]){

							retry(function(){

								if(!s.unspentLoading[address]) return true;

							}, function(){

								if (clbk){
							    	clbk(s.unspent[address])
							    }

							}, 10)

							return
						}
					
						if (s.unspent[address] && !update){
							if (clbk)
								clbk(s.unspent[address])
						}
						else
						{
							s.unspentLoading[address] = true;

							self.app.ajax.rpc({
								method : 'txunspent',
								parameters : [[address], 1, 9999999],
								success : function(d){

									s.unspent[address] = d || [];

									s.unspentLoading[address] = false;

									if (clbk)
										clbk(s.unspent[address])
								},
								fail : function(){


									s.unspent[address] = [];

									s.unspentLoading[address] = false;
									
									if (clbk){
								    	clbk(s.unspent[address])
								    }
								}
							})
						}

						
					},

					tx : function(id, clbk){

						if(self.sdk.node.transactions.loading[id]){

							retry(function(){

								if(!self.sdk.node.transactions.loading[id]) return true;

							}, function(){

								if (clbk){
							    	clbk(self.sdk.node.transactions.storage[id])
							    }

							}, 40)


							return
						}	

						if(self.sdk.node.transactions.storage[id]){
							if (clbk)
								clbk(self.sdk.node.transactions.storage[id])
						}

						else
						{
							self.sdk.node.transactions.loading[id] = true;

							self.app.ajax.rpc({
								method : 'getrawtransaction',
								parameters : [id, 1],
								success : function(d){

									self.sdk.node.transactions.loading[id] = false;

									self.sdk.node.transactions.storage[id] = d

									if (clbk)
										clbk(d)
								},
								fail : function(d){

									self.sdk.node.transactions.loading[id] = false;

									if (clbk){
								    	clbk(d, 'network')
								    }
								}
							})
						}


						
					}
				},

				create : {
					
					commonFromUnspent : function(obj, clbk, p){

						if(!p) p = {};

						self.sdk.node.transactions.get.unspent(function(unspent){

							unspent = _.filter(unspent, self.sdk.node.transactions.canSpend)

							if(!unspent.length){



								if(!p.update){
									p.update = true;

									self.sdk.node.transactions.create.commonFromUnspent(obj, clbk, p)

									return
								}

								if (clbk)
								{
									clbk(null, 'money')
								}

								return;
							}

							var inputs = [{

								txId : unspent[unspent.length - 1].txid,
								vout : unspent[unspent.length - 1].vout,
								amount : unspent[unspent.length - 1].amount

							}]

							self.sdk.node.transactions.create[obj.type](inputs, obj, function(a, er, data){

								if(!a){
									if((er == -26 || er == -25 || er == 16) && !p.update){
										
										p.update = true;

										self.sdk.node.transactions.create.commonFromUnspent(obj, clbk, p)

										return
									}
								}
								

								if (clbk){
									clbk(a, er, data)
								}
								

							}, p)

						}, deep(p, 'address.address'), p.update)
					},

					wallet : function(inputs, ouputs, _kp){

						var keyPair = _kp || self.app.user.keys()

						var txb = new bitcoin.TransactionBuilder();

						txb.addNTime(self.timeDifference || 0)

						var amount = 0;
						var k = 100000000;


						_.each(inputs, function(i){

							/*txb.addInput(i.txid, i.vout)
							amount = amount + Number(i.amount);

							return*/

							if(i.address.indexOf("P" == 0)){
								txb.addInput(i.txid, i.vout)
							}

							else
							{

								var index = _.indexOf(self.sdk.addresses.storage.addresses, i.address);

								if (index > -1){

									var address = self.sdk.addresses.storage.addressesobj[index];
								
									txb.addInput(i.txid, i.vout/*, null, address.output*/)
								}

								else
								{
									return
								}
								
							}

					    	amount = amount + Number(i.amount);
					    })

						_.each(ouputs, function(o){
							txb.addOutput(o.address,  Number((k * o.amount).toFixed(0)));
						})
					
						_.each(inputs, function(i, inputindex){


							if(i.address.indexOf("P") == 0){

								txb.sign(inputindex, keyPair);
							}

							else
							{

								var index = _.indexOf(self.sdk.addresses.storage.addresses, i.address);

								if (index > -1){

									var p2sh = self.sdk.addresses.storage.addressesobj[index];

									var dumped = self.sdk.address.dumpKeys(index)

									txb.sign(inputindex, dumped, p2sh.redeem.output, null, Number(i.amount * k).toFixed(0));


								}

								else
								{
									return
								}
								
							}
					    })					
						
						var tx = txb.build()
	
						return tx;

					},	

					common : function(inputs, obj, fees, clbk, p){

						if(!p) p = {};

						var temp = self.sdk.node.transactions.temp;
						var tempOptions = self.sdk.node.transactions.tempOptions;

						var error = obj.validation();



						if (error){

							if (clbk)
								clbk(null, error);

						}

						else
						{
							var keyPair = p.keys || self.app.user.keys()

						    //var p2pkh = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey});


						    var address = p.address || self.sdk.address.pnet()

						    var txb = new bitcoin.TransactionBuilder();

						   		txb.addNTime(self.timeDifference || 0)

							var amount = 0;

						    _.each(inputs, function(i){

						    	if(self.addressType == 'p2pkh' || self.addressType == 'p2sh'){
									txb.addInput(i.txId, i.vout)
								}

								if(self.addressType == 'p2wpkh'){

						    		txb.addInput(i.txId, i.vout, null, address.output)
						    	}

						    	amount = amount + Number(i.amount);
						    })		

						    amount = amount * 100000000;

							var data = Buffer.from(bitcoin.crypto.hash256(obj.serialize()), 'utf8');

							var opreturnData = [Buffer.from(obj.type, 'utf8'), data];

							if (obj.opreturn){
								opreturnData.push(Buffer.from(obj.opreturn()))
							}

			     			var embed = bitcoin.payments.embed({ data: opreturnData });

			      			txb.addOutput(embed.output, 0);		    

							if(self.addressType == 'p2pkh'){
								txb.addOutput(address.address,  Number((amount - (fees || 0)).toFixed(0)));
								txb.sign(0, keyPair);
							}

							if(self.addressType == 'p2wpkh'){
								txb.addOutput(address.address,  2e4);
								txb.sign(0, keyPair, null, null);								
							}


							if(self.addressType == 'p2sh'){
								txb.addOutput(address.address,   Number((amount - (fees || 0)).toFixed(0)));
								txb.sign(0, keyPair, address.redeem.output, null, '');								
							}	


							var tx = txb.build()

						   	var hex = tx.toHex();

						   	if(p.pseudo){
								var alias = obj.export(true);
									alias.txid = makeid();

								if (clbk)
									clbk(alias, null)
							}
							else
							{

								self.app.ajax.rpc({
									method : 'sendrawtransactionwithmessage',
									parameters : [hex, obj.export(), obj.type],
									success : function(d){

										var alias = obj.export(true);									
											alias.txid = d;
											alias.address = address.address;
											alias.type = obj.type

										var count = deep(tempOptions, obj.type + ".count") || 'many'

										
										if(!temp[obj.type] || count == 'one')
										{
											temp[obj.type] = {};
										}

										temp[obj.type][d] = alias;

										alias.inputs = inputs

										self.sdk.node.transactions.saveTemp()
										
										var ids = _.map(inputs, function(i){
											return i.txId
										})
										
										self.app.platform.sdk.node.transactions.clearUnspents(ids)

										if (obj.ustate){

											var us = self.sdk.ustate.storage;

											if (us[address.address]){
												us[address.address][obj.ustate+"_spent"]++
												us[address.address][obj.ustate+"_unspent"]--
											}

											_.each(self.sdk.ustate.clbks, function(c){
												c()
											})
												

										}
									

										if (clbk)
											clbk(alias)
											
									},
									fail : function(data){


										if (clbk){
										    clbk(null, (deep(data, 'data.code') || deep(data, 'data.message') || 'network').toString(), data)
										}

									}
								})
							}
					
						   
						}
						
					},

					share : function(inputs, share, clbk, p){

						this.common(inputs, share, TXFEE, clbk, p)

					},

					userInfo : function(inputs, userInfo, clbk, p){
						this.common(inputs, userInfo, TXFEE, clbk, p)
					},

					upvoteShare : function(inputs, upvoteShare, clbk, p){
						this.common(inputs, upvoteShare, TXFEE, clbk, p)
					},

					complainShare : function(inputs, complainShare, clbk, p){
						this.common(inputs, complainShare, TXFEE, clbk, p)
					},

					commentShare : function(inputs, commentShare, clbk, p){
						this.common(inputs, commentShare, TXFEE, clbk, p)
					},

					unsubscribe : function(inputs, unsubscribe, clbk, p){
						this.common(inputs, unsubscribe, TXFEE, clbk, p)
					},

					subscribe : function(inputs, subscribe, clbk, p){
						this.common(inputs, subscribe, TXFEE, clbk, p)
					},

					subscribePrivate : function(inputs, subscribe, clbk, p){

						var c = this.common


						self.cryptography.api.aeswc.pwd.encryption(subscribe.address.v, {}, function(encrypted){

							subscribe.encrypted.set(encrypted)

							c(inputs, subscribe, TXFEE, clbk, p)

						})
						
					}
				}

			},

			fee : {
				estimate : function(clbk){

					self.app.ajax.rpc({
						method : 'estimateSmartFee',
						parameters : [1],
						success : function(d){	

							d.feerate = 0.00001

							if (clbk)
								clbk(d)

						},
						fail : function(){
							
							if (clbk){
						    	clbk(null)
						    }

						}
					})

				}
			}

			
			
		}, 

		pool : {
			current : null,

			info : function(pack, clbk){
				self.sdk.users.get(pack.addresses, clbk)
			},

			dumpKey : function(pack, address, clbk){
				this.expand(pack, function(pa){

					var i = _.indexOf(pa.addresses, address)

					if (i == -1){
						if (clbk)
							clbk(null)
					}
					else

						if (clbk)
							clbk(pa.private[i])

					

				})
			},

			expand : function(exportedPack, clbk){

				self.app.user.isState(function(state){

					if(!state){
						if (clbk)
							clbk(null, 'state')
					}
					else
					{
						var address = self.sdk.address.pnet().address;

						var i = _.indexOf(exportedPack.addresses, address);

						if (i > -1){
							var _key = null;
							var aeskey = exportedPack.aes[i];

							var mk = self.app.user.private.value.toString('hex');

							self.cryptography.api.aeswc.decryption(aeskey, mk, {}, function(decrypted){
								_key = decrypted;

								var pack = {
									addresses : exportedPack.addresses,

									private : [],

									aes : exportedPack.aes,

									_key : _key
								}


								lazyEach({
									array : exportedPack.keys, 
									action : function(p, index){
										var privatemk = p.item;

										self.cryptography.api.aeswc.decryption(privatemk, _key, {}, function(mk){
											pack.private[index] = mk;

											p.success()
										})
									},

									sync : true,

									all : {
										success : function(){

											if (clbk)
												clbk(pack)

										}
									}
								})
							})
						}	
						else
						{
							if (clbk)
								clbk(null, 'address')
						}
					}

					

				})
			},

			export : function(pack, clbk){

				var exported = {
					addresses : pack.addresses,
					keys : [],
					aes : pack.aes
				}


				lazyEach({
					array : pack.private, 
					action : function(p, index){
						var private = p.item;

						self.cryptography.api.aeswc.encryption(private, pack._key, {}, function(encrypted){
							exported.keys[index] = encrypted;

							p.success()
						})
					},

					sync : true,

					all : {
						success : function(){

							if (clbk)
								clbk(exported)

						}
					}
				})
			},

			push : function(pack, address, mk, _key, clbk){

				pack.addresses.push(address)
				pack.private.push(mk)				

				self.cryptography.api.aeswc.encryption(_key, mk, {}, function(encrypted){

					pack.aes.push(encrypted)

					if (clbk)
						clbk(pack)

				})
			},

			remove : function(pack, address){
				var s = self.sdk.pool;
				var pool = s.get();

				var i = _.indexOf(pack.addresses, address);

				if (i > -1){

					pack.addresses.splice(i, 1)

					if (pack.private){
						pack.private.splice(i, 1)
					}

					if (pack.keys){
						pack.keys.splice(i, 1)
					}

					if (pack.aes){
						pack.aes.splice(i, 1)
					}

					delete pool.map[address]

					return true
				}

				return false
			},

			add : function(pack, mnemonic, clbk){
				var s = self.sdk.pool;
				var pool = s.get();
				

				var keyPair;

				if(bitcoin.bip39.validateMnemonic(mnemonic)){
				 	keyPair = self.app.user.keysFromMnemo(mnemonic)  
				}
				else
				{
					keyPair = bitcoin.ECPair.fromPrivateKey(Buffer.from(mnemonic, 'hex'))
				}

				var address = self.sdk.address.pnetsimple(keyPair.publicKey).address;	

				var mk = keyPair.privateKey.toString('hex');

				if (pool.map[address]){

					var id = pool.map[address];
					var _pack = pool.packs[id];

					if (_pack.addresses.length > 1){
						if (clbk)
							clbk(null, 'hasinanotherpack')

						return;
					}
					else
					{
						delete pool.map[address]
						delete pool.packs[id]
					}
					
				}
				
				this.push(pack, address, mk, pack._key, function(){

					s.currentMap();

					if (clbk)
						clbk(pack)

				})
					
			},

			new : function(clbk){

				var s = self.sdk.pool

				var pack = {
					addresses : [],

					private : [],

					aes : [],

					_key : null
				}

				var ps = [null, null]

				self.app.user.isState(function(state){

					if(!state){

						ps[1] = 'state'

					}

					else
					{
						var key = app.user.private.value;

						if (key){

							var mk = key.toString('hex');

							var address = self.sdk.address.pnet().address;	

							pack._key = self.cryptography.api.random.crypto();

							s.push(pack, address, mk, pack._key, function(pack){

								s.export(pack, function(exported){

									ps[0] = exported

									if (clbk)
										clbk(ps[0], ps[1])
								})

								
							})

						

							return
								
						}

						else
						{

							ps[1] = 'key'
						}
					}

					if (clbk)
						clbk(ps[0], ps[1])

				})
			},

			init : function(clbk){

				var s = self.sdk.pool

				self.app.user.isState(function(state){

					if(state && !_Node){
						var pool = s.get();

						var address = self.sdk.address.pnet().address;	

						var packid = pool.map[address];

						s.current = pool;

						if(!packid){
							s.new(function(exportedpack, error){
								if(!exportedpack){
									sitemessage(error);
								}
								else
								{
									var id = makeid();

									pool.map[address] = id;
									pool.packs[id] = exportedpack;

									s.save();
								}

								if (clbk)
									clbk(exportedpack, id)
							})
						}
						else
						{
							if (clbk)
								clbk(pool.packs[packid], packid)
							
						}
					}

					else
					{
						if (clbk)
							clbk()
					}

				})
			},

			get : function(){

				var s = self.sdk.pool

				var pool = s.current;

				if(!pool){
					pool = localStorage['pool'];

					if(pool) pool = JSON.parse(pool)
				}

				if(!pool){
					pool = {
						map : {},
						packs : {}
					};
				}

				return pool;
			},

			getPack : function(address){
				var s = self.sdk.pool;

				var pool = s.get();

				var id = pool.map[address]

				if (id){
					return [pool.packs[id], id]
				}
			},

			currentMap : function(){

				var c = self.sdk.pool.current;

				c.map = {};

				_.each(c.packs, function(pack, packid){
					_.each(pack.addresses, function(address){
						c.map[address] = packid
					})
				})

			},

			save : function(pool){

				var s = self.sdk.pool;

				self.app.user.isState(function(state){

					if(state && s.current){

						s.currentMap();

						localStorage['pool'] = JSON.stringify(s.current)

					}

				})
					
			}
		},

		discussions : {
			fromChatId : function(id){
				var chat = self.sdk.chats.storage[id]

				if (chat){
					var discussion = self.sdk.discussions.fromChats([chat])[id];


					return discussion
				}
				else
				{
					return null;
				}
			},
			fromChats : function(chats, author){
				var d = {};

				_.each(chats || self.sdk.chats.storage, function(chat){

					var id = chat.id;				

					var _d = {
						chat : chat
					}				

					if (chat.type == 'share'){

						var chatAuthor = id.split("_")[1];
						var shareId = id.split("_")[0];

						_d.author = chatAuthor

						if(self.sdk.node.shares.storage.trx){
							_d.share = self.sdk.node.shares.storage.trx[shareId]
						}

						if (author){

							if (chatAuthor != author) return;

						}

					}

					d[id] =_d
				})

				return d
			},

			info : function(discussions, clbk){
				var chats = _.map(discussions, function(d){
					return d.chat
				})

				self.sdk.chats.info(chats, function(){

					var dss = self.sdk.discussions.fromChats(chats);

					if (clbk)
						clbk(dss)
					
				})
			}
		},

		tempmessenger : {
			clbks : {},
			init : function(clbk){
				var address = self.sdk.address.pnet().address
				var id = bitcoin.crypto.hash256(address + self.app.options.fingerPrint).toString('hex')

				var keyPair = self.app.user.keys();

				var signature = keyPair.sign(Buffer.from(bitcoin.crypto.hash256(id), 'utf8'));	

				var user = {
					device : id,
					address : address,
					signature : signature.toString('hex'),
					publicKey : keyPair.publicKey.toString('hex'),
				}

				self.clientrtctemp = new platformRTC({
					user : user,
					platform : self
				})

				self.clientrtctemp.init(function(){
					

						/*self.clientrtctemp.clbks.message.messenger = function(p, rtc){

							_.each(self.sdk.tempmessenger.clbks || {}, function(c){
								c('message', rtc)
							})
							
						}*/


				})

				if (clbk)
					clbk()
			},

			getChat : function(chat){

				chat.rtc = self.clientrtctemp.api.getChat(chat.id, chat.users);
			}
		},


		messenger : {
			clbks : {},
			load : {
				messages : function(messages, clbk){

					if(!_.isArray(messages)) messages = [messages]

					var users = _.map(messages, function(m){
						return m.f
					})

					self.sdk.users.get(users, clbk, true)

					
				},
			},

			getChat : function(chat){
				chat.rtc = self.clientrtc.api.getChat(chat.id, chat.users);
			},

			connectToChat : function(chat, clbk){
				self.clientrtc.api.connectToChat({

					id : chat.id,
					addresses : chat.addresses

				}, function(id, chat){

					if (clbk)
						clbk(id, chat)

				})
			},
			init : function(clbk){

				var address = self.sdk.address.pnet().address
				var id = bitcoin.crypto.hash256(address + self.app.options.fingerPrint).toString('hex')

				var keyPair = self.app.user.keys();

				var signature = keyPair.sign(Buffer.from(bitcoin.crypto.hash256(id), 'utf8'));	

				var user = {
					device : id,
					address : address,
					signature : signature.toString('hex'),
					publicKey : keyPair.publicKey.toString('hex'),
				}

				self.clientrtc = new platformRTC({
					user : user,
					platform : self
				})

				var chats = self.app.platform.sdk.chats.get('messenger');

				self.clientrtc.initChats(chats)
				self.clientrtc.init(function(){
					self.clientrtc.api.login(function(){


						self.clientrtc.clbks.chat.messenger = function(p, rtc){


							if(self.sdk.chats.storage[rtc.id]) return

							p || (p = {})

							var chat = self.sdk.chats.empty(rtc.id, 'messenger');
								chat.rtc = rtc;


							if(p.addresses) chat.users = p.addresses

							self.sdk.chats.storage[rtc.id] = chat
							self.sdk.chats.info([chat], function(){

								_.each(self.sdk.messenger.clbks || {}, function(c){
									c('chat', chat)
								})

							})

							self.sdk.chats.save()

							
						}

						self.clientrtc.clbks.message.messenger = function(p, rtc){

							_.each(self.sdk.messenger.clbks || {}, function(c){
								c('message', rtc)
							})
							
						}

						self.clientrtc.api.getRelayed()

					})
				})

				if (clbk)
					clbk()
			}
		},

		chats : {
			clbks : {

			},
			storage : {

			},

			_info : {
				shares : function(chats, clbk){
					var shares = _.filter(chats, function(c){
						if(c.type == 'share') return true;
					})

					var sharesIds = _.map(shares, function(c){
						return c.id.split("_")[0]
					})

					self.sdk.node.shares.getbyid(sharesIds, function(){

						var shares = _.map(sharesIds, function(id){
							return self.sdk.node.shares.storage.trx[id] || null;
						})

							shares = _.filter(shares, function(s){
								return s
							})

						self.app.platform.sdk.node.shares.users(shares, function(){
							if (clbk)
								clbk()
						})

					})
				},

				messenger : function(chats, clbk){
					var users = [];


					_.each(chats, function(c){

						_.each(c.users, function(u){
							users.push(u)
						})

						self.app.platform.sdk.users.get(users, function(){
							if (clbk)
								clbk()
						})

					})
				}
			},

			info : function(chats, clbk){

				var s = this;

				s._info.shares(chats, function(){
					s._info.messenger(chats, function(){

						if (clbk)
							clbk()

					})
				})

			},

			empty : function(id, type){

				var ec = {
					id : id || makeid(),
					type : type || 'sys',

					time : self.currentTime()	
				}

				if(type == 'messenger'){
					ec.users = []
				}

				return ec
			},

			remove : function(id){

				_.each(self.sdk.chats.clbks, function(c){

					c(self.sdk.chats.storage[id], 'remove')

				})

				delete self.sdk.chats.storage[id]

				self.sdk.chats.save()
			},

			removeTemp : function(){
				_.each(self.sdk.chats.clbks, function(c){

					c(null, 'removeTemp')

				})
			},

			addTemp : function(id, type, count){
				
				var e = self.sdk.chats.empty(id, type)

				_.each(self.sdk.chats.clbks, function(c){

					c(e, 'addTemp', count)

				})
				
			},
			add : function(id, type){

				if (self.sdk.chats.storage[id]){

					self.sdk.chats.storage[id].time = self.currentTime()	

					self.sdk.chats.save()

					_.each(self.sdk.chats.clbks, function(c){

						c(self.sdk.chats.storage[id], 'addtwice')

					})

					return self.sdk.chats.storage[id]

				}
				else
				{
					var e = self.sdk.chats.empty(id, type)

					self.sdk.chats.storage[e.id] = e;

					_.each(self.sdk.chats.clbks, function(c){

						c(e, 'add')

					})

					self.sdk.chats.save()

					return e
				}


				
			},

			light : function(){
				var s = {};

				_.each(self.sdk.chats.storage, function(chat, id){
					s[id] = {
						id : chat.id,
						type : chat.type,
						time : chat.time,
						users : chat.users
					}
				})

				return s
			},

			
			save : function(){

				var address = self.sdk.address.pnet().address;

				localStorage[address + 'chats_4'] = JSON.stringify(self.sdk.chats.light());

			},

			load : function(clbk){

				var chats = {};

				var address = self.sdk.address.pnet().address;

				var local = localStorage[address + 'chats_4'] || "{}";

				if (local){
					try{
						chats = JSON.parse(local)
					}
					catch (e){
						console.log("ERR", e)
					}
				}

				self.sdk.chats.storage = chats;
				
				if (clbk)
					clbk()
			},

			get : function(type){
				return _.filter(self.sdk.chats.storage, function(c){

					if(type == 'share'){
						if(c.id == '6768de97ad495c0110a9e09d43825ef24f1055449a5d368225ac102804397dc1_PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd') return true
						
						//if(c.id == 'bb4a3d19b26aa09c4079efc3c93da092054c2dd2d0153cd01ef4b467eb71417f_PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM') return true
					
							return
					}

					return c.type == type
				})
			}
		}

	
	}

	self.WSn = function(platform){
		var self = this;
		var app = platform.app;

		var socket;
		var opened = false;
		var closing = false;
		var lost = 0;
		var onlinetnterval = null;
		var wait = null;

		self.connected = {};
		self.online = false;
		self.onlineCheck = false;
		self.fastMessages = [];
		
		self.loadingMissed = false;


		self.tempates = {

			_share : function(share){
				var m = share.caption || share.message;

				var nm = filterXSS(emojione.toImage(trimHtml(m, 20)));

				return nm
			},

			share : function(share, extra){
				var h = '';

				var m = share.caption || share.message;

				var nm = filterXSS(emojione.toImage(trimHtml(m, 20)));

				nm = share.renders.xssmessage(nm)
			

				var image = share.images[0];
				var video = null;

				var vstyle = false;

				if (share.url){
					video = videoImage(share.url)
					vstyle = true;
				}

				h = '<div class="sharepreview">\
				<div class="shareprwrapper table">'

				if(video || image){
			
					h += '<div class="tcell forimage">'
						h += '<div class="img" image="'+(video || image)+'">'

						if(vstyle){
							h += '<div class="vstyle">'
							h += '<i class="fas fa-play"></i>'
							h += '</div>'
						}

						h += '</div>'
					h += '</div>'

				}

				h += '<div class="tcell fortext">'
				h += '<span>'+nm+'</span>'
				h += '</div>'

				if(extra){
					h += '<div class="tcell extra">'
					h += extra
					h += '</div>'
				}
				

				h+='</div>\
					</div>'


				return h;
			},

			comment : function(comment, share){


				var h = '<div class="commentmessage">'

						h += '<div class="commentmessagewrapper table">'

							h+='<div class="tcell fortext">'

								h += '<div class="commenttext"><span>'
								h += comment.renders.preview()
								h +='</span></div>'

								if(share){
									h += '<div class="commentshare">'
										h += share
									h +='</div>'
								}

							h +='</div>'

							h += '<div class="tcell foranswer">'
							h += 	'<button class="reply ghost">Reply</button>'
							h += '</div>'

						h +='</div>'

					h += '</div>'

				return h;
			},

			star : function(count){
				return '<div class="messagestar" count="'+count+'">' + count + ' <i class="fas fa-star"></i></div>'
			},

			_user : function(author){
				return filterXSS(deep(author, 'name') || author.address)
			},

			user : function(author, html, gotoprofile, caption){

				var h = '';

				var src = deep(author, 'image')

				var link = '<a href="author?address='+author.address+'">'
				var clink = "</a>"

				

			h+='<div class="cwrapper table">\
					<div class="cell cellforimage">\
						<div class="icon">'

						if(gotoprofile) h += link

							h+= '<div class="usericon" image="'+(src || '')+'">'

							if(!src) {
								h+='<svg width="30" height="30" data-jdenticon-value="'+author.address+'"></svg>'
							}

							h+='</div>'

						if(gotoprofile) h += clink

						h+= '</div>\
					</div>\
					<div class="ccell">\
						<div class="infomain">\
							<div class="caption">'
								if(gotoprofile) h += link

									if(caption){
										h += caption + ". "
									}

									h+= '<b class="adr">'+filterXSS(deep(author, 'name') || author.address)+'</b>'
								if(gotoprofile) h += clink

							h+= '</div>\
							<div class="tips">' + (html) + '\
							</div>\
						</div>\
					</div>\
				</div>'

				

				return h;
			},

			subscribe : function(author, html){

				var me = deep(app, 'platform.sdk.users.storage.' + platform.sdk.address.pnet().address)

				var d = ''

				if (me && me.relation(author.address, 'subscribes')){
					d = 'disabled'
				}

				var h = '<div class="subscribeWrapper table">'
						h += '<div class="scell forhtml">'
						h += html
						h += '</div>'
					
						h += '<div class="scell forsubscribe">'
						h += 	'<button class="subscribe ghost + '+d+'">'


						h += '<i class="far fa-check-circle"></i> '
						h += 'Follow</button>'
						h += '</div>'
					
					h+= '</div>'

				return h
			},

			
		}

		self.messages = {

			"transaction" : {
				loadMore : function(data, clbk, wa){

					var _dataclbk = function(tx, err){
						var temp = platform.sdk.node.transactions.clearTemp(data.txid);

						if (temp && !wa){

							data.temp = temp;
							data.temp.temp = false;

							if (temp.type == 'share'){

								var share = new pShare();
									share._import(data.temp);
									share.address = platform.sdk.address.pnet().address

									share.scnt = '0'
									share.score = "0"
									share.myVal = 0

								platform.sdk.node.shares.storage.trx[data.txid] = share

							}
						}

						if(tx && !err){
							data.tx = platform.sdk.node.transactions.toUT(tx, data.addr, data.nout)
							//data.tx = data.pockettx

							data.btx = tx;

							var a = data.addr;

							platform.sdk.node.transactions.unspent || (platform.sdk.node.transactions.unspent = {})
							
							var s = platform.sdk.node.transactions.unspent;
					
							s[a] || (s[a] = []);

							if (!wa){
								removeEqual(s[a], {
									txid : data.tx.txid,
									vout : data.tx.nout
								})

								s[a].push(data.tx)
							}
									

							data.address = platform.sdk.node.transactions.addressFromScryptSig(deep(data.btx, 'vin.0.scriptSig.asm'))

							platform.sdk.users.getone(data.address || '', function(){

								console.log('platform.sdk.usersl.storage[data.address]', platform.sdk.usersl.storage[data.address])

								if (data.address){
									data.user = platform.sdk.usersl.storage[data.address] || {
										address : data.address
									}
								}								

								if (clbk)
									clbk(data)

							}, true)

							
						}
					}

					if(data.txinfo){
						_dataclbk(data.txinfo)
					}
					else
					{
						platform.sdk.node.transactions.get.tx(data.txid, _dataclbk)
					}

					
				},

				refs : {

				},
				
				fastMessage : function(data){	
			
					var html = '';

					if (data.tx){
						if(data.tx.coinbase){

							if(platform.sdk.usersettings.meta.win.value)
							{
								html += self.tempates.user(platform.sdk.users.storage[platform.sdk.address.pnet().address], '<div class="text">'+platform.app.localization.e('coinbaseSuccess', platform.mp.coin(data.tx.amount)) + '</div>')
							}

						}

						else{

							if(data.address !=  platform.sdk.address.pnet().address){

								if(platform.sdk.usersettings.meta.transactions.value)

									html += self.tempates.user(data.user, '<div class="text">'+platform.app.localization.e('userSent', platform.mp.coin(data.tx.amount)) + '</div>')
							
							}

						}
					}

					return html;
					
				},
				audio : {
					unfocus : 'water_droplet',

					if : function(data){

						if (data.temp){
							return false;
						}

						if (data.tx){
							if(data.tx.coinbase){
								if(!platform.sdk.usersettings.meta.win.value){

									return false;
								}
							}
							else{
								if(data.address != platform.sdk.address.pnet().address){
									if(!platform.sdk.usersettings.meta.transactions.value){
										return false;
									}
								}
								else
								{
									return false;
								}
							}
						}
						else
						{
							return false;
						}

						return true;
					}
				},
				clbks : {
					transactions : function(data){

						_.each(platform.sdk.node.transactions.clbks, function(c){
							c(data.tx.amount)
						})

					}
				}
			},

			'newblocks' : {
				loadMore : function(data, clbk){

					var s = platform.sdk.node.transactions;

					var dif = platform.currentBlock - data.block

					platform.currentBlock = data.block;

					//self.reconnected = platform.currentBlock;

					platform.sdk.notifications.wsBlock(data.height)
					
					_.each(s.unspent, function(unspents, address){
						_.each(unspents, function(txu){

							txu.confirmations = txu.confirmations + dif

						})
					})

					platform.sdk.user.subscribeRef()

					clbk()
				},
				
				refs : {

				},
				fastMessage : function(data){					

					var html = '';

					return html;
					
				},
				
				clbks : {
					transactions : function(){
						_.each(platform.sdk.node.transactions.clbks, function(c){
							c()
						})
					}
				}
			},

			"new block" : {

				loadMore : function(data, clbk){

					if(data.height <= platform.currentBlock) return

					var s = platform.sdk.node.transactions;

					platform.currentBlock = data.height;

					//self.reconnected = platform.currentBlock;

					platform.sdk.notifications.wsBlock(data.height)
					
					_.each(s.unspent, function(unspents, address){
						_.each(unspents, function(txu){

							txu.confirmations++

						})
					})

					platform.sdk.user.subscribeRef()

					clbk()
				},
				
				refs : {

				},
				fastMessage : function(data){					

					var html = '';

					return html;
					
				},
				
				clbks : {
					transactions : function(){
						_.each(platform.sdk.node.transactions.clbks, function(c){
							c()
						})
					}
				}
			},

			comment : {

				fastMessageEvents : function(data, message){

					message.el.find('.commenttext').on('click', function(){

						platform.sdk.node.shares.getbyid(data.posttxid, function(s, fromcashe){

							platform.app.nav.api.load({
								open : true,
								href : 'post?s=' + data.posttxid,
								inWnd : true,

								clbk : function(d, p){									
									app.nav.wnds['post'] = p
								},

								essenseData : {
									share : data.posttxid,

									reply : {
										answerid : data.commentid,
										parentid : data.parentid || "",
										noaction : true
									}
								}
							})
						
						})

					})
						
					message.el.find('.reply').on('click', function(){

						platform.sdk.node.shares.getbyid(data.posttxid, function(s, fromcashe){

							platform.app.nav.api.load({
								open : true,
								href : 'post?s=' + data.posttxid,
								inWnd : true,
								clbk : function(d, p){									
									app.nav.wnds['post'] = p
								},

								essenseData : {
									share : data.posttxid,

									reply : {
										answerid : data.commentid,
										parentid : data.parentid || ""
									}
								}
							})
						
						})
						
					})

				},

				loadMore : function(data, clbk, wa){

					var getpost = function(pid, clbk){

						if(pid)

							platform.sdk.node.shares.getbyid(pid, function(s, fromcashe){

								s || (s = []);

								if (s[0]){
									data.share = s[0];								
								}

								clbk()
							
							})

						else

							clbk()
					}

					platform.sdk.users.get([data.addrFrom], function(){

						data.user = platform.sdk.users.storage[data.addrFrom] || {}
						data.user.address =  data.addrFrom

						getpost(data.posttxid, function(){

							var ids = [data.commentid]

							data.txid = data.commentid

							/*if (data.answerid) 

								ids.push(data.answerid)*/

							platform.sdk.comments.info(ids, function(error, c){

								if (error || !c.length) return

								if (c.length){
									data.comment = c[0];
								}

								platform.sdk.comments.storage[data.comment.txid] ||

								(platform.sdk.comments.storage[data.comment.txid] = {})

								var pid = data.comment.parentid || '0';

								if (platform.sdk.comments.storage[data.comment.txid][pid]){
									platform.sdk.comments.storage[data.comment.txid][pid].push(data.comment)
								}

								/*if (c.length == 2){
									data.answercomment = c[1];
								}*/

								clbk()
							})
						})

						
					})
				},
				fastMessage : function(data){	
			
					var text = '';
					var html = '';



					if(data.mesType == 'post' && data.comment && data.share && data.user && 
						(!platform.sdk.usersettings.meta.comments || platform.sdk.usersettings.meta.comments.value)){

						text = self.tempates.comment(data.comment, self.tempates.share(data.share))

						if(text){
							html += self.tempates.user(data.user, '<div class="text">'+text+'</div>', false, 'New comment')
						}
					}

					if(data.mesType == 'answer' && data.comment && data.share && data.user && 
						(!platform.sdk.usersettings.meta.answers || platform.sdk.usersettings.meta.answers.value)){

						text = self.tempates.comment(data.comment, self.tempates.share(data.share))

						if(text){
							html += self.tempates.user(data.user, '<div class="text">'+text+'</div>', false, 'New answer')
						}
					}		


					return html;
					
				},
				refs : {

				},
				audio : {
					unfocus : 'water_droplet',
					if : function(data){

						if(data.mesType == 'post' && data.comment && data.share && data.user && 
							(!platform.sdk.usersettings.meta.comments || platform.sdk.usersettings.meta.comments.value)){

							return true
						}

						if(data.mesType == 'answer' && data.comment && data.share && data.user &&
							(!platform.sdk.usersettings.meta.answers || platform.sdk.usersettings.meta.answers.value)){

							 return true
						}	
					}
				},

				clbks : {
				}
			},

			event : {
				loadMore : function(data, clbk, wa){
						
					if (data.addrFrom){
						
						platform.sdk.users.get([data.addrFrom], function(){

							data.user = platform.sdk.users.storage[data.addrFrom] || {}

							data.user.address =  data.addrFrom

							if(data.mesType == 'userInfo' && !wa){
								var me = platform.sdk.users.storage[platform.sdk.address.pnet().address];

									me.rc++
							}

							if(data.mesType == 'upvoteShare'){
								platform.sdk.node.shares.getbyid(data.posttxid, function(s, fromcashe){

									s || (s = []);

									if (s[0]){
										data.share = s[0];

										if(fromcashe && !wa){

											data.share.score = Number(data.share.score) + Number(data.upvoteVal)
											data.share.scnt = Number(data.share.scnt) + 1
										}
									}

									clbk()
								})
							}
							else
							{

								if((data.mesType == 'subscribe' || data.mesType == 'unsubscribe') && !wa){
									var u = platform.sdk.users.storage[data.addrFrom];

									var me = platform.sdk.users.storage[platform.sdk.address.pnet().address];


									if (me){

										if(data.mesType == 'subscribe'){
											me.addRelation(data.addrFrom, 'subscribers')											
										}

										if(data.mesType == 'unsubscribe'){
											me.removeRelation(data.addrFrom, 'subscribers')
										}
									}

									if (u){

										if(data.mesType == 'subscribe'){

											u.addRelation({
												adddress : platform.sdk.address.pnet().address,
												private : false
											})	
										}

										if(data.mesType == 'unsubscribe'){

											u.removeRelation({
												adddress : platform.sdk.address.pnet().address,
												private : false
											})
										}

									}
								}

								clbk()
							}
							

						})

						return
					}

					clbk()
				},
				
				refs : {

				},
				audio : {
					unfocus : 'water_droplet',
					if : function(data){

						if(data.mesType == 'upvoteShare' && data.share){

							if(data.upvoteVal > 2 && (!platform.sdk.usersettings.meta.upvotes || platform.sdk.usersettings.meta.upvotes.value)){
							
								return true

							}
						}

						if(data.mesType == 'subscribe'){
							if((!platform.sdk.usersettings.meta.followers || platform.sdk.usersettings.meta.upvotes.followers)){
								return true
							}
						}

						if(data.mesType == 'userInfo'){

							if((!platform.sdk.usersettings.meta.rescued || platform.sdk.usersettings.meta.rescued.value)){

								return true

							}

							
						}

						

						return false;
					}
				},

				fastMessageEvents : function(data, message){

					if(data.mesType == 'subscribe' && data.user){
						
						message.el.find('.subscribe').on('click', function(){


							var be = $(this)

							if (be.hasClass('disabled')) return;

							be.addClass('disabled');

							platform.api.actions.subscribe(data.user.address, function(tx, error){
								if(tx){
								}	
								else{
									self.app.platform.errorHandler(error, true)	

									be.removeClass('disabled');
								}	
							})
						})

					}
				},
				
				fastMessage : function(data){	
			
					var text = '';
					var html = '';

					if(data.mesType == 'userInfo'){

						if((!platform.sdk.usersettings.meta.rescued || platform.sdk.usersettings.meta.rescued.value)){

							text = platform.app.localization.e('refferalUserMessage')

						}

						
					}


					if(data.mesType == 'subscribe'){

						if((!platform.sdk.usersettings.meta.followers || platform.sdk.usersettings.meta.followers.value)){

							text = self.tempates.subscribe(data.user, platform.app.localization.e('subscribeUserMessage'))

						}

					}

					if(data.mesType == 'unsubscribe'){
						text = '';

						// platform.app.localization.e('unsubscribeUserMessage')
					}

					if(data.mesType == 'upvoteShare' && data.share){

						if(data.upvoteVal > 2 && (!platform.sdk.usersettings.meta.upvotes || platform.sdk.usersettings.meta.upvotes.value)){

							var star = self.tempates.star(data.upvoteVal)

							text = platform.app.localization.e('upvoteShareMessage') + self.tempates.share(data.share, star)
						}
					}

					if(text){
						html += self.tempates.user(data.user, '<div class="text">'+text+'</div>', true)
					}


					return html;
					
				},
				
				clbks : {
				}
			},

			message : {
				loadMore : function(data, clbk, wa){

						
					if (data.address){
						
						platform.sdk.users.get([data.address], function(){

							data.user = platform.sdk.users.storage[data.address]

							if (data.user){
								data.user.address =  data.address

								clbk()
							}
						})

					}
				},
				
				refs : {

				},
				audio : {
					unfocus : 'water_droplet'
				},

				fastMessageEvents : function(data, message){
						
					message.el.find('.tochat').on('click', function(){

					})

				},
				
				fastMessage : function(data){	
			
					var text = '';
					var html = '';

					text = self.tempates.subscribe(data.user, "sent you private message")

					html += self.tempates.user(data.user, '<div class="text">'+text+'</div>', true)
				

					return html;
					
				},
				
				clbks : {
				}
			}
		}

		var auth = function(clbk){

			app.user.isState(function(state){

				if(state)
				{

					self.addAccount(null, clbk)

				}
				else
				{
					if(clbk)
						clbk(false)
				}

				
			})
		}

		var initOnlineListener = function(){
			if(self.onlineCheck && !_Node){

				onlinetnterval = retry(function(){

					var online = deep(window, 'navigator.onLine');

					if (self.online != online){

						self.online = online;

						return true;

					}
					

				}, function(){

					if(!self.online){

						if (lost < 2)
							lost = platform.currentBlock;	

						self.close();
							
						initOnlineListener();			
					}
					else
					{
						self.getMissed(initOnlineListener);
						
						initconnection();	
					}

					


				}, 50)

			}
		}

		var reconnect = function(){
			if (closing){
				return;
			}

			closing = false;

			socket = null;

			lost = platform.currentBlock;	

			self.close();

			initconnection();
		}

		var initconnection = function(clbk){

			//if(socket) return

			socket = new ReconnectingWebSocket(platform.app.options.ws); 

			socket.onmessage = function(message) { 



			    message = message.data;

	        	var jm = message;

	        	try{

	        		if(jm.indexOf('registered') > -1){
	        			message = message.replace("msg", '"msg"')
	        			message = message.replace("addr", '"addr"')
	        		}
	        		

	        		jm = JSON.parse(message || "{}");

	        	}
	        	catch (e){
	        
	        	}

        		if (jm)

        			self.messageHandler(jm);
			   
			};

			/*socket.onerror = function (error) { 
			   
			   	console.log('error', error)

			   	if (opened)
			   		socket.close()
			   
			};*/

			socket.onopen = function(){
				
				lost = platform.currentBlock || 0;

				opened = true;

				auth()

				if (clbk)
					clbk()
			}

			/*socket.onclose = function(e){

				reconnect()

			}	*/
		} 

		self.getMissed = function(clbk){

			if(lost > 1 && self.loadingMissed) return

			self.loadingMissed = true;

			platform.app.ajax.rpc({
				method : 'getmissedinfo',
				parameters : [platform.sdk.address.pnet().address, lost],
				success : function(d){			

					d || (d = [{block : 1, cntposts : 0, cntsubscr : 0}])

					var notifications = (d || []).slice(1)	

					var blockInfo = d[0]

					blockInfo.msg = 'newblocks'

					lost = 0;

					self.messageHandler(blockInfo, function(){
						lazyEach({
							array : notifications,
							action : function(p){
								self.messageHandler(p.item, p.success)
							},

							all : {
								success : function(){
									self.loadingMissed = false;
								}
							}
						})
					})

					if (clbk)
						clbk()
		
				},
				fail : function(){

					if (clbk)
						clbk()
					
				}
			})
		}

		self.fastMessage = function(html, destroy){
			var id = makeid(true);

			html = '<div class="fastMessage" id="'+id+'">\
			<div class="fmCnt">' + html + '</div>\
			<div class="close">\
				<i class="fa fa-times" aria-hidden="true"></i>\
			</div>\
			</div>';

			$('body').append(html);

			var el = $('#' + id);

			var message = {
				id : id,
				el : el,
				html : html
			}

			bgImages(el)

			el.find('[data-jdenticon-value]').each(function(){
				var t = $(this);
				var v = t.data('jdenticon-value')

				t.html(jdenticon.toSvg(v, t.width()))
			})

			self.fastMessages.push(message);

			platform.app.nav.api.links(null, el, function(){
				destroyMessage(message, 1)
			});

			var destroyMessage = function(message, time, noarrange, destroyUser){

				if(message.timeout)
					clearTimeout(message.timeout);

				if(platform.focus)
				{

					message.timeout = setTimeout(function(){
						
						message.el.fadeOut(300)

						setTimeout(function(){

							message.el.remove();

							removeEqual(self.fastMessages, {
								id : message.id
							})

							if (destroy && destroyUser){
								destroy()
							}

							if(!noarrange)
								arrangeMessages()

						}, 300)

					}, time)
				}

				else
				{
					setTimeout(function(){
						destroyMessage(message, time, noarrange)
					}, 100)
					
				}

			}

			var arrangeMessages = function(){

				var offset = 0;

				var maxCount = 4;

				var boffset = 0;

				if(isMobile()){
					maxCount = 1;
				}
				else
				{

					if(typeof _Electron == 'undefined'){
						boffset = 60;
					}

					
				}

				offset = offset + boffset

				var remove = self.fastMessages.length - maxCount;

				_.each(self.fastMessages, function(m, i){

					if(i < remove){
						destroyMessage(m, 1, true)
					}

					else
					{
						if(!isMobile()){
							offset += 10;
						}
						

						m.el.css('bottom', offset + 'px');

						offset += m.el.outerHeight();
					}

				})
			}

			destroyMessage(message, 5000, false, true);

			message.el.on('mouseenter', function(){
				clearTimeout(message.timeout);
			})

			message.el.on('mouseleave', function(){
				destroyMessage(message, 5000, false, true);
			})

			message.el.find('.close').on('click', function(){
				destroyMessage(message, 1, false, true);
			})

			arrangeMessages();



			return message
		}

		self.messageHandler = function(data, clbk){


			if(!data.msg) return

			if (data && data.msg == 'registered'){

				self.connected[data.addr] = true

				return

			}

			if (data.msg){

				var exkey = ''

				if (data.mesType) exkey = '.' + data.mesType;

    			var m = deep(self.messages, (data.msg) + exkey) || deep(self.messages, (data.msg)) || {};

    			if (m.checkHandler){
    				if(!m.checkHandler(data, m)){
    					return
    				}
    			}

    			var clbks = function(loadedData){

    				data.loadedData = true;

    				var audio = deep(m, 'audio')

    				_.each(m.clbks, function(clbk){
        				clbk(data, loadedData);
        			})

        			if(!_Node){
        				if (audio){

	    					if(!audio.if || audio.if(data, loadedData)){

	    						if (audio.focus && platform.focus){
	    						
		    						ion.sound.play(audio.focus);
		    					}


		    					if (audio.unfocus && !platform.focus){
		    						
		    						ion.sound.play(audio.unfocus);
		    					}

	    					}

	    					
	    				}

	    				if(m.fastMessage && !m.refs.all && !m.refs[data.RefID]){

	    					var html = m.fastMessage(data, loadedData);


	    					if (html){

	    						var message = self.fastMessage(html, function(){
	    							platform.sdk.notifications.seen([data.txid])
	    						});

	    						if (m.fastMessageEvents){
	    							m.fastMessageEvents(data, message)
	    						}

	    						data.loaded = true

	    						platform.sdk.notifications.addFromWs(data)

	    						if (typeof _Electron != 'undefined' && !platform.focus && message.html){
									electron.ipcRenderer.send('electron-notification', message.html);
	    						}
								

	    					}


	    				}	

	    				if (m.header && !platform.focus && platform.titleManager){

	    					var t = m.header(data);

	    					if (t)

	    						platform.titleManager.add(t)

	    				}	
        			}

    				  

    				if (clbk)
    					clbk()      				
    				
    			}


    			
    			if (m.loadMore)
    			{
    				m.loadMore(data, clbks);
    			}

    			else
    			{
    				clbks();
    			}

    			return
    		}
		}		

		self.send = function(message){

			if (socket)
			{
				try{
					socket.send(message);
				}
				catch(e){

				}
			}

		}

		self.close = function(){

			if(closing) return

			closing = true;
			opened = false;
			wait = null;

			
			self.connected = {};

			if (socket){
				socket.close()
			}

			socket = null;

			closing = false;

		}

		self.destroy = function(){

			self.close()
			self.loadingMissed = false;

			if (onlinetnterval)
				clearInterval(onlinetnterval)


		}


		/////////

			self.wait = function(address, clbk){
				retry(function(){
					if(!wait || !wait[address]) {
						return true
					}

					if(Math.floor((new Date().getTime()) / 1000) > wait[address] + 1){
						return true
					}

					if(self.connected[address]) return true;
				}, clbk)
			}

			self.addAccount = function(keyPair, clbk){

				if(!keyPair){
					keyPair = platform.app.user.keys();
				}

				var key = platform.sdk.address.pnet(keyPair.publicKey).address  + 'addressesNum'

				var num = localStorage[key] || 1;

				var keyPairs = [{
					kp : keyPair,
					n : 0
				}];

				/*for(var i = 1; i <= num; i++){

					var d = bitcoin.bip32.fromSeed(keyPair.privateKey).derivePath(app.platform.sdk.address.path(i)).toWIF() 

					var kp = bitcoin.ECPair.fromWIF(d)	  

					keyPairs.push({
						kp : kp,
						n : i
					})
				}*/

				self.addAddresses(keyPairs, clbk)

			}

			self.addAddresses = function(keyPairs, clbk){

				var success = 0;

				lazyEach({
					array : keyPairs,
					sync : true,
					action : function(p){
						self.addAddress(p.item.kp, p.item.n, function(r){
							
							if(r)
								success++;

							p.success()
						})
					},

					all : {
						success : function(){
							if (clbk)
								clbk(success != 0)

						}
					}
				})
			}

			self.addAddress = function(keyPair, n, clbk){

				/*if(!keyPair){
					keyPair = platform.app.user.keys();
				}*/

				var	address = '';



				if(!n){
					address = platform.sdk.address.pnet(keyPair.publicKey).address
				}
				else{
					address = platform.sdk.address.wallet(n, keyPair.privateKey).address
				}
				
				if (self.connected[address]){

					if (clbk)
						clbk(true)

					return
				}			

				var nonce = Math.round(new Date().getTime() / 1000);

				do{
					nonce = nonce.toString() + '' + rand(0, 9).toString();
				}
				while(nonce.length < 32)

				var signature = keyPair.sign(Buffer.from(nonce))		
		
				var message = {
					addr : address,
					nonce : nonce,
					sgn : signature.toString('hex'),
					pub : keyPair.publicKey.toString('hex')
				}

				if(!wait)
					wait = {};

				wait[address] = Math.floor((new Date().getTime()) / 1000);

				self.wait(address, function(){
					if(self.connected[address]){

						if (clbk)
							clbk(true)
					}
					else
					{
						if (clbk)
						clbk(false)
					}
				})

				self.send(JSON.stringify(message))
			}

			self.removeAddresses = function(addresses){

				_.each(addresses, function(i, a){
					self.removeAddress(a)
				})
			}

			self.removeAccount = function(){
				self.destroy()
			}

			self.removeAddress = function(address){

				var message = {
					msg : "unsubscribe", 
					addr : address
				}

				delete self.connected[address]
				delete wait[address]

				self.send(JSON.stringify(message))
			}

		/////////

		self.init = function(clbk){

			closing = false;
			self.onlineCheck = true;

			if(!_Node)

				self.onlineCheck = deep(window, 'navigator.onLine') || false;

			self.online = self.onlineCheck;
			self.connected = {};

			self.lostBlock = platform.currentBlock;

			initOnlineListener();



			initconnection();

			if (clbk)
				clbk()

		}
	}

	self.WS = function(platform){

		var self = this;

		var socket;

		var wait = null;

			self.isopen = false;
			self.isopening = false;
			self.fastMessages = [];
			self.reconnected = false;

			self.connected = {};


		var initOnlineListener = function(){
			if(self.onlineCheck && !_Node){

				retry(function(){

					var online = deep(window, 'navigator.onLine') && !self.lostConnection;

					if (self.online != online){

						self.online = online;

						return true;

					}
					else
					{
						self.online = online;
					}
					

				}, function(){

					if(!self.online){
						if(!self.reconnected)
							self.reconnected = platform.currentBlock;


						initOnlineListener();
					}

					else
					{
						if (self.reconnected > 1 && !self.loadMissed){
							self.getMissed(initOnlineListener);
						}

						self.authConnect()
					}


				}, 50)

			}
		}

		self.getMissed = function(){

			self.loadMissed = true;

			platform.app.ajax.rpc({
				method : 'getmissedinfo',
				parameters : [platform.sdk.address.pnet().address, self.reconnected],
				success : function(d){			

					d || (d = [{block : 1, cntposts : 0, cntsubscr : 0}])

					var notifications = (d || []).slice(1)	

					var blockInfo = d[0]

					blockInfo.msg = 'newblocks'

					self.messageHandler(blockInfo, function(){
						lazyEach({
							array : notifications,
							action : function(p){
								self.messageHandler(p.item, p.success)
							},

							all : {
								success : function(){
									self.loadMissed = false;
								}
							}
						})
					})
		
				},
				fail : function(){

					
				}
			})
		}

		

		

		self.destroy = function(fromsocket){

			self.isopen = false;

			self.removeAddresses(self.connected)

			self.connected = {};

			if (socket && !fromsocket){
				socket.close()
			}

			wait = null;

			socket = null;
		}


		self.fastMessage = function(html, destroy){
			var id = makeid(true);

			html = '<div class="fastMessage" id="'+id+'">\
				<div class="fmCnt">' + html + '</div>\
				<div class="close"><i class="fa fa-times" aria-hidden="true"></i></div>\
			</div>';

			$('body').append(html);

			var el = $('#' + id);

			var message = {
				id : id,
				el : el,
				html : html
			}

			bgImages(el)

			el.find('[data-jdenticon-value]').each(function(){
				var t = $(this);
				var v = t.data('jdenticon-value')

				t.html(jdenticon.toSvg(v, t.width()))
			})

			self.fastMessages.push(message);

			platform.app.nav.api.links(null, el, function(){
				destroyMessage(message, 1)
			});

			var destroyMessage = function(message, time, noarrange, destroyUser){

				if(message.timeout)
					clearTimeout(message.timeout);

				if(platform.focus)
				{

					message.timeout = setTimeout(function(){
						
						message.el.fadeOut(300)

						setTimeout(function(){

							message.el.remove();

							removeEqual(self.fastMessages, {
								id : message.id
							})

							if (destroy && destroyUser){
								destroy()
							}

							if(!noarrange)
								arrangeMessages()

						}, 300)

					}, time)
				}

				else
				{
					setTimeout(function(){
						destroyMessage(message, time, noarrange)
					}, 100)
					
				}

			}

			var arrangeMessages = function(){

				var offset = 0;

				var maxCount = 4;

				if(isMobile()){
					maxCount = 1;
				}

				var remove = self.fastMessages.length - maxCount;

				_.each(self.fastMessages, function(m, i){

					if(i < remove){
						destroyMessage(m, 1, true)
					}

					else
					{
						if(!isMobile()){
							offset += 10;
						}
						

						m.el.css('bottom', offset + 'px');

						offset += m.el.outerHeight();
					}

				})
			}

			destroyMessage(message, 5000, false, true);

			message.el.on('mouseenter', function(){
				clearTimeout(message.timeout);
			})

			message.el.on('mouseleave', function(){
				destroyMessage(message, 5000, false, true);
			})

			message.el.find('.close').on('click', function(){
				destroyMessage(message, 1, false, true);
			})

			arrangeMessages();



			return message
		}

		self.connect = function(clbk){
						
			if(!socket)
			{

				var address = platform.app.options.ws
				
				if (typeof (WebSocket) !== 'undefined') {

					try{
		            	socket = new WebSocket(address);
		            } catch (e){}

		        } else {
		        	try{
		           		socket = new MozWebSocket(address);
		            } catch (e){}
		        }				

		        socket.onclose = function (event) {

		           	self.destroy(true);
		           	self.reconnect();

		        };

		        socket.onerror = function(e){
	
		        	self.destroy();

		        	if (clbk)
						clbk(false)
				}

				socket.onopen = function(e){
					
					self.isopen = true;

					self.reconnected = platform.currentBlock

					self.connected = {};

					self.auth(clbk);				
				}	

		        socket.onmessage = function (msg) {

		        	msg = msg.data;

		        	var jm = msg;

		        	try{

		        		if(jm.indexOf('registered') > -1){
		        			msg = msg.replace("msg", '"msg"')
		        			msg = msg.replace("addr", '"addr"')
		        		}
		        		

		        		jm = JSON.parse(msg || "{}");

		        	}
		        	catch (e){
		        
		        	}

	        		if (jm)

	        			self.messageHandler(jm);
		        		

		        	
		        };
			}
			
		}

		self.addBlock = function(){
			self.blockHandler = true;
		}

		self.removeBlock = function(){
			self.blockHandler = false;
		}

		self.messageHandler = function(data, clbk){

			if(!data.msg) return


			if (data && data.msg == 'registered'){

				self.connected[data.addr] = true

				return

			}

			if (data.msg && !self.blockHandler){

				var exkey = ''

				if(data.mesType) exkey = '.' + data.mesType;

    			var m = deep(self.messages, data.msg + exkey) || deep(self.messages, data.msg) || {};

    			if (m.checkHandler){
    				if(!m.checkHandler(data, m)){
    					return
    				}
    			}

    			var clbks = function(loadedData){

    				data.loadedData = true;

    				var audio = deep(m, 'audio')


    				if (audio){

    					if(!audio.if || audio.if(data, loadedData)){

    						if (audio.focus && platform.focus){
    						
	    						ion.sound.play(audio.focus);
	    					}


	    					if (audio.unfocus && !platform.focus){
	    						
	    						ion.sound.play(audio.unfocus);
	    					}

    					}

    					
    				}

    				_.each(m.clbks, function(clbk){
        				clbk(data, loadedData);
        			})


    				if(m.fastMessage && !m.refs.all && !m.refs[data.RefID]){

    					var html = m.fastMessage(data, loadedData);


    					if (html){

    						var message = self.fastMessage(html, function(){
    							platform.sdk.notifications.seen([data.txid])
    						});

    						if (m.fastMessageEvents){
    							m.fastMessageEvents(data, message)
    						}

    						data.loaded = true

    						platform.sdk.notifications.addFromWs(data)

    						if (typeof _Electron != 'undefined' && !platform.focus && message.html){
								electron.ipcRenderer.send('electron-notification', message.html);
    						}
							

    					}


    				}	

    				if (m.header && !platform.focus && platform.titleManager){

    					var t = m.header(data);

    					if (t)

    						platform.titleManager.add(t)

    				}	  

    				if (clbk)
    					clbk()      				
    				
    			}


    			
    			if (m.loadMore)
    			{
    				m.loadMore(data, clbks);
    			}

    			else
    			{
    				clbks();
    			}

    			return
    		}
		}

		self.auth = function(clbk){

			app.user.isState(function(state){

				if(state)
				{

					self.addAccount(null, clbk)

				}
				else
				{
					if(clbk)
						clbk(false)
				}

				
			})
		}

		self.authConnect = function(clbk){

			app.user.isState(function(state){

				if(state)
				{
					self.connect(clbk)
				}

				else
				{
					if (clbk)
						clbk(false)
				}

			})
		}

		self.reconnect = function(clbk){

			self.reconnected = platform.currentBlock

			self.lostConnection = true;

			retryLazy(function(clbk){

				self.authConnect(function(res){

					if (res){
						self.lostConnection = false
					}

					clbk(res)

				})

			}, clbk, 1500)
		}

		self.send = function(message){

			if (socket)
			{
				try{
					socket.send(message);
				}
				catch(e){

				}
			}

		}

		self.tryInit = function(){

			var clbk = function(){
				app.user.isState(function(state){

					if(!state) return;

					self.onlineCheck = deep(window, 'navigator.onLine') || false;
					self.online = self.onlineCheck;

					if(!socket) 
						self.reconnected = platform.currentTime();

					initOnlineListener();

				})
			}

			_break = false;

			self.connected = {};

			self.authConnect(function(result){

				if(!socket){

					self.reconnect(clbk)

					return
				}
								
				clbk()

				
			})
		}

		

		return self;
	}

	self.RTC = function(platform){
		var self = this;

		self.connections = {};

		self.storages = {};		

		self.events = {};

		self.timers = {};

		var me = makeid();

		////

		//self.connection = null;

		self.connect = function(roomid, events, clbk, mstorageid){


			if(!self.storages[roomid]){
				self.storages[roomid] = new MessageStorage({id : mstorageid || roomid});
			}
			else
			{
				
			}

			self.connections[roomid] = new RTCMultiConnection();

			self.settings(self.connections[roomid], roomid)

			self.events[roomid] || (self.events[roomid] = {})

			_.each(events, function(e, id){

				if(!self.events[roomid][id])
					self.events[roomid][id] = {}

				self.events[roomid][id] = e;

			})

			var refresh = false;	

			self.connections[roomid].openOrJoin(roomid, function(){

				self.syncTimer(roomid)

				if (clbk)
					clbk()

			});
				
		}

		self.reconnect = function(roomid){

			if (self.connections[roomid])
				self.connections[roomid].openOrJoin(roomid, function(){

				});

			else{
				return false;
			}

		}

		self.settings = function(connection, roomid){

			var keyPair = platform.app.user.keys();

			var firstPeerConnect = true;

			connection.sessionid = roomid
			connection.channel = roomid
			connection.session = {
			    data: true
			};

			connection.enableLogs = false

			connection.socketURL = platform.app.options.rtc

			//connection.userid = Buffer.from(bitcoin.crypto.hash256(platform.sdk.address.pnet().address + roomid, 'utf8')).toString('hex') 

			connection.userid = platform.sdk.address.pnet().address + "_" + makeid()

			connection.sdpConstraints.mandatory = {
			    OfferToReceiveAudio: false,
			    OfferToReceiveVideo: false
			};


			connection.onopen = function(e){	

				if (self.events[roomid] && self.events[roomid].onopen){
					self.events[roomid].onopen(e)
				}

				if (firstPeerConnect){
					hlp.sendSyncRequest(roomid);
					firstPeerConnect = false;
				}
				
			}

			connection.onclose = function(e){

				if (self.events[roomid] && self.events[roomid].onclose){
					self.events[roomid].onclose(e)
				}

			}

			connection.onEntireSessionClosed = function(event) {
			    //console.info('Entire session is closed: ', event.sessionid, event.extra);
			};

			connection.onmessage = function(e) {

				if (e.data.sync_request) {
			        hlp.receiveSyncRequest(e, roomid);
			        return;			        
			    }

			    if (e.data.sync_answer) {
			        hlp.receiveSyncAnswer(e, roomid);
			        return;
			    }

			    if (e.data.typing) {
			        return;
			    }

			    if (e.data.stoppedTyping) {
			        return;
			    }			    

			    hlp.receiveMessage(e.data, roomid);
			};
		}

		self.send = function(id, message){

			if (self.connections[id]){

				var m = self.message(message);

				if(checkSign(m)){

					self.storages[id].AddMessage(m);

					self.connections[id].send(m);

					if (self.events[id].sendMessage){
						self.events[id].sendMessage(m)
					}

				}
			}
		}

		self.message = function(message, to){


			var m = {
				tm: platform.currentTimeSS(),
		        f: platform.sdk.address.pnet().address,

		        t: to || '',

		        m: message,
		        ex: {
		            s : ''
		        }
			}

			signMessage(m)

			return m
			
		}

		var checkSign = function(message){

			if(!message.ex) return false

			if(!message.ex.s || !message.ex.p) return;

			var keyPair = bitcoin.ECPair.fromPublicKey(Buffer.from(message.ex.p, 'hex'))

			var str = message.tm + message.f + message.t + message.m;

			var hash = Buffer.from(bitcoin.crypto.hash256(str), 'utf8')

			var verify = keyPair.verify(hash, Buffer.from(message.ex.s, 'hex'));

			return verify

		}

		var signMessage = function(message){

			var keyPair = platform.app.user.keys();

			var str = message.tm + message.f + message.t + message.m;

			var signature = keyPair.sign(Buffer.from(bitcoin.crypto.hash256(str), 'utf8'));	

			message.ex.s = signature.toString('hex');
			message.ex.p = keyPair.publicKey.toString('hex')
		}
		

		var hlp = {
			receiveSyncRequest : function(e, id){

			    let _db_diff = self.storages[id].CompareDB(e.data.hv, e.data.tm_f, e.data.tm_t);

			    if (self.connections[id])
				    self.connections[id].send({
				        sync_answer: 1,
				        msgdb: _db_diff,
				        users: {},
				    }, e.userid);

			},

			receiveSyncAnswer : function(e, id){

			    hlp.receiveMessages(e.data.msgdb, id)			

			},

			sendSyncRequest : function(id, userid){

				if(!self.connections[id]) return
				

			    // TODO - Mark existed syncReq as long
			    let _hv = self.storages[id].HistoryVector();

			    // Random select `peer`
			    let _sync_peer_send = userid;
			    if (_sync_peer_send == null) {
			        let _peers = self.connections[id].peers.getAllParticipants(self.connections[id].userid, 'connected');
			        let _sync_peer_current = Math.floor(Math.random() * _peers.length);
			        _sync_peer_send = _peers[_sync_peer_current];			        
			    }

			    if (self.connections[id] && _sync_peer_send) {
				    self.connections[id].send({
				        sync_request: 1,
				        hv: _hv,
				        tm_f: '',
				        tm_t: '',
				    }, _sync_peer_send);
                }
			},

			receiveMessages : function(msgs, id) {

				msgs = _.filter(msgs, function(msg){
					if(checkSign(msg)) return true
				})

				if (msgs.length){

					self.storages[id].MergeDB(msgs);

					if (self.events[id].receiveMessages){
						self.events[id].receiveMessages(msgs)
					}

				}
				
			},

			receiveMessage : function(msg, id) {

				if(checkSign(msg)){

					self.storages[id].AddMessage(msg);

					if (self.events[id].receiveMessage){
						self.events[id].receiveMessage(msg)
					}

					if (!platform.focus && platform.titleManager){

    					platform.titleManager.add("You have new messages")

    				}	
				}
				

				
			}
		}

		self.storage = {};

		self.load = {
			users : function(messages, clbk){

				if(!_.isArray(messages)) messages = [messages]

				var users = _.map(messages, function(m){
					return m.f
				})

				platform.sdk.users.get(users, clbk, true)

				
			},

			info : function(rooms, clbk){

				if(!self.storage.info)
					self.storage.info = {};

				var set = function(id, data){
					self.storage.info[id] = {
						t : platform.currentTime(),
						d : data
					}
				}


				rooms = _.filter(rooms, function(id){
					if(!self.storage.info[id]) return true;

					else {
						var t = self.storage.info[id].t
						var c = platform.currentTime()

						if (c - t > 8){
							return true
						}
					}
				})


				if(!rooms.length){
					if (clbk)
						clbk()
				}
				else
				{

					_.each(rooms, function(id){
						set(id)
					})

					$.ajax({
						url : platform.app.options.rtc,
						datatype : "application/json",
   						contentType: "application/json",
						data : {
							action : 'room_info',
							room_id : rooms.join(',')
						},

						success : function(d){

							_.each(d, function(data, id){

								set(id, data)

							})

							if (clbk)
								clbk()
						},

						fail : function(d){

							if (clbk)
								clbk()
						},

						type : "GET"
					})
				}

				

			}
		}

		self.syncTimer = function(roomid){

		    self.timers[roomid] = setInterval(function() {
		        hlp.sendSyncRequest(roomid);
		    }, 10000);
			
		}

		self.destroy = function(roomid, clbk){

			if (self.timers[roomid]){

				clearInterval(self.timers[roomid]);

				delete self.timers[roomid]
			}

			if (self.connections[roomid]){

				self.connections[roomid].isInitiator = false;

				self.connections[roomid].getAllParticipants().forEach(function(pid) {
			        self.connections[roomid].disconnectWith(pid);
			    });
				
				self.connections[roomid].attachStreams.forEach(function(stream) {
				    stream.getTracks().forEach(function(track) {
				        track.stop();
				    });
				});

				self.connections[roomid].closeSocket();
				
				self.connections[roomid].close();

				delete self.connections[roomid]

			}

			self.events[roomid] = {}

            if (clbk) clbk();
		}

		self.destoryAll = function(){
			_.each(self.connections, function(c, id){
				self.destroy(id)
			})
		}

		
		return self;
	}

	self.convertUTCSS = function(str){

		var d = utcStrToDate(str);

		if (self.timeDifference){

			d.addSeconds( - self.timeDifference)
		}

		return convertDate(dateToStr(d))
	}

	self.currentTimeSS = function(){
		var created = new Date()

		if (self.timeDifference){

			created.addSeconds(self.timeDifference)
		}

		return dateToStrUTCSS(created)
	}
	
	self.currentTime = function(){
		var created = Math.floor((new Date().getTime()) / 1000)

		if (self.timeDifference){
			created += self.timeDifference
		}

		return created;
	}

	self.Cryptography = function(platform){

		var self = this;
		var mk;
		var mk256;
		var iv = [ 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];
		var crypto;
		var currentRsaKeys = null;

		var check = '0101010101010101'

		if(typeof window != 'undefined'){
			crypto = window.crypto || window.msCrypto;
		}
		else
		{
			crypto = _crypto
		}

		self.helpers = {
			keyFromString : function(key, l, clbk){

				if(_Node){
					var derivedKey = PBKDF2.pbkdf2Sync(key, 'helper', 1, 32, 'sha512')

					clbk(key)

				}
				else
				{
					var mypbkdf2 = new PBKDF2(key, 'helper', 1, l);

						mypbkdf2.deriveKey(null, function(key){
							clbk(key)
						});
				}

				
			},

			keyForAes : function(key, clbk){

				var _clbk = function(key){
					
					crypto.subtle.importKey(
					    "raw", 
					    aesjs.utils.utf8.toBytes(key),
					    {   //this is the algorithm options
					        name: "AES-CBC",
					    },
					    false, 
					    ["encrypt", "decrypt"] 
					)
					.then(function(key){

						if (clbk)
							clbk(key)
					   
					})
					.catch(function(err){
					    console.log(err)
					});
				}

				if(key.length >= 128){
					_clbk(key)
				}
				else
				{
					self.helpers.keyFromString(key, 16, function(key){

						_clbk(key)

					})
				}


			}
		}

		self.api = {
			random : {
				crypto : function(clbk, bits){

					bits || (bits = 256)

					var random_num = new Uint8Array(bits / 8); 

					if(crypto.getRandomValues) {

						crypto.getRandomValues(random_num);
					}

					else
					{
						getRandomValues(random_num);
					}

					

					var str = aesjs.utils.hex.fromBytes(random_num)

						if (clbk){
							clbk(str)
						}

					return str;
				}
			},


			rsa : {
				
          		settings : {
          			hashL : "256",
          			name : "RSA-OAEP",
          			length : 4096
          		},
          		createKeys : function(clbk){
          			var settings = this.settings;

          			crypto.subtle.generateKey(
					    {
					        name: settings.name,
					        modulusLength: settings.length, //can be 1024, 2048, or 4096
					        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
					        hash: {name: "SHA-" + settings.hashL}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
					    },
					    true, //whether the key is extractable (i.e. can be used in exportKey)
					    ["encrypt", "decrypt"] //must be ["encrypt", "decrypt"] or ["wrapKey", "unwrapKey"]
					)
					.then(function(keys){

					    if (clbk)
					    	clbk(keys)
					})
					.catch(function(err){
					    console.error(err);
					});
          		},
          		exportKeys : function(keys, clbk){
          			var k = ['public' , 'private'];
          			var exporting = {};
          			var m = this.exportKey;

          			lazyEach({
          				array : k,
          				synk : true,
          				action : function(p){

          					m(keys[p.item + 'Key'], p.item, function(keydata){

          						exporting[p.item] = keydata;

          						p.success();
          					})
          				},

          				all : {
          					success : function(){
          						if (clbk)
          							clbk(exporting)
          					}
          				}
          			})
          		},
          		exportKey : function(key, pp, clbk){
          			
          			var m = 'jwk'

          			if(pp == 'public') { m = 'spki' }
          			if(pp == 'private') {m = 'pkcs8' }

          			crypto.subtle.exportKey(
					    m, //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
					    key //can be a publicKey or privateKey, as long as extractable was true
					)
					.then(function(keydata){
					    //returns the exported key data

					    if (clbk)
					    	clbk(convertArrayBufferToString(keydata))

					})
					.catch(function(err){
					    console.error(err);
					});
          		},
          		importKeys : function(importing, clbk){
          			var k = ['public' , 'private'];
          			
          			var m = this.importKey;
          			var keys = {}

          			lazyEach({
          				array : k,
          				action : function(p){

          					m(importing[p.item], p.item, function(key){

          						keys[p.item + 'Key'] = key

          						p.success();
          					})
          				},

          				all : {
          					success : function(){
          						if (clbk)
          							clbk(keys)
          					}
          				}
          			})
          		},
          		importKey : function(keyH, pp, clbk){
          			var settings = self.api.rsa.settings;

          			var _pp = [];
          			var m = 'jwk';

          			if(pp == 'public') {_pp = ["encrypt"]; m = 'spki' }
          			if(pp == 'private') {_pp = ["decrypt"] ; m = 'pkcs8' }

          			crypto.subtle.importKey(
					    m, //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
					    convertStringToArrayBuffer(keyH),
					    /*{   //this is an example jwk key, other key types are Uint8Array objects
					        kty: "RSA",
					        e: "AQAB",
					        n: keyH,
					        alg: settings.name + "-" + settings.hashL,
					        ext: true,
					    },*/
					    {   //these are the algorithm options
					        name: settings.name,
					        hash: {name: "SHA-" + settings.hashL}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
					    },
					    true, 
					    _pp
					)
					.then(function(key){

					    if (clbk)
					    	clbk(key)

					})
					.catch(function(err){
					    console.error(err);
					});
          		},
          		encrypt : function(publicKey, text, clbk){

          			//var data = aesjs.utils.utf8.toBytes(text);
          			//
          			var data = convertStringToArrayBuffer(text);
          		
          			crypto.subtle.encrypt(
					    {
					        name: "RSA-OAEP",
					    },
					    publicKey, 
					    data 
					)
					.then(function(encrypted){

					    if (clbk)
					    	clbk(convertArrayBufferToString(encrypted))
					})
					.catch(function(err){
					    console.error(err);
					});
          		},
          		decrypt : function(privateKey, text, clbk){
          			var data = convertStringToArrayBuffer(text);

	          		crypto.subtle.decrypt(
					    {
					        name: "RSA-OAEP",
					       
					    },
					    privateKey,
					    data 
					)
					.then(function(decrypted){


					    //returns an ArrayBuffer containing the decrypted data
					    if (clbk)
						    clbk(convertArrayBufferToString(decrypted))
					})
					.catch(function(err){

						console.error(err);

						if (clbk)
							clbk('')

					    //
					});
          		}
			},

			aeswc : {
				pwd : {
					encryption : function(str, p, clbk){

						self.api.aeswc.encryption(str, mk, p, clbk);
					},

					decryption : function(str, p, clbk){

						self.api.aeswc.decryption(str, mk, p, clbk);

					}
				},

				cryptoPair : function(pair, clbk){

					if(!pair.privateEncrypted)

						self.api.aeswc.pwd.encryption(pair.private, {}, function(privateEncrypted){
							pair.privateEncrypted = privateEncrypted

							if (clbk)
								clbk(pair)
						})
						
					else
					{
						if (clbk)
							clbk(pair)
					}
				},

				uncryptoPair : function(pair, clbk){

					if(!pair.private)

						self.api.aeswc.pwd.decryption(pair.privateEncrypted, {}, function(private){
							pair.private = private

							if (clbk)
								clbk(pair)
						})
						
					else
					{
						if (clbk)
							clbk(pair)
					}

					return pair;
				},
				encryption : function(str, key, p, clbk){

					if(!p) p = {};

						p.charsetEnc = (p.charsetEnc || 'utf8')
						p.charsetDec = (p.charsetDec || 'hex')

					var strBytes = aesjs.utils[p.charsetEnc].toBytes(str);

					self.helpers.keyForAes(key, function(akey){
						crypto.subtle.encrypt(
						    {
						        name: "AES-CBC",
						        iv: new Uint8Array(iv)/*window.crypto.getRandomValues(new Uint8Array(16)),*/
						    },
						    akey, //from generateKey or importKey above
						    strBytes //ArrayBuffer of data you want to encrypt
						)
						.then(function(encrypted){

							var _encrypted = aesjs.utils[p.charsetDec].fromBytes(new Uint8Array(encrypted));

							if (clbk)
								clbk(_encrypted)
						})
						.catch(function(err){
						    console.error(err);
						});
					})				
				},

				decryption : function(str, key, p, clbk){
					if(!p) p = {};

						p.charsetEnc = (p.charsetEnc || 'utf8')
						p.charsetDec = (p.charsetDec || 'hex')

					var encryptedBytes = new Uint8Array(aesjs.utils[p.charsetDec].toBytes(str));



					self.helpers.keyForAes(key, function(akey){


						crypto.subtle.decrypt(
						    {
						        name: "AES-CBC",
						        iv: new Uint8Array(iv), //The initialization vector you used to encrypt
						    },
						    akey, //from generateKey or importKey above
						    encryptedBytes //ArrayBuffer of the data
						)
						.then(function(decrypted){

						   
						    var _decrypted = aesjs.utils[p.charsetEnc].fromBytes(new Uint8Array(decrypted));

						    if (clbk)
								clbk(_decrypted)
						})
						.catch(function(err){

						    if (clbk)
								clbk('')
						});

					})

				}
			},


		}

		self.messages = {
			chat : {
				encryptions : function(publicKeys, messages, clbk){

					if(!currentRsaKeys){
						if (clbk)
							clbk()

						return
					}

					var _ar = [];
					var keys = _.map(messages, function(m,k){
						_ar.push(m)
						return k
					})

					var skey = self.api.random.crypto();

					var encryptedMessages = {};
					var encryptedKeys = null;

					lazyEach({
						array : _ar,
						action : function(p, index){
							var message = p.item;
							var key = keys[index];

							if(message){

								self.messages.chat.encryption(publicKeys, message,  function(em){

									if (em){
										encryptedMessages[key] = em.message;
										encryptedKeys = em.keys;

										p.success()
									}

									else
									{
										p.fail()
									}

									

								}, skey)
							}
							else
							{
								encryptedMessages[key] = message;

								p.success()
							}
							
						},
						all : {
							success : function(){

								if (clbk)
									clbk(encryptedMessages, encryptedKeys)
							},
							fail : function(){

								if (clbk)
									clbk()
							}
						}
					})
				},
				encryption : function(publicKeys, message, clbk, skey){

					if(currentRsaKeys){
						publicKeys || (publicKeys = [])

						publicKeys.push({
							key : currentRsaKeys.publicKey,
							user : platform.app.user.data.id
						})


						self.messages.encryption(publicKeys, check + message, clbk, skey)
					}
					else
					{
						if (clbk)
							clbk()
					}

					

				},
				decryptions : function(skey, messages, clbk){

					var _ar = [];

					var keys = _.map(messages, function(m,k){
						_ar.push(m)

						return k
					})

					var decryptedMessages = {};

					lazyEach({
						array : _ar,
						synk : true,
						action : function(p, index){

							var message = p.item;
							var key = keys[index];

							if(message){

								self.messages.chat.decryption(skey, message,  function(message){

									decryptedMessages[key] = message;

									p.success()

								})
							}
							else
							{
								decryptedMessages[key] = message;

								p.success()
							}
							
						},
						all : {
							success : function(){

								clbk(decryptedMessages)
							}
						}
					})
				},
				decryption : function(skey, encryptedMessage, clbk){

					if (currentRsaKeys){
						self.messages.decryption(currentRsaKeys.privateKey, skey, encryptedMessage, function(message){
							if(message.indexOf(check) === 0){

								message = message.substr(check.length)

							}

							else
							{
								message = ''
								//message = "Can't decrypt message"
							}

							if (clbk)
								clbk(message)
						})
					}
					else
					{
						if (clbk)
							clbk('')
					}

					
				}
			},
			decryption : function(privateKey, encryptedKey, encryptedMessage, clbk){

				var decryption = function(privateKey){
					self.api.rsa.decrypt(privateKey, encryptedKey, function(skey){

						var decryptedMessage = self.api.aeswc.decryption(encryptedMessage, skey, {}, clbk);

					})
				}				

				if(!_.isObject(privateKey)){
					self.api.rsa.importKey(privateKey, 'private', function(privateKey){
						decryption(privateKey)
					})
				}
				else
				{
					decryption(privateKey)
				}

			},
			encryption : function(publicKeys, message, clbk, skey){
				skey || (skey = self.api.random.crypto());
			
				var encryptedKeys = [];

				lazyEach({
					array : publicKeys,
					action : function(p, index){
						var key = p.item.key;

						var encryption = function(key){

							self.api.rsa.encrypt(key, skey, function(encryptedKey){
								encryptedKeys[index] = {
									key : encryptedKey,
									user : p.item.user
								}

								p.success();
							})
						}

						if(!_.isObject(key)){
							self.api.rsa.importKey(key, 'public', function(key){
								encryption(key)
							})
						}
						else
						{
							encryption(key)
						}
					},

					all : {
						success : function(){
							
							self.api.aeswc.encryption(message, skey, {}, function(encryptedMessage){
							
								if (clbk)
									clbk({
										keys : encryptedKeys,
										message : encryptedMessage
									})

							});

							
						}
					}
				})
			}
		}

		self.prepare = function(clbk){

			app.user.isState(function(state){
				if (state){

					var key = app.user.private.value;

					if (key){

						mk = key.toString('hex');

						if (clbk)
							clbk(false)

					}

					else{
						if (clbk)
							clbk('key')
					}	
				}

				else
				{
					if (clbk)
						clbk('state')
				}
			})
		}

		

		return self;
	}

	self.autoUpdater = function(){

		if(!electron) return

		var updateReady = function(){
			dialog({
				html : "Updates to Pocketnet are available. Apply the updates now?",
				btn1text : "Yes",
				btn2text : "No, later",

				success : function(){

					electron.ipcRenderer.send('quitAndInstall');
					//electron.remote.autoUpdater.quitAndInstall()

				},

				fail : function(){
					setTimeout(updateReady, 86400000)
				}
			})
		}

		electron.ipcRenderer.on('updater-message', (event, data) => {
			if(data.type == 'info'){
				if(data.msg == 'update-downloaded'){
					updateReady()
				}

				if(data.msg == 'download-progress'){
					console.log('download-progress', data)
				}
			}

			if(data.type == 'error'){
				console.log('download-progress', data)
			}
		})

	}

	self.autochange = function(){

		var key = 'nodes'

		if(typeof _Test != 'undefined' && _Test){
			key = 'nodes_test'
		}


		self.nodeid++;


		if (self.nodeid >= self[key].length){
			self.nodeid = 0;
		}
	}

	self.Marketing = function(platform){
		var self = this;

		var userid = localStorage['mu'] || makeid();
					 localStorage['mu'] = userid;

		var ab = {};
		var _a = ['a', 'b'];

		var device = function(){
			var device = 'web'

			if(typeof _Electron != 'undefined') device = 'electron'

			if(window.cordova) device = 'cordova'

			else
			{
				if(isMobile()){

					device = 'mobile' + device

				}
			}

			return device 
		}

		self.log = function(action, note, clbk){

			platform.app.ajax.run({
				data : {
					Action : 'ADDLOGS',
					UserID : userid,
					Act : action,
					Note : note || '',
					Device : device(),
					System : 'P'
				},

				success : function(data){
										
					if (clbk)
						clbk()

				},

				fail : function(){

					if (clbk)
						clbk()
				}
			})

		}

		self.ab = {
			send : function(testid, result){

				platform.app.ajax.run({
					data : {
						Action : 'ADDTESTRESULT',
						UserID : userid,
						TestID : testid,
						Note : result || '',
						Device : device()
					},

					success : function(data){
											
						if (clbk)
							clbk()

					},

					fail : function(){

						if (clbk)
							clbk()
					}
				})

			},
			init : function(){	

				ab = JSON.parse(localStorage['ab'] || "{}")
				
			},
			add : function(testid, prev){

				if(ab[testid]){
					return 
				}

				ab[testid] = ab[prev] || _a[rand(0, 1)]

				localStorage['ab'] = JSON.stringify(ab)
			}
		}


		return self;
	}

	self.nodes_test = [
		{
			full : '84.52.69.110:10011',
			host : '84.52.69.110',
			port : 10011,
			ws : 8080,
			path : '',

			test : true,
			name : 'performancetest'
		}

		/*,{
			full : '84.52.69.110:48081',
			host : '84.52.69.110',
			port : 48081,
			ws : 8080,
			path : '',

			test : true,
			name : 'performancetest'
		}*/
	]

	self.nodes = [

		{
			full : '84.52.69.110:58081',
			host : '84.52.69.110',
			port : 58081,
			ws : 8080,
			path : '',

			name : 'spb1'
		},



		{
			full : '216.108.237.11:58081',
			host : '216.108.237.11',
			port : 58081,
			ws : 8080,
			path : '',

			name : 'lasvegas'

		},

		

		{
			full : '84.52.69.110:37071',
			host : '84.52.69.110',
			port : 37071,
			ws : 8080,
			path : '',

			name : 'spbtest'
		}

	]


	self.clear = function(){
		_.each(self.sdk, function(c, id){
				
			if (c.storage){
				c.storage = {}
			}
		})

		self.sdk.notifications.clbks.seen = {}
		self.sdk.notifications.clbks.added = {}

		self.sdk.notifications.inited = false

		self.app.nav.addParameters = null;

		

		if(electron){
			electron.ipcRenderer.send('update-badge', null);
			electron.ipcRenderer.send('update-badge-tray', null);
		}
		

		if (self.ws)
			self.ws.destroy()
	}

	self.update = function(clbk){
		var methods = [
			
		]

		var progress = 10;

		topPreloader(progress);

		lazyEach({
			array : methods,
			action : function(p){
				var m = p.item;

				var f = deep(self.sdk, m);

				f(function(){

					progress = progress + 15;

					topPreloader(progress);

					p.success();

				})
			},

			all : {
				success : function(){

					topPreloader(100);

					if (clbk)
						clbk();
				}
			}
		})
	}
	
	self.prepare = function(clbk, state){	

		self.ws = new self.WSn(self);

		if(!_Node)
		{
			self.state.load();

			self.focusListener();
			self.initSounds();

			//self.rtc = new self.RTC(self);

			self.sdk.node.update()

			self.m = new self.Marketing(self);

			self.titleManager = new self.TitleManager();	

		}

		self.sdk.node.get.time(function(){
			
			if(!state && !_Node && typeof _Electron == 'undefined' && !window.cordova && !localStorage['popupsignup'] && !_Node){
				setTimeout(function(){

					var href = self.app.nav.get.href();

					self.app.user.isState(function(state){

						if (!state && href != 'registration' && href != 'authorization' && href != 'video'){

							

							var h = '<div class="dimage" image="img/mainbgsmall.jpg"><div class="ppheader"><div class="table"><div>Join now and get a bonus of 5 Pocketcoin cryptocurrency tokens. This offer will end soon, join Pocketnet early and become a pioneer!</div></div></div></div>';

							var d = dialog({
								html : h,
								class  :'popupsignup',

								btn1text : 'Join Pocketnet & Earn Pocketcoin Now',
								btn2text : 'Watch Video',

								success : function(){
									

									self.app.nav.api.load({
										open : true,
										href : 'registration',
										history : true
									})
								},

								fail : function(){
									self.app.nav.api.load({
										open : true,
										href : 'video',
										history : true
									})
								}
							})


						}
					})

				}, 15000)
			}

			self.prepareUser(clbk, state);
			
		})
	}

	self.prepareUser = function(clbk, state){

		var stateclbk = function(state){
			if(state){
				

				lazyActions([

					self.sdk.node.transactions.loadTemp, 
					self.sdk.addresses.init, 
					self.cryptography.prepare, 
					self.sdk.pool.init,
					self.sdk.ustate.me,
					self.sdk.usersettings.init,
					self.sdk.articles.init,
					self.sdk.imagesH.load,
					self.sdk.chats.load,
					self.sdk.user.subscribeRef,
					self.ws.init,
					self.sdk.tempmessenger.init,

					self.sdk.exchanges.load

					], function(){
					
					self.sdk.node.transactions.checkTemps(function(){

						self.sdk.user.get(function(u){

							if(Number(u.postcnt) > 0)

								/*setTimeout(function(){
									self.sdk.user.survey()
								}, 300000)*/

							
							

							self.app.nav.addParameters = function(h){
								return self.app.nav.api.history.addParametersToHref(h, {
									ref : self.app.platform.sdk.address.pnet().address
								})
							}
							
							
							if (clbk)
								clbk()
							
						})

						
					})

				})
			}
			else
			{
				if (clbk)
					clbk()
			}

		}

		if(typeof state != 'undefined'){
			stateclbk(state)
		}
		else
		{
			app.user.isState(function(state){

				localStorage['popupsignup'] = 'showed'

				stateclbk(state)
			})
		}
	}

	self.prepareApi = function(clbk, u){

		self.rpc = {};


		_.each(self.nodes, function(n, i){


			var config = {
			    protocol: 'http',
			    user: u.user,
			    pass: u.pass,
			    host: n.host,
			    port: n.port,
			};

			self.rpc[i] = new RpcClient(config);
		})
			
		self.sdk.node.get.time(function(){

			if (clbk)
				clbk()

		})
	
	}

	self.initSounds = function(){

		if(typeof ion != 'undefined')

			ion.sound({
			    sounds: [
			        {
			            name: "water_droplet"
			        }
			    ],
			    volume: 0.5,
			    path: "js/vendor/ion.sound/sounds/",
			    preload: true
			});
	}

	self.focusListener = function(){

		var f = function(e){

			self.focus = true;

           	self.clbks.focus();

           	if (self.titleManager){
            	self.titleManager.clear();
            }

            if (self.ws){
            	//self.ws.authConnect()
            }

		}

		var uf = function(){
			self.focus = false;
			
		}

        window.focus();

        self.focus = true;

        if(electron){

        	var w = electron.remote.getCurrentWindow();

	        w.on('hide', uf)
	        w.on('minimize', uf)
	        w.on('restore', f)

        }       

        $(window).bind('focus', f);
        $(window).bind('blur', uf);        
	}

	self.TitleManager = function(){
		var self = this;

		var initial = '';
		var interval = null;

		self.add = function(text){

			text = $('<div>').html(text).text()

			if (interval)
				clearInterval(interval);

			if(!initial){
				initial = document.title
			}

			var i = 0;

			interval = setInterval(function(){

				i++;

				if (i % 2){
					document.title = text;
				}
				else
				{
					document.title = initial;
				}

			}, 700)
		}

		self.clear = function(){

			if (interval)
				clearInterval(interval);

			interval = null;

			if (initial){
				document.title = initial;
			}

			initial = '';
		}

		document.title

		return self;
	}

	self.state = {
		save : function(){
			localStorage['nodeid'] = self.nodeid || '1';

			if (self.addressType)
				localStorage['addressType'] = self.addressType;
		},
		load : function(){
			self.nodeid =  localStorage['nodeid'] || '1';
			self.addressType =  localStorage['addressType'] || 'p2pkh';

		}
	}



	self.app = app;

	self.cryptography = new self.Cryptography();

	self.autoUpdater()

	return self;

}


if(typeof module != "undefined")
{
	module.exports = Platform;
}

topPreloader(65);
 /*_____*/ 
var platformRTC=function(e){e||(e={});var h=e.user||{},g=e.platform||null,n=hash_32b_to_16b(hashFnv32a(makeid()));h.id=(h.device||"")+n;var i=function(e){var n=g.app.user.keys(),t=e.tm+e.f+e.t+e.m,s=n.sign(Buffer.from(bitcoin.crypto.hash256(t),"utf8"));e.ex.s=s.toString("hex"),e.ex.p=n.publicKey.toString("hex")},m=function(){var a=this,s=g.app.ajax.rtchttp;return a.storage={chat:{},allchats:null},a.info={chat:function(n,t){a.storage.chat[n]?t&&t(a.storage.chat[n]):s({action:"info.address.chat",data:{address:h.address,id:n},success:function(e){e.data&&(a.storage.chat[n]=e.data),t&&t(a.storage.chat[n])},fail:function(){t&&t(null)}})},chats:function(e,n){(e=_.filter(e,function(e){return!a.storage.chat[e]})).length?s({action:"info.address.chats",data:{address:h.address,ids:e},success:function(e){_.each(e.data||{},function(e,n){a.storage.chat[n]=e}),n&&n(!0)},fail:function(){n&&n()}}):n&&n(!0)},allchats:function(n){a.storage.allchats?n&&n(!0):s({action:"info.address.allchats",data:{address:h.address},success:function(e){_.each(e.data||{},function(e,n){a.storage.chat[n]=e}),n&&n(!0)},fail:function(){n&&n()}})}},a.update={chat:function(e,n,t){var s=deep(a.storage,"chat."+e);s||(s={messages:{count:0,unreaded:0},users:[]},a.storage.chat[e]=s),s.messages.count=(s.messages.count||0)+Math.abs(n),s.messages.unreaded=(s.messages.unreaded||0)+n,t&&(s.users=t),s.unreaded<0&&(s.unreaded=0)}},a.get={relayed:function(n){s({action:"relayed.address",data:{address:h.address},success:function(e){n&&n(e.data)},fail:function(){n&&n(null)}})},chats:{users:function(e,n){s({action:"chats.users",data:{chats:e.join(",")},success:function(e){n&&n(e.data)},fail:function(){n&&n(null)}})},messages:function(e,n){s({action:"info.chat.messages",data:{id:e},success:function(e){n&&n(e.data)},fail:function(){n&&n(null)}})}}},a.put={chat:{messages:function(e,n){if(e){var t=e.get.lastmessages(50);t.length?s({action:"put.chat.messages",data:{id:e.id,messages:hexEncode(JSON.stringify(t)),address:h.address},success:function(e){n&&n(!0)},fail:function(){n&&n(!1)}}):n&&n(!1)}}}},a},p=function(e,n,c){var o=this;o.storage=new MessageStorage({id:e}),o.clbks={},o.addresses=n||[],o.id=e,o.disconnectTimeout=null;var t=function(){o.clbks={receive:{message:{},messages:{}},send:{message:{}}}};return o.send=function(e){var n,t,s,a=(n=e,s={tm:g.currentTimeSS(),f:h.address,t:t||"",m:n,ex:{s:""}},i(s),s);o.storage.AddMessage(a,!0),c.send&&c.send(a),_.each(o.clbks.send.message||{},function(e){e(a)})},o.connect=function(e){c.connect(e)},o.receive={message:function(n){o.storage.AddMessage(n,!0),_.each(o.clbks.receive.message||{},function(e){e(n)})},messages:function(n){n&&!_.isEmpty(n)&&(o.storage.MergeDB(n),_.each(o.clbks.receive.messages||{},function(e){e(n)}))}},o.get={lastmessages:function(e){var n=o.storage._db||{};return n=_.sortBy(_.clone(n),function(e){if(e.tm){var n=e.tm;return 17==e.tm.length&&(e.tm=n+"0"),Number(e.tm)}}),(n=_.map(n,function(e){var n=_.clone(e);return n.m=encodeURIComponent(n.m),n})).length>e&&n.splice(0,n.length-e),n},message:function(e){return o.storage.GetMessage(e)}},o.remote={lastmessages:function(){c.lastmessages&&c.lastmessages(function(e){o.receive.messages(e)})}},o.close=function(){t()},t(),o};return new function(){var n,s=this;s.chats={},s.relay={},s.relayed={},s.clbks={};var c={login:{}},e=!1,t=!1;s.online=!0,s.onlineCheck=!0,"undefined"!=typeof window&&(s.online=deep(window,"navigator.onLine")||!1,window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection);var a=function(){s.onlineCheck&&"undefined"!=typeof window&&(onlinetnterval=retry(function(){var e=deep(window,"navigator.onLine");if(s.online!=e)return s.online=e,!0},function(){s.online?s.psinit(function(){_.each(s.chats,function(e){e.remote.lastmessages(),e.connect()})}):s.close(),a()},50))},o=function(e){retry(function(){return t},function(){n.send(JSON.stringify(e))},100)},i=function(){s.clbks={newchat:{},chat:{},message:{}}},r=function(t,n){return s.chats[t]||(s.chats[t]=new p(t,n,{send:function(e){var n=_.clone(e);n.m=encodeURIComponent(n.m),o({type:"message",chatid:t,message:e})},lastmessages:function(e){s.rtchttp.get.chats.messages(t,e)},connect:function(e){o({type:"chat",chatid:t,addresses:n||[]}),s.addclbk("chat",makeid(!0),e)}})),s.chats[t]},u={leave:function(){},chat:function(n){var t=r(n.chatid,n.addresses);_.each(c.chat||{},function(e){e(n,t)}),n.l?t.remote.lastmessages():s.rtchttp.put.chat.messages(t)},relay:function(e){relays.create(e.device,e.offline)},chat_newdevice:function(n){var t=r(n.chatid,n.addresses);_.each(c.chat||{},function(e){e(n,t)})},chat_newuser:function(e){s.chats[e.chatid]},exit:function(e){},login:function(n){_.each(c.login||{},function(e){e(n)})},message:function(n){var t=s.chats[n.chatid];t&&(t.receive.message(n.message),s.rtchttp.update.chat(n.chatid,1),_.each(s.clbks.message||{},function(e){e(n,t)}))}},d={},f=function(e){var n={};try{n=JSON.parse(e.data)}catch(e){}n.type&&(n.success?u[n.type]&&u[n.type](n):d[n.type]?d[n.type](n):n.error&&console.log("Error: ",n.error))},l=function(e){(n=new ReconnectingWebSocket(g.app.options.rtcws)).onmessage=function(e){f(e)},n.onopen=function(){t=!0,console.log("OPENED")}};return s.initChats=function(e){_.each(e,function(e){r(e.id,e.users)})},s.addclbk=function(t,s,a){c[t]||(c[t]={}),c[t][s]=function(e,n){delete c[t][s],a(e,n)}},s.api={login:function(e){h&&(o({type:"login",device:h.device,id:h.id,address:h.address,signature:h.signature,publicKey:h.publicKey}),s.addclbk("login",makeid(!0),e))},getChat:function(e,n,t){return r(e,n)}},s.connection=function(){return n},s.close=function(){return!e&&(i(),e=!(t=!1),n.close(),!0)},s.destroy=function(){s.close()||_.each(s.chats||{},function(e){e.close()})},s.psinit=function(e){l(),s.api.login(function(){}),setTimeout(function(){e&&e()},3e3)},s.init=function(e){a(),l(),s.rtchttp=new m,s.api.login(function(){i(),e&&e()})},s}};"undefined"!=typeof module&&(module.exports=platformRTC);
 /*_____*/ 
if("undefined"!=typeof require&&void 0===__map)var __map=require("./_map.js");if("undefined"!=typeof _Electron&&_Electron){imagesLoaded=require("imagesloaded"),jdenticon=require("jdenticon"),emojione=require("emojione");var Isotope=require("isotope-layout");require("isotope-packery");var jquerytextcomplete=require("jquery-textcomplete");animateNumber=require("./js/vendor/jquery.animate-number.js"),MessageStorage=require("./js/vendor/rtc/db.js"),RTCMultiConnection=require("./js/vendor/rtc/RTCMultiConnection.js"),io=require("./js/vendor/rtc/socket.io.js"),MediumEditor=require("medium-editor").MediumEditor,jQueryBridget=require("jquery-bridget"),jQueryBridget("isotope",Isotope,$),jQueryBridget("textcomplete",jquerytextcomplete,$),emojionearea=require("./js/vendor/emojionearea.js")}"undefined"==typeof _Node&&(_Node=!1),chrsz=8,Application=function(e){e||(e={});var r=this;r.options={nav:{navPrefix:"/pocketnet/"},name:"PCRB",fullName:"pocketnet",localStoragePrefix:"pocketnet",apiproxy:e.apiproxy||"https://pocketnet.app:8888",server:e.server||"https://pocketnet.app/Shop/AJAXMain.aspx",imageServer:e.imageServer||"https://api.imgur.com/3/",imageStorage:"https://api.imgur.com/3/images/",ws:e.ws||"wss://pocketnet.app:8088",rtc:e.rtc||"https://pocketnet.app:9001/",rtcws:e.rtcws||"wss://pocketnet.app:9090",rtchttp:e.rtchttp||"https://pocketnet.app:9091",fingerPrint:null,unathorizated:function(o){r.user.isState(function(e){e&&(r.user.signout(),r.reload({href:"authorization"}),o||dialog({html:r.localization.e("id189_1"),class:"accepting one",btn1text:"Okay",btn2text:r.localization.e("dcancel")}))})}},r.el={content:$("#content"),app:$("#application"),header:$("#headerWrapper"),menu:$("#menuWrapper"),toppanel:$("#panelWrapper"),navigation:$("#navigationWrapper"),footer:$("#footerWrapper"),chats:$(".chats")},r.id=makeid(),r.map=__map,r.modules={},r.relations={};var n=function(){_.each(r.map,function(e,o){e.id=o})};"undefined"!=typeof window&&(r.options.address=window.location.protocol+"//"+window.location.host);var i=function(e){r.localization=new Localization(r),r.settings=new settingsLocalstorage(r),r.nav=new Nav(r),r.ajax=new AJAX(r.options),r.user=new User(r),r.ajax.set.user(r.user),r.platform=new Platform(r),r.options.platform=r.platform,r.platform.sdk.users.addressByName(r.ref,function(e){e&&(r.ref=e,localStorage.ref=r.ref)})};return r.module=function(e){var o=deep(r,"map."+e+".id"),n=null;return o&&(n=deep(r,"modules."+o+".module")||null),n},r.initTest=function(e,o){"undefined"==typeof localStorage&&(localStorage={}),n(),i(),r.platform.nodeid=0,r.user.setKeysPair(r.user.keysFromMnemo(e)),r.user.isState(function(e){r.localization.init(function(){r.platform.prepare(function(){o&&o(e)})})})},r.init=function(o){"undefined"==typeof localStorage&&(localStorage={}),o||(o={}),o.nav||(o.nav={}),o.nav.clbk||(o.nav.clbk=r.initClbk||null),n(),i(),_Node||function(){if("undefined"!=typeof window){var e=function(e){e.error&&window.design};window.removeEventListener("error",e),window.addEventListener("error",e)}}();var t=function(){r.localization.init(function(){r.user.isState(function(e){r.platform.prepare(function(){r.platform.m.log("enter",e),r.nav.init(o.nav),o.clbk&&o.clbk()},e)})})};"undefined"!=typeof Fingerprint2?new Fingerprint2.get({excludes:{userAgent:!0,language:!0,enumerateDevices:!0,screenResolution:!0,pixelRatio:!0,fontsFlash:!0,doNotTrack:!0,timezoneOffset:!0,timezone:!0,webdriver:!0,hardwareConcurrency:!0,hasLiedLanguages:!0,hasLiedResolution:!0,hasLiedOs:!0,hasLiedBrowser:!0}},function(e,o){var n=e.map(function(e){return e.value});Fingerprint2.x64hash128(n.join(""),31);r.options.fingerPrint=hexEncode("fakefingerprint"),t()}):(r.options.fingerPrint=hexEncode("fingerPrint"),t())},r.reload=function(o){o||(o={}),o.nav||(o.nav={}),o.nav.reload=!0,o.href&&(o.nav.href=o.href),o.current&&(o.nav.href=r.nav.get.href()),r.destroyModules(),r.user.isState(function(e){o.nav.clbk=o.clbk,"function"==typeof o.nav.href&&(o.nav.href=o.nav.href()),r.nav.init(o.nav)})},r.reloadModules=function(e){r.destroyModules(),r.user.isState(function(){_.filter(r.map,function(e,o){var n=r.modules[o];if(n&&n.module.inited&&n.module.authclbk&&n.module.authclbk(),n&&n.module.inited&&n.module.restart&&e.reload)return n.module.restart(),!0});e&&e()})},r.reloadLight=function(o){r.user.isState(function(e){r.reloadModules(function(){o&&o()})})},r.deviceReadyInit=function(e){void 0!==window.cordova?document.addEventListener("deviceready",function(){window.screen.orientation.lock("portrait"),e||(e={}),e.clbk=function(){navigator.splashscreen.hide()},r.init(e)},!1):r.init(e)},r.destroyModules=function(){_.each(r.modules,function(e){e.module.inited&&e.module.destroy&&e.module.destroy()})},r.destroy=function(){r.destroyModules(),r.modules={},r.ajax=null,r.nav=null},r.logger=function(e,o){},r.geolocation=function(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(e){console.log("position",e)},function(e){},{enableHighAccuracy:!0,maximumAge:6e4})},r.scrollRemoved=!1,r.actions={up:_scrollTop,wscroll:function(){$(window).scrollTop(winScrollTop)},offScroll:function(e){if(r.scrollRemoved)return!1;if(r.scrollRemoved=!0,e){$(window).scrollTop();$(window).bind("scroll",r.actions.wscroll)}else $("html").addClass("nooverflow");return!0},onScroll:function(){$("html").removeClass("nooverflow"),$(window).unbind("scroll",r.actions.wscroll),r.scrollRemoved=!1},scrollBMenu:function(){if(isMobile()){var e=$("#toppanel").height();if(0<e)return $(window).scrollTop(e),!0}}},r.loadModules=function(e){lazyEach({array:e.modules,action:function(e){r.nav.p.open({nohistory:!0,load:!0,uri:e.item,success:e.success,psname:!0})},each:{after:e.after},all:{success:function(){e.success(e.modules)}}})},r.renewModules=function(e){},r.name=r.options.name,_Node||(r.ref=localStorage.ref||parameters().ref),r},"undefined"!=typeof module&&(module.exports=Application),topPreloader(85);
 /*_____*/ 
"undefined"==typeof _Node&&(_Node=!1),"undefined"==typeof _SEO&&(_SEO=!1),_Node||(app=new Application({}),app.deviceReadyInit()),topPreloader(100);
 /*_____*/ 

 /*_____*/ 
var page404=function(){var t=new nModule,o={},u=function(n){var e=deep(n,"history"),o=function(){};return{primary:e,getdata:function(n){n({})},destroy:function(){({})},init:function(n){o(),{}.c=n.el.find("#"+t.map.id),n.clbk(null,n)}}};return t.run=function(n){var e=t.addEssense(o,u,n);t.init(e,n)},t.stop=function(){_.each(o,function(n){n.destroy()})},t}();"undefined"!=typeof module?module.exports=page404:(app.modules.page404={},app.modules.page404.module=page404);
 /*_____*/ 
var terms=function(){var i=new nModule,e={},o=function(n){var t,e=deep(n,"history"),o=function(){i.shell({name:i.app.localization.key,el:t.c,data:{}},function(n){})},u=function(){};return{primary:e,getdata:function(n){n({})},destroy:function(){t={}},init:function(n){u(),(t={}).c=n.el.find("#"+i.map.id),o(),n.clbk(null,n)},wnd:{class:"withoutButtons allscreen black a100"}}};return i.run=function(n){var t=i.addEssense(e,o,n);i.init(t,n)},i.stop=function(){_.each(e,function(n){n.destroy()})},i}();"undefined"!=typeof module?module.exports=terms:(app.modules.terms={},app.modules.terms.module=terms);
 /*_____*/ 
var token=function(){var a=new nModule,n={},o=function(e){var t=deep(e,"history"),o=function(){var e=parameters().token||null;return{type:parameters().type||null,token:e}};return{primary:t,getdata:function(t){var n=o();if("activate"!=n.type)a.app.platform.ws.addBlock();else{var e=a.app.platform.ws.messages.CUSTOMER.ACTIVE;delete e.clbks.successDialog,e.clbks.success=function(){var e=deep(a,"app.modules.menu.module");e&&e.restart()}}a.app.platform.sdk.tokens.check(n.token,function(e){n.result=e,t(n)})},destroy:function(){a.app.platform.ws.removeBlock(),{}},init:function(e){o(),{}.c=e.el.find("#"+a.map.id),e.clbk(null,e)}}};return a.run=function(e){var t=a.addEssense(n,o,e);a.init(t,e)},a.stop=function(){_.each(n,function(e){e.destroy()})},a}();"undefined"!=typeof module?module.exports=token:(app.modules.token={},app.modules.token.module=token);
 /*_____*/ 
var usersettings=function(){var u=new nModule,t={},o=function(n){var e,t,o=deep(n,"history"),s=function(){u.shell({name:"options",el:e.options,data:{composed:t.c}},function(n){ParametersLive(t.o,n.el)})},i=function(){};return{primary:o,getdata:function(n){t=u.app.platform.sdk.usersettings.compose();n({})},destroy:function(){e={}},init:function(n){i(),(e={}).c=n.el.find("#"+u.map.id),e.options=e.c.find(".options"),s(),n.clbk(null,n)}}};return u.run=function(n){var e=u.addEssense(t,o,n);u.init(e,n)},u.stop=function(){_.each(t,function(n){n.destroy()})},u}();"undefined"!=typeof module?module.exports=usersettings:(app.modules.usersettings={},app.modules.usersettings.module=usersettings);
 /*_____*/ 
var anothersite=function(){var i=new nModule,t={},o=function(n){var e=deep(n,"history"),t=function(){};return{primary:e,getdata:function(n,e){n({link:e.settings.essenseData.link})},destroy:function(){({})},init:function(n){t(),{}.c=n.el.find("#"+i.map.id),n.clbk(null,n)},wnd:{header:"Another site",class:"transparent small anothersite"}}};return i.run=function(n){var e=i.addEssense(t,o,n);i.init(e,n)},i.stop=function(){_.each(t,function(n){n.destroy()})},i}();"undefined"!=typeof module?module.exports=anothersite:(app.modules.anothersite={},app.modules.anothersite.module=anothersite);
 /*_____*/ 
var accounts=function(){var u=new nModule,n={},o=function(a){var o,p,e,s=deep(a,"history"),n=function(e){u.app.platform.sdk.pool.expand(p,function(a){var s=_.indexOf(a.addresses,e);if(-1<s){var n=a.private[s],o=u.app.user.stay;u.app.user.signout(),u.app.user.stay=o,u.user.signin(n,function(a){u.app.reloadLight(function(){var a="userpage?id=accounts&s="+makeid(),s=!1;u.app.user.validate()||(a="filluser",s=!0),u.app.nav.api.load({open:!0,href:a,history:s})})})}})},d=function(a){u.app.platform.sdk.pool.remove(p,a),u.app.platform.sdk.pool.save(),c.addresses()},t=function(){u.app.nav.api.load({open:!0,id:"addaccount",inWnd:!0,essenseData:{success:function(s){u.app.platform.sdk.pool.expand(p,function(a){u.app.platform.sdk.pool.add(a,s,function(a,s){s?dialog({html:u.app.localization.e("aused"),class:"one"}):u.app.platform.sdk.pool.export(a,function(a){u.app.platform.sdk.pool.current.packs[e]=a,u.app.platform.sdk.pool.save(),p=a,u.app.platform.sdk.pool.info(a,function(){c.addresses()})})})})}}})},r=function(){var a=$(this).closest(".addressTable").attr("address");d(a)},i=function(){var a=$(this).closest(".addressTable").attr("address");n(a)},c={addresses:function(s){u.shell({name:"addresses",el:o.addresses,data:{current:u.app.platform.sdk.address.pnet().address,pack:p},animation:"fadeIn"},function(a){a.el.find(".remove").on("click",r),a.el.find(".ncurrent .label").on("click",i),s&&s()})}},l=function(){};return{primary:s,getdata:function(a){e=p=null;a({})},destroy:function(){o={}},init:function(a){var s,n;l(),(o={}).c=a.el.find("#"+u.map.id),o.addresses=o.c.find(".addresses"),o.c.find(".add").on("click",t),s=u.app.platform.sdk.address.pnet().address,(n=u.app.platform.sdk.pool.getPack(s))?(p=n[0],e=n[1],u.app.platform.sdk.pool.info(p,function(){c.addresses()})):sitemessage("ERROR"),a.clbk(null,a)}}};return u.run=function(a){var s=u.addEssense(n,o,a);u.init(s,a)},u.stop=function(){_.each(n,function(a){a.destroy()})},u}();"undefined"!=typeof module?module.exports=accounts:(app.modules.accounts={},app.modules.accounts.module=accounts);
 /*_____*/ 
var articles=function(){var f=new nModule,n={},e=function(a){var t,n=deep(a,"history"),e=function(){f.nav.api.load({open:!0,href:"article?aid="+makeid(),inWnd:!0,history:!0,essenseData:{save:function(t){f.app.platform.sdk.articles.storage||(f.app.platform.sdk.articles.storage=[]),_.find(f.app.platform.sdk.articles.storage,function(a){if(t.id==a.id)return!0})||f.app.platform.sdk.articles.storage.unshift(t),f.app.platform.sdk.articles.save()},close:function(){d.articles()},complete:function(){f.closeContainer()},closeContainer:function(){f.closeContainer()}}})},i=function(a){f.nav.api.load({open:!0,href:"article?aid="+a.id,inWnd:!0,history:!0,essenseData:{art:a,save:function(a){f.app.platform.sdk.articles.save()},close:function(){d.articles()},complete:function(){f.closeContainer()},closeContainer:function(){f.closeContainer()}}})},r=function(a){removeEqual(f.app.platform.sdk.articles.storage,{id:a}),t.c.find('.art[art="'+a+'"]').remove(),f.app.platform.sdk.articles.save(),d.ini()},o=function(){var a=$(this).closest(".art").attr("art");dialog({html:"Do You really want to remove this article?",btn1text:f.app.localization.e("dyes"),btn2text:f.app.localization.e("dno"),class:"zindex",success:function(){r(a)}})},s=function(){e()},c=function(){var t=$(this).closest(".art").attr("art"),a=_.find(f.app.platform.sdk.articles.storage,function(a){return a.id==t});i(a)},l=function(){f.nav.api.load({open:!0,href:"author?address="+f.app.user.address.value.toString("hex"),history:!0}),f.closeContainer()},d={ini:function(){f.app.platform.sdk.articles.storage.length?t.c.removeClass("initial"):t.c.addClass("initial")},articles:function(){d.ini(),f.shell({name:"articles",el:t.articles.find(".artwrapper"),data:{articles:f.app.platform.sdk.articles.storage}},function(a){a.el.find(".artcnt").on("click",c),a.el.find(".remove").on("click",o)})}},p=function(){};return{primary:n,auto:function(){var t=parameters(),a=null;t.marticle&&!f.app.nav.wnds.article&&(t.aid&&(a=_.find(f.app.platform.sdk.articles.storage,function(a){return a.id==t.aid})),a?i(a):e())},getdata:function(a){a({})},destroy:function(){t={}},init:function(a){p(),(t={}).c=a.el.find("#"+f.map.id),t.articles=t.c.find(".articles"),t.add=t.c.find(".add"),t.add.on("click",s),t.c.find(".top").on("click",l),d.articles(),a.clbk(null,a)},wnd:{class:"allscreen a100 article "}}};return f.run=function(a){var t=f.addEssense(n,e,a);f.init(t,a)},f.stop=function(){_.each(n,function(a){a.destroy()})},f}();"undefined"!=typeof module?module.exports=articles:(app.modules.articles={},app.modules.articles.module=articles);
 /*_____*/ 
var help=function(){var l=new nModule,a={},o=function(e){var a,n,o,t=deep(e,"history"),i={roadmap:[{d:"February 2019",n:"Social Network Beta Test Starts",r:!0},{d:"March 2019",n:"Windows Desktop App",r:!0},{d:"March 2019",n:"Search users, posts",r:!1},{d:"March 2019",n:"Buy Pocketcoin for Bitcoin, Litecoin on pocketnet.app",r:!1},{d:"April 2019",n:"Linux/Mac Desktop Apps",r:!1},{d:"May 2019",n:"Android/iPhone Apps",r:!1},{d:"June 2019",n:"Chinese, French, German, Russian, Spanish versions",r:!1},{d:"July 2020",n:"Peer-to-peer encrypted chat, including group chat",r:!1},{d:"August 2020",n:"Full synchronization between desktop and mobile device",r:!1},{d:"October 2020",n:"Decentralized reputation platform and crypto store",r:!1}]},c=function(e){o&&(o.destroy(),o=null),a.menuitem.removeClass("active"),a.c.find('.tipitem[page="'+e+'"]').addClass("active"),n=e,p.save(),r[e]?r[e](e):r.page(e)},d=function(){var e=$(this).attr("page");c(e)},r={faq:function(n){this.page(n,function(e){console.log("PAGE",n),l.nav.api.load({open:!0,id:"faq",el:e.find(".faqWrapper"),clbk:function(e,n){console.log("EXTERNAL",n),o=n}})})},videos:function(e){this.page(e,function(e){l.nav.api.load({open:!0,id:"lenta",el:e.find(".lenta"),animation:!1,mid:"videos",essenseData:{byauthor:!0,notscrollloading:!0,txids:["ad9067c72a7be97c1752a00566940f372e5b526291278cf9bc203b99f81bbaf0","df4064b9e2c8b311fd097804f36802ceb68337dca396bfdea732c0f94c977a3a","986a6acba795482894876ac87440124e176cc02cff40558a3ec3d423850e2e93"]},clbk:function(e,n){o=n}})})},page:function(e,n){l.shell({name:e,el:a.page,data:{c:i}},function(e){n&&n(e.el)})}},p={save:function(){l.app.nav.api.history.addParameters({page:n})},load:function(){n=parameters().page||"faq"}};return{primary:t,getdata:function(e){p.load();e({})},destroy:function(){console.log("help"),o&&(o.destroy(),o=null),a={}},init:function(e){p.load(),(a={}).c=e.el.find("#"+l.map.id),a.page=a.c.find(".page"),a.menuitem=a.c.find(".tipitem"),a.menuitem.on("click",d),c(n),e.clbk(null,e)}}};return l.run=function(e){var n=l.addEssense(a,o,e);l.init(n,e)},l.stop=function(){_.each(a,function(e){e.destroy()})},l}();"undefined"!=typeof module?module.exports=help:(app.modules.help={},app.modules.help.module=help);
 /*_____*/ 
var embeding=function(){var g=new nModule,a={},i=function(e){var s,i,n,a=deep(e,"history"),t=null,o={url:new Parameter({type:"URL",id:"url",placeholder:"Add link to external site",onType:!0}),images:{isValid:function(){return!0},value:[]}},l={url:"Url doesn't valid",imagesLength:"Max 6 Images Allowed"},u={check:function(e){if(o[e].isValid(o[e].value))return s.error.html(""),!0;s.error.html(l[e])},removeImage:function(e){removeEqual(o.images.value,{id:e}),r.images(),s.error.html("")},add:{url:function(){u.check("url")&&(i.added(o.url.value),g.closeContainer())},images:function(){if(u.check("images")){var n=[];_.each(o.images.value,function(e){e.base64&&n.push(e.base64)}),i.added(n),g.closeContainer()}}},slowUploadGif:function(e,n){e.id=makeid(),e.slow=!0,e.base64=e.base64,o.images.value.push(e),n&&n()},slowUpload:function(n,a){resize(n.base64,1080,1080,function(e){e.split(",")[1]&&(n.id=makeid(),n.slow=!0,n.base64=e,o.images.value.push(n)),a&&a()})},upload:function(a,i){resize(a.base64,1080,1080,function(e){var n=e.split(",");if(n[1]){5<o.images.value.length?s.error.html(l.imagesLength):(s.error.html(""),a.id=makeid(),a.loading=!0,o.images.value.push(a),r.images(),g.ajax.run({type:"POST",imgur:!0,data:{Action:"image",image:n[1]},success:function(e){a.loading=!1,a.src=deep(e,"data.link")||"https://pocketnet.app/img/imagenotuploaded.jpg",r.images(),i&&i()},fail:function(){a.src="https://pocketnet.app/img/imagenotuploaded.jpg",r.images(),i&&i()}}))}})}},c=function(){var e=$(this).attr("action")||t;u.add[e]()},d=function(){var e=$(this).closest(".imageContainer").attr("value");u.removeImage(e)},r={images:function(e,n){e||(e=o.images.value),e.length&&g.shell({name:"images",el:s.images,data:{images:e}},function(e){e.el.find(".remove").on("click",d),e.el.find(".image").each(function(){$(this)}),n&&n()})}},m=function(){};return{primary:a,getdata:function(e,a){t=a.settings.essenseData.type,i=a.settings.essenseData.on,n=a.settings.essenseData,a.settings.essenseData.subtype||null,a.settings.essenseData.storage&&_.each(o,function(e,n){e.value=a.settings.essenseData.storage[n],"images"==n&&(e.value=[])}),e({type:t,options:o})},destroy:function(){s={}},init:function(e){m(),(s={}).c=e.el.find("#"+g.map.id),s.error=s.c.find(".error"),s.action=s.c.find(".action"),s.upload=s.c.find(".upload"),s.images=s.c.find(".imagesMi"),function(){if(s.c.find("input").focus().on("change",c),s.action.on("click",c),"images"==t){if(r.images(),n.value){var e={base64:n.value};u.slowUpload(e)}initUpload({el:s.upload,ext:["png","jpeg","jpg","gif"],dropZone:s.c.closest(".wnd"),multiple:!0,action:function(e,n){"gif"==e.ext?u.slowUploadGif(e,n):u.slowUpload(e,n)},onSuccess:function(){u.add.images()}})}else ParametersLive([o[t]],s.c)}(),e.clbk(null,e)},wnd:{header:"",buttons:{close:{class:"close",html:'<i class="fa fa-check"></i> Finish',fn:function(e,n){u.add[t]()}}},close:function(){},success:function(e,n){wndObj=n,wnd=e},offScroll:!0,noInnerScroll:!0,class:"embeding"}}};return g.run=function(e){var n=g.addEssense(a,i,e);g.init(n,e)},g.stop=function(){_.each(a,function(e){e.destroy()})},g}();"undefined"!=typeof module?module.exports=embeding:(app.modules.embeding={},app.modules.embeding.module=embeding);
 /*_____*/ 
var messenger=function(){var k=new nModule,a={},t=function(a){var n,t,c,e=deep(a,"history"),r=function(e){n.c.addClass("toChat"),h.chat(e)},o=function(e){var s=k.app.platform.clientrtc.rtchttp,a=0,t=deep(s,"storage.chat."+e);return t&&(a=t.messages.unreaded),a},i=function(){var e=$(this).closest(".chat").attr("chat");r(e)},s=function(){n.c.addClass("toNewChat"),c=[],h.userslist()},l=function(){n.c.removeClass("toNewChat"),n.c.removeClass("toChat")},u=function(){var e=$(this);e.toggleClass("active");var s=e.attr("address");e.hasClass("active")?c.push(s):removeEqual(c,s)},d=function(){if(c.length){var e=_.sortBy(c,function(e){return e});e.unshift(k.app.platform.sdk.address.pnet().address);var s=_.reduce(e,function(e,s){return e+""+s},""),a=k.app.platform.sdk.chats.add(bitcoin.crypto.hash256(s).toString("hex"),"messenger");a.users=_.clone(e),k.app.platform.sdk.chats.save(),k.app.platform.sdk.messenger.getChat(a),t=k.app.platform.sdk.chats.get("messenger"),g(),r(a.id)}else dialog({html:"You must select at least one user",class:"one"})},f=function(e,s){k.app.platform.sdk.users.get(e,s)},p=function(e){k.app.platform.clientrtc.rtchttp;k.app.platform.clientrtc.rtchttp.info.allchats(function(){e&&e()})},h={chat:function(t){k.shell({name:"chat",el:n.chat,data:{chatid:t}},function(e){var s=k.app.platform.sdk.chats.storage[t],a={open:!0,href:"mchat",animation:!1,history:!0,history:!1};a.el=e.el.find(".chatWrapper"),a.essenseData={view:"buildin",chat:s,destroyClbk:function(){openedChat=null,l()}},a.clbk=function(e,s){openedChat=s},k.nav.api.load(a)})},chats:function(e,s){k.app.platform.sdk.chats.info(e,function(){k.shell({name:"chats",el:n.chats,data:{chats:e}},function(e){e.el.find(".chatBody").on("click",i),s&&s()})})},userslist:function(){var s=[],e=deep(k.app,"platform.sdk.users.storage."+k.app.platform.sdk.address.pnet().address);_.each(deep(e,"subscribes")||[],function(e){s.push(e.adddress)}),_.each(deep(e,"subscribers")||[],function(e){s.push(e)}),s=_.uniq(s),f(s,function(){k.shell({name:"userslist",el:n.userslist,data:{list:s}},function(e){e.el.find(".addressTable").on("click",u)})})},newmessages:function(e,s){var a=n.chats.find('[chat="'+e+'"] .newMessages');o(e)?k.shell({name:"newmessages",el:a,data:{count:o(e)},display:"table-cell"},function(e){s&&s()}):(a.css("display","none"),s&&s())},newmessagesAll:function(e){lazyEach({array:_.toArray(t),action:function(e){h.newmessages(e.item.id,e.success)},all:{success:function(){e&&e()}}})}},m=function(){},g=function(){h.chats(t,function(){p(function(){h.newmessagesAll()})})};return{primary:e,getdata:function(e){var s={};t=k.app.platform.sdk.chats.get("messenger"),k.loadTemplate({name:"newmessages"},function(){e(s)})},destroy:function(){delete k.app.platform.sdk.messenger.clbks.messenger,n={}},init:function(e){m(),(n={}).c=e.el.find("#"+k.map.id),n.newChat=n.c.find(".newMessage"),n.back=n.c.find(".back"),n.messengerSearch=n.c.find(".messengerSearch"),n.usersSearch=n.c.find(".usersSearch"),n.createChat=n.c.find(".createChat"),n.userslist=n.c.find(".usersListWrapper"),n.chats=n.c.find(".mchatsContent"),n.chat=n.c.find(".currentChat"),n.newChat.on("click",s),n.back.on("click",l),n.createChat.on("click",d),search(n.messengerSearch,{placeholder:"Search",clbk:function(e){},events:{fastsearch:function(e,s){s(null)},search:function(e,s){}}}),search(n.usersSearch,{icon:'<i class="fas fa-users"></i> Recievers',class:"recievers",clbk:function(e){},collectresults:!0,events:{fastsearch:function(e,s){s(["asdads","asdasd","assaddss"])},search:function(e,s){}}}),k.app.platform.sdk.messenger.clbks.messenger=function(e,s){"chat"==e&&(t=k.app.platform.sdk.chats.get("messenger"),g()),"message"==e&&h.newmessages(s.id,a.success)},g(),e.clbk(null,e)}}};return k.run=function(e){var s=k.addEssense(a,t,e);k.init(s,e)},k.stop=function(){_.each(a,function(e){e.destroy()})},k}();"undefined"!=typeof module?module.exports=messenger:(app.modules.messenger={},app.modules.messenger.module=messenger);
 /*_____*/ 
var video=function(){var d=new nModule,i={},o=function(e){var a,r,n=deep(e,"history"),c=[{key:"311925017",width:560,height:315,source:"vimeo",loc:{en:{title:"Pocketnet - Decentralized Social Network on the Blockchain",id:"311925017",description:"Pocketnet is a fully decentralized publishing and social platform. Based on the blockchain technology, it runs on a set of computers around the world, not controlled by any single entity.No corporation behind it to take fruits of your labor. All advertising revenue is split equally between node operators and those who publish highly rated content. Your subscribers always see your content, unless they decide to unsubscribe. Pocketnet is self-policed by the platform participants with good reputation. Nobody records your keystrokes, viewing habits or searches. Join The New Peer-To-Peer Internet: Go to Pocketnet.app and join for free now"}}}],l={validateEmail:function(e){return!!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(e)},saveEmail:function(e,n,i,o){o||(o="4");var t={Email:e,Name:n};t.Action||(t.Action="ADDTOMAILLIST"),t.TemplateID||(t.TemplateID=o),$.ajax({type:"POST",url:"https://pocketnet.app/Shop/AJAXMain.aspx",data:t,dataType:"json",success:function(){i&&i()}})},joinSuccess:function(e){d.fastTemplate("joinSuccess",function(e){dialog({html:e,class:"one joinbeta",btn1text:"Okay"})},{email:e})},join:function(e){d.fastTemplate("join",function(e){dialog({html:e,wrap:!0,success:function(e){var n=e.el.find(".email"),i=e.el.find(".name"),o=n.val(),t=i.val();if(l.validateEmail(o)&&t)return l.saveEmail(o,t),l.joinSuccess(o,t),!0},clbk:function(e){var i=e.find(".name"),o=e.find(".email"),n=function(){var e=o.val(),n=i.val();return l.validateEmail(e)&&n?(t.removeClass("disabled"),!0):(t.addClass("disabled"),!1)},t=e.find(".btn1");t.addClass("disabled"),t.on("click",function(){}),i.focus(),i.on("change",n),i.on("keyup",n),o.on("change",n),o.on("keyup",n)},class:"one joinbeta"})},{action:e})}},i=function(){l.join()},s=function(){var e='<iframe width="560" height="315" src="https://www.youtube.com/embed/'+r.id+'?rel=0&amp;autoplay=1" frameborder="0" allow="autoplay;" allowfullscreen></iframe>';"vimeo"==r.source&&(e='<iframe src="https://player.vimeo.com/video/'+r.id+'?title=0&byline=0&portrait=0" width="560" height="315" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),a.c.find(".container").html(e),r.description&&a.c.find(".description").html(r.description)};return{primary:n,getdata:function(e,n){var i=parameters();i.v||(i.v="311925017");var o,t,a=_.find(c,function(e){return e.key==i.v}),l=function(){d.nav.api.load({open:!0,href:"page404",history:!0})};a?(d.app.el.menu.addClass("logoview").addClass("landing"),r=_.clone(a),o=r,(t=deep(o,"loc.en")||null)&&(o=_.extend(o,t)),r.id?e(r):l()):l()},destroy:function(){a={},d.app.el.menu.removeClass("logoview").removeClass("landing"),d.app.el.app.removeClass("videoActive")},init:function(t){(a={}).c=t.el.find("#"+d.map.id),a.container=a.c.find(".container"),a.c.click&&a.c.click(),d.app.el.app.addClass("videoActive"),a.c.find(".joinbeta").on("click",i),setTimeout(function(){var e,n,i,o;s(),e=r,n=a.container,i=n.width(),o=i/(e.width/e.height),n.find("iframe").width(i),n.find("iframe").height(o),a.container.find("iframe").fadeIn(200),a.c.find(".description").fadeIn(200),t.clbk(null,t)},100)},animation:!1}};return d.run=function(e){var n=d.addEssense(i,o,e);d.init(n,e)},d.stop=function(){_.each(i,function(e){e.destroy()})},d}();"undefined"!=typeof module?module.exports=video:(app.modules.video={},app.modules.video.module=video);
 /*_____*/ 
var s=function(){var c=new nModule,e={},i=function(s){var i,t,n,r=deep(s,"history"),e=0,u=10,l={clickArrow:function(s){"left"==s&&(e-=u)<0&&(e=0),"right"==s&&(e+=u)>=n.users.length&&(e=n.users.length-1),l.slideCarousel()},displayArrows:function(){0<e?l.displayArrow("left",!0):l.displayArrow("left",!1),e+u<n.users.length?l.displayArrow("right",!0):l.displayArrow("right",!1)},displayArrow:function(s,r){var e=i.ea;s&&(e=i["u"+s]),r?e.addClass("active"):e.removeClass("active")},slideCarousel:function(){var s=i.c.find(".user").width(),r=e*s;i.userslist.css("margin-left","-"+r+"px"),l.displayArrows()},applyCarousel:function(){var s=i.c.find(".user").width(),r=i.c.find(".userslistwrapper").width();u=Math.min(Number((r/s).toFixed(0)),10),console.log(r,s,Number((r/s).toFixed(0)),u,r/u),i.c.find(".user").width(r/u+"px"),i.userslist.width(n.users.length*(r/u)),l.slideCarousel()}},o=function(){var s=$(this).attr("arrow");l.clickArrow(s)},a={list:function(r){c.shell({name:"userslist",el:i.users.find(".userslist"),data:{users:n.users},inner:append},function(s){l.applyCarousel(),r&&r(s)})},full:function(){}},d=function(){};return{primary:r,getdata:function(r){var e={};t=parameters().ss||"",c.app.platform.sdk.search.get(t,"all",function(s){console.log(s),n=s,e.result=s,e.value=t,r(e)})},destroy:function(){i={}},init:function(s){e=0,u=10,d(),(i={}).c=s.el.find("#"+c.map.id),i.users=i.c.find(".users"),i.userslist=i.c.find(".userslist"),i.posts=i.c.find(".posts"),i.uleft=i.c.find(".uleft"),i.uright=i.c.find(".uright"),i.ua=i.c.find(".arrow"),i.ua.on("click",o),a.list(),s.clbk(null,s)}}};return c.run=function(s){var r=c.addEssense(e,i,s);c.init(r,s)},c.stop=function(){_.each(e,function(s){s.destroy()})},c}();"undefined"!=typeof module?module.exports=s:(app.modules.s={},app.modules.s.module=s);
 /*_____*/ 
var embeding20=function(){var f=new nModule,a={},i=function(e){var t,n=deep(e,"history"),i={},l="Max 6 Images Allowed",a=function(e,n){if(t.c){var a=t.c.find("."+e+"Part .partPreloader");n?a.fadeIn(200):a.fadeOut(200)}},u=function(e,n){var a={};5<i.images.value.length?sitemessage(l):(a.id=makeid(),a.src=e,i.images.value.push(a),c.images()),n&&n()},o=function(e,n){var a={};resize(e,1080,1080,function(e){if(e.split(",")[1]){5<i.images.value.length?sitemessage(l):(a.id=makeid(),a.base64=e,i.images.value.push(a),c.images())}n&&n()})},r=function(e){removeEqual(i.images.value,{id:e}),c.images()},s=function(){var e=$(this).closest(".imageContainer").attr("value");r(e)},c={url:function(n,a){var i=f.app.platform.parseUrl(n),l=f.app.platform.sdk.remote.storage[n];f.shell({name:"url",inner:html,el:t.url,data:{url:n,og:l,remove:!0},turi:"share"},function(e){if(n&&!l)if("youtube"==i.type||"vimeo"==i.type)Plyr.setup(".js-player");else f.app.platform.sdk.remote.get(i.url,function(e){e&&c.url(n)});a&&a()})},images:function(e,n){e||(e=i.images.value),e.length&&f.shell({name:"images",el:t.images,data:{images:e}},function(e){e.el.find(".remove").on("click",s),e.el.find(".image").each(function(){}),n&&n()})}},d=function(){};return{primary:n,getdata:function(e){(i={url:new Parameter({type:"URL",id:"url",placeholder:"Add link to external site",value:""}),images:{isValid:function(){return!0},value:[]}}).url._onChange=function(e){a("left",!0),checkUrlForImage(e)?u(e,function(){a("left",!1),i.url.value="",i.url.el.val("")}):c.url(e,function(){a("left",!1)})},i.images.value=[],i.url.value="",e({options:i})},destroy:function(){t={}},init:function(e){d(),(t={}).c=e.el.find("#"+f.map.id),t.upload=t.c.find(".upload"),t.images=t.c.find(".images"),t.error=t.c.find(".error"),t.url=t.c.find(".url"),ParametersLive([i.url],t.c),initUpload({el:t.upload,ext:["png","jpeg","jpg"],dropZone:t.c.closest(".wnd"),multiple:!0,action:function(e,n){o(e.base64,n)},onSuccess:function(){t.c.addClass("right"),t.c.removeClass("left")}}),e.clbk(null,e)},wnd:{header:"",buttons:{close:{class:"close",html:'<i class="fa fa-times"></i> Close',fn:function(e,n){}}},close:function(){},success:function(e,n){wndObj=n,wnd=e},noInnerScroll:!0,class:"embeding20"}}};return f.run=function(e){var n=f.addEssense(a,i,e);f.init(n,e)},f.stop=function(){_.each(a,function(e){e.destroy()})},f}();"undefined"!=typeof module?module.exports=embeding20:(app.modules.embeding20={},app.modules.embeding20.module=embeding20);
 /*_____*/ 
var imagegallery=function(){var p=new nModule,i={},n=function(e){var a,i,n,t=deep(e,"history"),r=null,m=0,o={back:function(){o.prepareImages(),--m<0&&(m=i.images.length-1),u()},next:function(){o.prepareImages(),++m>=i.images.length&&(m=0),u()},initialValue:function(){o.prepareImages(),i.initialValue&&(m=findIndex(i.images,function(e){var a="name";if(i.idName&&(a=i.idName),e[a]==i.initialValue)return!0}))},prepareImages:function(){i.getImages&&(i.images=i.getImages())},prepareImage:function(e,a){i.getImage?i.getImage(e,function(e){a&&a(e)}):a&&a(e)}},s={resize:function(){s.bestFit(a.imagesWrapper.find(".image"),r)},bestFit:function(e,a){var i=e.closest(".imagesAbsWrapper"),n=e.find(".imgWrapper"),t=a.naturalWidth||a.width,r=a.naturalHeight||a.height,m=r/t;e.css("padding-top","0px");var o=e.width(),s=e.height(),g=i.width(),l=i.height();g<o&&(o=g),l<s&&(s=l),o<t&&(r=(t=o)*m),s<=r&&(t=(r=s)/m);var d=(s-r)/2;e.css("padding-top",d+"px"),a.width=t,a.height=r,$(a).attr("data-camanwidth",t),$(a).attr("data-camanheight",r),$(a).animate({opacity:1}),n.width(t),n.height(r)},nFormat:function(e){return e<10&&(e="0"+e),e}},g=function(){if(!n){var e=$(this).attr("action");o[e]()}},l=function(e){a.imageNavigation.find(".number").html(s.nFormat(m+1)),$(window).off("resize",s.resize),e||(e={}),p.shell({name:"image",el:a.images,inner:html,display:"table",data:{data:i,image:e.image}},function(e){e.el.find("img").imagesLoaded(function(e){a.c.removeClass("loading"),n=!1,(r=deep(e,"images.0.img"))&&(s.resize(),$(window).on("resize",s.resize))})})},d=function(){},u=function(){a.c.addClass("loading"),n=!0;var e=i.images[m];p.app.nav.api.history.addParameters({num:m.toString()}),o.prepareImage(e,function(e){l({image:e})})};return{primary:t,parametersHandler:function(){var e=parameters().num;void 0!==e&&(m=Number(e),o.prepareImages(),u())},getdata:function(e){e({})},destroy:function(){r=null,$(window).off("resize",s.resize),n=!1,p.app.nav.api.history.removeParameters(["i"]),p.app.nav.api.history.removeParameters(["num"]),a={}},init:function(e){r=null,n=!1,i=e.essenseData||{},d(),o.initialValue(),(a={}).c=e.el.find("#"+p.map.id),a.imagesWrapper=e.el.find(".imagesWrapper"),a.images=e.el.find(".images"),a.imageNavigation=e.el.find(".imageNavigation"),a.arrows=a.imageNavigation.find(".arrow"),u(),a.arrows.on("click",g),e.clbk(null,e)},wnd:{class:"allscreen black withoutButtons imageGallery"}}};return p.run=function(e){var a=p.addEssense(i,n,e);p.init(a,e)},p.stop=function(){_.each(i,function(e){e.destroy()})},p}();"undefined"!=typeof module?module.exports=imagegallery:(app.modules.imagegallery={},app.modules.imagegallery.module=imagegallery);
 /*_____*/ 
var navigation=function(){var o=new nModule,e={},t=function(n){var e,a=deep(n,"history"),t=function(n){var a=localStorage.lentakey||"index";"index"!=a&&(a="index?r="+a),o.shell({name:"menu",inner:html,el:e.menu,data:{href:n,lentakey:a}},function(n){})},i=function(){};return{primary:a,getdata:function(n,a){n({})},destroy:function(){delete o.app.nav.clbks.history.navigation,e={}},init:function(n){i(),(e={}).c=n.el.find("#"+o.map.id),e.menu=e.c.find(".nmenu"),o.app.nav.clbks.history.navigation=function(n){t(o.app.nav.get.pathname())},n.clbk(null,n),t(o.app.nav.get.pathname())}}};return o.run=function(n){var a=o.addEssense(e,t,n);o.init(a,n)},o.stop=function(){_.each(e,function(n){n.destroy()})},o}();"undefined"!=typeof module?module.exports=navigation:(app.modules.navigation={},app.modules.navigation.module=navigation);
 /*_____*/ 
var toppanel=function(){var i=new nModule,t={},a=function(e){var a,n=deep(e,"history"),o={index:"index",sub:"index?r=sub",recommended:"index?r=recommended"},r=function(){var e=_.toArray(o),n=parameters(i.app.nav.current.completeHref,!0).r||"index",t=new Parameter({type:"VALUES",name:"Contents",id:"contents",possibleValues:e,possibleValuesLabels:["All Posts","Your Pocket","Top posts"],defaultValue:o[n]});return t.value=o[n],t._onChange=function(e){var n=e;i.nav.api.load({open:!0,href:n,history:!0})},t},t=function(n){console.log("CLBK",n);var t=r();i.app.user.isState(function(e){i.shell({name:"menu",el:a.menu,data:{pathname:n,state:e,mobile:isTablet(),selector:t}},function(e){ParametersLive([t],e.el)})})},p=function(){};return{primary:n,getdata:function(e){e({})},destroy:function(){delete i.app.nav.clbks.history.toppanel,a={}},init:function(e){p(),(a={}).c=e.el.find("#"+i.map.id),a.menu=a.c.find(".panelitems"),i.app.nav.clbks.history.toppanel=function(e){t(e)},t(i.app.nav.current.href),e.clbk(null,e)}}};return i.run=function(e){var n=i.addEssense(t,a,e);i.init(n,e)},i.stop=function(){_.each(t,function(e){e.destroy()})},i}();"undefined"!=typeof module?module.exports=toppanel:(app.modules.toppanel={},app.modules.toppanel.module=toppanel);
 /*_____*/ 
var footer=function(){var t=new nModule,o={},n=function(a){var e,o=deep(a,"history"),n=new Parameter({type:"VALUES",name:"Localization",id:"localization",defaultValue:app.localization.current().name,possibleValues:app.localization.availableMap("name"),possibleValuesLabels:app.localization.availableMap("name"),format:{right:!0},_onChange:function(a){var e=app.localization.findByName(a);e&&e.key!=app.localization.key&&app.localization.set(e.key)}}),i=function(){};return{primary:o,getdata:function(a){var e={};e._SEO=_SEO,e.loc=n,a(e)},destroy:function(){e={}},init:function(a){i(),(e={}).c=a.el.find("#"+t.map.id),ParametersLive([n],e.c),a.clbk(null,a)}}};return t.run=function(a){var e=t.addEssense(o,n,a);t.init(e,a)},t.stop=function(){_.each(o,function(a){a.destroy()})},t}();"undefined"!=typeof module?module.exports=footer:(app.modules.footer={},app.modules.footer.module=footer);
 /*_____*/ 
var send=function(){var d=new nModule,a={},t=function(n){var e,a,t=deep(n,"history"),i={stateAction:function(e,a){d.app.user.isState(function(n){n?a():d.nav.api.load({open:!0,id:"authorization",inWnd:!0,essenseData:{loginText:d.app.localization.e("llogin"),successHref:e,signInClbk:function(){a&&a()}}})})},send:function(){i.stateAction("_this",function(){d.nav.api.load({open:!0,history:!0,href:"userpage?id=wallet&action=send&address="+a.address+"&amount="+a.amount})})}},s=function(){},o=function(){var n;e.c.find(".send").on("click",i.send),e.am.on("change",function(){var n=$(this).val();a.amount=n}),0<(n={alias:"numeric",groupSeparator:",",radixPoint:".",digits:6,digitsOptional:!1,autoGroup:!0,allowMinus:!1}).digits&&(n.placeholder="0.000000"),e.am.inputmask(n),parameters().setammount||e.am.blur()};return{primary:t,getdata:function(n){var e=parameters();a={},e.address&&bitcoin.address.fromBase58Check(e.address)&&(a.address=e.address),e.amount&&(a.amount=Number(e.amount)),e.label&&(a.label=clearScripts(donottrustLink(findAndReplaceLink(e.label,!0)))),e.message&&(a.message=clearScripts(donottrustLink(findAndReplaceLink(hexDecode(e.message,!0))))),a.amount&&a.address&&a.message?n(a):d.nav.api.load({open:!0,href:"page404",history:!0})},destroy:function(){e={}},init:function(n){s(),(e={}).c=n.el.find("#"+d.map.id),e.am=e.c.find(".amredit"),o(),n.clbk(null,n)}}};return d.run=function(n){var e=d.addEssense(a,t,n);d.init(e,n)},d.stop=function(){_.each(a,function(n){n.destroy()})},d}();"undefined"!=typeof module?module.exports=send:(app.modules.send={},app.modules.send.module=send);
 /*_____*/ 
var support=function(){var r=new nModule,t={},e=function(n){var o,t=deep(n,"history"),e={send:function(){var n=e.values();n?(o.c.removeClass("showError"),topPreloader(20),r.app.platform.sdk.user.support(n,function(){topPreloader(100),dialog({html:r.app.localization.e("contactSuccess"),class:"one"}),$.each(o.inputs,function(){$(this).val("")})})):o.c.addClass("showError")},values:function(){var e={},s=!0;return $.each(o.inputs,function(){var n=$(this),o=n.val(),t=n.attr("systemId");o?e[t]=o:s=!1}),s?e:null}},s=function(){e.send()},u=function(){};return{primary:t,getdata:function(n){n({})},destroy:function(){o={}},init:function(n){u(),(o={}).c=n.el.find("#"+r.map.id),o.send=o.c.find(".send"),o.inputs=o.c.find(".forminput"),o.send.on("click",s),n.clbk(null,n)}}};return r.run=function(n){var o=r.addEssense(t,e,n);r.init(o,n)},r.stop=function(){_.each(t,function(n){n.destroy()})},r}();"undefined"!=typeof module?module.exports=support:(app.modules.support={},app.modules.support.module=support);
 /*_____*/ 
var panel=function(){var u=new nModule,i={},t=function(n){var e,i=deep(n,"history"),t=null,o=null,a=function(){var n=o.discussions||{};n.view="fixedin",u.nav.api.load({open:!0,id:"discussions",el:e.cnt,animation:!1,essenseData:n,clbk:function(n,e){t=e}})},s=function(){};return{primary:i,getdata:function(n,e){o=e.settings.essenseData||{};n({})},destroy:function(){t&&(t.destroy(),t=null),e={}},init:function(n){s(),(e={}).c=n.el.find("#"+u.map.id),e.cnt=e.c.find(".panelcnt"),a(),n.clbk(null,n)}}};return u.run=function(n){var e=u.addEssense(i,t,n);u.init(e,n)},u.stop=function(){_.each(i,function(n){n.destroy()})},u}();"undefined"!=typeof module?module.exports=panel:(app.modules.panel={},app.modules.panel.module=panel);
 /*_____*/ 
var notifications=function(){var p=new nModule,i={},o=function(t){var s,i,o,n=deep(t,"history"),e="",f=function(){var n=s.c.find(".notification:not(.seen)");n.length&&(i=slowMade(function(){if(p.app.platform.sdk.notifications.seenall(),0<n.length){n.addClass("seen")}},i,50))},a=function(){p.nav.api.go({href:"userpage?id=notifications&report=notifications",history:!0,open:!0}),p.closeContainer()},c=function(){f()},l=function(o,n){o||(o={});var e=o.notifications||p.app.platform.sdk.notifications.storage.notifications;o.el=s.new;var t=p.app.platform.currentTime();o.seenFilter&&(e=_.filter(e,function(n){if(!n.seen||t-n.seen<86400)return!0}));var a=-e.length+(o.notifications||p.app.platform.sdk.notifications.storage.notifications).length;e=_.sortBy(e,function(n){return Number(-n.nblock)}),p.shell({name:"notifications",el:o.el,data:{notifications:e,ws:p.app.platform.ws},inner:prepend},function(i){var n="fadeOut",t=".empty";a&&s.c.find(".more").html("("+a+")"),p.app.platform.sdk.notifications.storage.notifications.length?(t=".emptyNew",0==o.el.find(".notification").length&&(n="fadeIn")):n="fadeIn",_.each(e,function(n){var t=p.app.platform.ws.messages[n.msg].fastMessageEvents;t&&t(n,{el:i.el.find('.notification[notification="'+n.txid+'"]')})}),s.c&&s.c.find(t)[n](1),f()})},r=function(){};return{primary:n,getdata:function(n){n({})},destroy:function(){s={},e="",i&&clearTimeout(i),i=null,o.removeEventListener("scroll",c),delete p.app.platform.sdk.notifications.clbks.added["notifications"+e]},init:function(n){r(),(s={}).c=n.el.find("#"+p.map.id),s.new=s.c.find(".newWrapper"),"tooltip"==n.insert?(o=s.c.find(".nabsContentWrapper")[0],e="tt"):(e="",o=window),jinel=$(o),s.c.find(".showAll").on("click",a),o.addEventListener("scroll",c),n.insert,console.log(t,"PPPP"),l({seenFilter:t.inTooltip}),p.app.platform.sdk.notifications.clbks.added["notifications"+e]=function(n){l({notifications:n})},n.clbk(null,n)},tooltip:{options:{theme:"lighttooltip notificationTolltip",position:"left",zIndex:50,functionPosition:function(n,t,i){return i.coord.top=15,i.coord.left+=10,i}},event:"click"}}};return p.run=function(n){var t=p.addEssense(i,o,n);p.init(t,n)},p.stop=function(){_.each(i,function(n){n.destroy()})},p}();"undefined"!=typeof module?module.exports=notifications:(app.modules.notifications={},app.modules.notifications.module=notifications);
 /*_____*/ 
var addaccount=function(){var c=new nModule,o={},t=function(n){var i,e,o=deep(n,"history"),t="secondary";o&&(t="primary"),n.inWnd&&(t="window");var a=function(){var n=trim(i.login.val());e.success&&e.success(n),c.closeContainer()};return{primary:o,id:t,getdata:function(n,e){n({})},destroy:function(){i={}},init:function(n){(i={}).c=n.el.find("#"+c.map.id),i.login=i.c.find(".loginValue"),i.enter=i.c.find(".enter"),e=n.essenseData||{},n,i.enter.on("click",a),i.login.on("focus",function(){i.c.find(".inputTable").addClass("typeactive")}),i.login.on("blur",function(){i.c.find(".inputTable").removeClass("typeactive")}),initUpload({el:i.c.find(".uploadFile"),notexif:!0,ext:["txt","png","jpeg","jpg"],dropZone:i.c,action:function(n,e){if("png"==n.ext||"jpeg"==n.ext||"jpg"==n.ext)grayscaleImage(n.base64,function(n){qrscanner.q.callback=function(n){"error decoding QR Code"==n?sitemessage(c.app.localization.e("filedamaged")):(i.login.val(trim(n)),a())},qrscanner.q.decode(n)});else{var o=n.base64.split(",")[1],t=b64_to_utf8(o).split("/");t[1]?(i.login.val(trim(t[1])),a()):sitemessage(c.app.localization.e("filedamaged"))}}}),n.clbk(null,n)},tooltip:{options:{position:"left",functionPosition:function(n,e,o){return o.coord.top=10,o.coord.left+=10,o}},event:"mouseenter"},wnd:{class:"withoutButtons allscreen"}}};return c.run=function(n){var e=c.addEssense(o,t,n);c.init(e,n)},c.stop=function(){_.each(o,function(n){n.destroy()})},c}();"undefined"!=typeof module?module.exports=addaccount:(app.modules.addaccount={},app.modules.addaccount.module=addaccount);
 /*_____*/ 
var complain=function(){var h=new nModule,i={},a=function(e){var t,i,a,o,s,n=deep(e,"history"),r={post:[{name:"Sexual content",gid:1,group:[{name:"Graphic sexual activity",id:"1"},{name:"Nudity",id:"2"},{name:"Suggestive, but without nudity",id:"3"},{name:"Content involving minors",id:"4"},{name:"Abusive title or description",id:"5"},{name:"Other sexual content",id:"6"}]},{name:"Violent or repulsive content",gid:2,group:[{name:"Adults fighting",id:"7"},{name:"Physical attack",id:"8"},{name:"Youth violence",id:"9"},{name:"Animal abuse",id:"10"}]},{name:"Hateful or abusive content",gid:3,group:[{name:"Promotes hatred or violence",id:"11"},{name:"Abusing vulnerable individuals",id:"12"},{name:"Bullying",id:"13"},{name:"Abusive title or description",id:"14"}]},{name:"Harmful dangerous acts",gid:4,group:[{name:"Pharmaceutical or drug abuse",id:"19"},{name:"Abuse of fire or explosives",id:"20"},{name:"Suicide or self injury",id:"21"},{name:"Other dangerous acts",id:"22"}]},{name:"Child abuse",id:"23"},{name:"Promotes terrorism",id:"24"},{name:"Spam or misleading",gid:6,group:[{name:"Mass advertising",id:"25"},{name:"Pharmaceutical drugs for sale",id:"26"},{name:"Misleading text",id:"27"},{name:"Misleading thumbnail",id:"28"},{name:"Scams / fraud",id:"29"}]},{name:"Infringes my rights",gid:7,group:[{name:"Infringes my copyright",id:"30"},{name:"Invades my privacy",id:"31"},{name:"Other legal claim",id:"32"}]}]},d=function(n){return _.find(r[i],function(e){return(e.gid||e.id)==n})},l=function(i){var e=a.complain(o);topPreloader(30),h.sdk.node.transactions.create.commonFromUnspent(e,function(e,n){console.log(e,n),topPreloader(100),e?i&&i(!0):(h.app.platform.errorHandler(n,!0),i&&i())})},u=function(){o?t.next.removeClass("disabled"):t.next.addClass("disabled")},c=function(){h.closeContainer()},m=function(){!t.next.hasClass("disabled")&&o&&l(function(e){e&&(h.closeContainer(),s.success&&s.success())})},p=function(){var e=$(this).attr("reason"),n=d(e);n&&($(this).hasClass("active")||(t.c.find(".reason").removeClass("active"),o=null,$(this).addClass("active"),n.group?f.selector(n):o=n.id,u()))},f={reasons:function(){h.shell({name:"reasons",inner:html,el:t.reasons,data:{reasons:r[i]}},function(e){e.el.find(".reason").on("click",p)})},selector:function(e){var n=t.c.find('.reason[reason="'+e.gid+'"] .reasongroupIn'),i=_.map(e.group,function(e){return e.name}),a=_.map(e.group,function(e){return e.id}),s=new Parameter({type:"VALUES",name:e.name,id:e.gid,possibleValues:a,possibleValuesLabels:i,placeholder:"Choose one"});s._onChange=function(e){o=e||null,u()},h.shell({name:"selector",inner:html,el:n,data:{selector:s}},function(e){ParametersLive([s],e.el)})}},g=function(){};return{primary:n,getdata:function(e,n){(o=null,i=deep(n,"settings.essenseData.item")||"post",a=deep(n,"settings.essenseData.obj")||null,s=n.settings.essenseData||{},a)&&e({ess:i})},destroy:function(){t={}},init:function(e){g(),(t={}).c=e.el.find("#"+h.map.id),t.reasons=t.c.find(".reasons"),t.next=t.c.find(".next"),t.c.find(".cancel").on("click",c),t.next.on("click",m),f.reasons(),e.clbk(null,e)},wnd:{class:"withoutButtons transparent small complain"}}};return h.run=function(e){var n=h.addEssense(i,a,e);h.init(n,e)},h.stop=function(){_.each(i,function(e){e.destroy()})},h}();"undefined"!=typeof module?module.exports=complain:(app.modules.complain={},app.modules.complain.module=complain);
 /*_____*/ 
var socialshare=function(){var s=new nModule,t={},a=function(e){var i,t=deep(e,"history"),a={},n=[{n:"Facebook",i:'<i class="fab fa-facebook-f"></i>',t:"facebook",c:"#3b5999"},{n:"Twitter",i:'<i class="fab fa-twitter"></i>',t:"twitter",c:"#55acee"},{n:"VK",i:'<i class="fab fa-vk"></i>',t:"vk",c:"#4c75a3"},{n:"Pinterest",i:'<i class="fab fa-pinterest-p"></i>',t:"pinterest",c:"#bd081c"},{n:"LinkedIn",i:'<i class="fab fa-linkedin-in"></i>',t:"linkedin",c:"#0077B5"},{n:"Reddit",i:'<i class="fab fa-reddit-alien"></i>',t:"reddit",c:"#ff5700"},{n:"Whatsapp",i:'<i class="fab fa-whatsapp"></i>',t:"whatsapp",c:"#075e54"}],c=function(){};return{primary:t,getdata:function(e,i){if((a=i.settings.essenseData||{}).title||(a.title="Pocketnet"),a.text||(a.text="Great news. I gained my independence from social media monopolies, Come join me at pocketnet.app so we can share and chat independently on the blockchain. Join me here"),a.image||(a.image="https://pocketnet.app/img/logobigpadding.png"),!a.url)if("undefined"!=typeof _Electron||window.cordova){var t=(i=window.location.pathname.split("/"))[i.length-1];a.url="https://pocketnet.app/"+t+window.location.search}else a.url="https://pocketnet.app/"+s.app.nav.get.href();e({socials:n,url:a.url,rescue:a.rescue||!1,caption:a.caption})},destroy:function(){i={}},init:function(e){c(),(i={}).c=e.el.find("#"+s.map.id),i.url=i.c.find(".url"),i.c.find(".socialsharebtn").ShareLink({title:a.title,text:a.text,image:a.image,url:a.url,class_prefix:"s_",width:640,height:480}),i.c.find(".copycell").on("click",function(){copyText(i.url.find(".urlcell")),sitemessage(s.app.localization.e("urlsuccesscopied"))}),e.clbk(null,e)},wnd:{header:"Social sharing",class:"allscreen sharingwindow black"}}};return s.run=function(e){var i=s.addEssense(t,a,e);s.init(i,e)},s.stop=function(){_.each(t,function(e){e.destroy()})},s}();"undefined"!=typeof module?module.exports=socialshare:(app.modules.socialshare={},app.modules.socialshare.module=socialshare);
 /*_____*/ 
var authorization=function(){var c=new nModule,o={},a=function(e){var i,a,t,l=deep(e,"history"),n="secondary";l&&(n="primary"),e.inWnd&&(n="window");var r=new Parameter({type:"BOOLEAN",name:"stay",id:"stay",name:"Stay Signed",_onChange:function(e){e||(console.log("stayH"),localStorage.stay="0",localStorage.mnemonic,c.app.user.stay=0)}}),s={login:function(){var o={},e=trim(i.login.val());localStorage.stay=boolToNumber(r.value).toString(),c.user.stay=r.value,c.user.signin(e,function(e){if(e){var n={};n.href=a.successHref,!n.href&&l&&(n.href=function(){return c.app.user.validate()?"index":"filluser"}),n.nav=a.nav,n.clbk=function(){topPreloader(100);var e=deep(t,"container.close");e&&e(),a.signInClbk&&a.signInClbk()},"_this"==deep(a,"successHref")?c.app.reloadModules(function(){if(c.app.user.validate()){var e=deep(t,"container.close");e&&e(),a.signInClbk&&a.signInClbk()}else c.nav.api.loadSameThis("filluser",o)}):c.app.reload(n)}else dialog({class:"one",header:c.app.localization.e("id98"),html:c.app.localization.e("id99"),btn1text:c.app.localization.e("daccept"),btn2text:c.app.localization.e("dcancel")})})}};return{primary:l,id:n,getdata:function(e,n){if(n.state&&l)c.nav.api.load({open:!0,href:"index",history:!0});else{r.value=numberToBool(c.app.user.stay);localStorage.mnemonic;e({stay:r,mnemonic:""})}},destroy:function(){i={}},init:function(e){var n,o;(i={}).c=e.el.find("#"+c.map.id),i.login=i.c.find(".loginValue"),i.pwd=i.c.find(".pwdValue"),i.enter=i.c.find(".enter"),i.toRegistration=i.c.find(".toRegistration"),i.forgotPassword=i.c.find(".forgotPassword"),a=e.essenseData||{},n=t=e,i.enter.on("click",s.login),i.toRegistration.on("click",function(){c.nav.api.loadSameThis("registration",n)}),initUpload({el:i.c.find(".uploadFile"),ext:["txt","png","jpeg","jpg"],notexif:!0,dropZone:i.c,action:function(e,n){if("png"==e.ext||"jpeg"==e.ext||"jpg"==e.ext)grayscaleImage(e.base64,function(e){qrscanner.q.debug=!0,qrscanner.q.callback=function(e){console.log(e),"error decoding QR Code"==e?sitemessage(c.app.localization.e("filedamaged")):(i.login.val(trim(e)),s.login())},qrscanner.q.decode(e)});else{var o=e.base64.split(",")[1],a=b64_to_utf8(o).split("/");a[1]?(i.login.val(trim(a[1])),s.login()):sitemessage(c.app.localization.e("filedamaged"))}}}),i.c.find(".loginValue").on("focus",function(){i.c.find(".inputTable").addClass("typeactive")}),i.c.find(".loginValue").on("blur",function(){i.c.find(".inputTable").removeClass("typeactive")}),o=parameters(),ParametersLive([r],i.c),o.restore&&s.forgotPassword(),e.clbk(null,e)},tooltip:{options:{position:"left",functionPosition:function(e,n,o){return o.coord.top=10,o.coord.left+=10,o}},event:"mouseenter"},wnd:{class:"withoutButtons allscreen"}}};return c.run=function(e){var n=c.addEssense(o,a,e);c.init(n,e)},c.stop=function(){_.each(o,function(e){e.destroy()})},c}();"undefined"!=typeof module?module.exports=authorization:(app.modules.authorization={},app.modules.authorization.module=authorization);
 /*_____*/ 
var surveyiframe=function(){var o=new nModule,r={},i=function(e){var n,r=deep(e,"history"),i=function(e){"endsurvey"==(e.originalEvent.data||{}).message&&o.closeContainer()},a=function(){};return{primary:r,getdata:function(e){e({})},destroy:function(){n={}},init:function(e){localStorage.survey1=!0,a(),(n={}).c=e.el.find("#"+o.map.id),$(n.c.find("iframe")[0].contentWindow).on("message",i),e.clbk(null,e)},wnd:{class:"allscreen black surveyiframe"}}};return o.run=function(e){var n=o.addEssense(r,i,e);o.init(n,e)},o.stop=function(){_.each(r,function(e){e.destroy()})},o}();"undefined"!=typeof module?module.exports=surveyiframe:(app.modules.surveyiframe={},app.modules.surveyiframe.module=surveyiframe);
 /*_____*/ 
var registration=function(){var v=new nModule,t={},i=function(n){var l,t,i,o=deep(n,"history"),a={last:!1,end:!1},s=null,c=new Parameter({type:"STRING",name:"keyInput",id:"keyInput",placeholder:v.app.localization.e("confirmkey"),autoSearch:function(e,n,t){if(0==a.mnemonicKey.indexOf(e)&&(console.log("v[v.length - 1]",e[e.length-1])," "!=e[e.length-1])){var i=e.split(" "),o=i.length-1;i[o];t(_.filter(a.mnemonicContent,function(e,n){if(n<=o)return!0}).join(" "))}}}),r={download:function(o){a.os&&a.os.github&&$.get(a.os.github.url,{},function(e){var n=deep(e,"assets")||[],t=_.find(n,function(e){return e.name==a.os.github.name});if(t){v.app.platform.m.log("registration_application_download",a.os.github.name);var i=document.createElement("a");i.setAttribute("href",t.browser_download_url),i.setAttribute("download","download"),i.click(),o&&o(t.browser_download_url)}})},validation:function(){var e=trim(c.value);return e!=a.mnemonicKey&&e!=a.mk?(l.c.find(".note").html(v.app.localization.e("keysnotmatch")),l.c.addClass("error"),!1):(l.c.removeClass("error"),l.c.find(".note").html(""),!0)},registration:function(){r.validation()&&(localStorage.stay="1",v.app.user.stay=1,v.user.signin(a.mnemonicKey,function(e){if(!e)return l.c.find.note.html(v.app.localization.e("id98")),void l.c.addClass("error");a.end=!0,g.confirm(function(){g.success(function(){setTimeout(function(){if("_this"==deep(t,"successHref"))if(v.app.user.validate()){var e=deep(i,"container.close");e&&e(),t.signInClbk&&t.signInClbk()}else v.nav.api.loadSameThis("filluser",n);else v.app.reload({href:t.successHref||"filluser",nav:t.nav})},2e3)})})}))},generate:function(){l.c.removeClass("begin"),a.mnemonicKey=bitcoin.bip39.generateMnemonic(),a.mnemonicMask=_.shuffle(indexArray(a.mnemonicKey.length)),a.mnemonicContent=a.mnemonicKey.split(" ");var e=v.app.user.keysFromMnemo(a.mnemonicKey);a.mainAddress=app.platform.sdk.address.pnet(e.publicKey).address,a.mk=e.privateKey.toString("hex"),g.key()},repeat:function(){a.last=!1,g.confirm(function(){g.tips(function(){setTimeout(function(){l.c.removeClass("last"),setTimeout(function(){r.generate()},300)},300)})})},continue:function(){var e=l.c.find(".mnemonicKey");l.c.find(".keyStep").removeClass("showedPanel"),g.mnemonicEffect(e,!0,function(){a.last=!0,g.key(function(){setTimeout(function(){g.tips(),l.c.addClass("last"),setTimeout(function(){g.confirm()},300)},300)})})},removeDisabled:function(e){e.find(".continue").removeClass("disabled"),e.find(".preloader").remove(),e.find(".save").addClass("black"),e.find(".copy").addClass("black")}},d=function(){r.registration()},f=function(){r.generate()},u=function(){$(this).hasClass("disabled")||r.continue()},p=function(){r.repeat()},m=function(){r.download(function(e){l.c.find(".osStep").addClass("rundownloading"),l.c.find(".skipositem").html('<div class="downloadstart">You will now continue your registration after you install Pocketnet Desktop.</div><div><a href="'+e+'"><b>If Pocketnet for Windows did not start downloading, please click here to install it</b></a></div>')})},g={os:function(n){var e=os();v.app.platform.m.log("registration_application"),e&&v.app.platform.applications[e]&&"undefined"==typeof _Electron&&!window.cordova?(a.os=v.app.platform.applications[e],g.step("os",function(e){e.el.find(".downloadOs").on("click",m),e.el.find(".skip").on("click",function(){n&&n()})})):n()},step:function(e,n){v.shell({name:e,el:l.c.find("."+e+"Step"),data:a,animation:{id:"slide"}},function(e){n&&n(e)})},success:function(n){g.step("success",function(e){v.app.platform.m.log("registration_success"),n&&n()})},tips:function(n){v.app.platform.m.log("registration_tips"),g.step("tips",function(e){e.el.find(".generate").on("click",f),n&&n()})},confirm:function(e){c.value="",a.keyInput=c,g.step("confirm",function(n){n.el.find(".repeat").on("click",p),n.el.find(".registrationButton").on("click",d),e?e():(ParametersLive([c],n.el),_scrollTo(n.el,s),initUpload({el:n.el.find(".uploadFile"),ext:["txt","png","jpeg","jpg"],notexif:!0,dropZone:l.c.find(".confirm"),action:function(e,n){if("png"==e.ext||"jpeg"==e.ext||"jpg"==e.ext)grayscaleImage(e.base64,function(e){qrscanner.q.callback=function(e){"error decoding QR Code"==e?(v.app.platform.m.log("registration_qr_damaged"),l.c.find(".note").html(v.app.localization.e("filedamaged"))):(v.app.platform.m.log("registration_qr_success"),c.value=trim(e),c.el.val(c.value),r.registration())},qrscanner.q.decode(e)});else{var t=e.base64.split(",")[1],i=b64_to_utf8(t).split("/");i[1]?(c.value=trim(i[1]),c.el.val(c.value),r.registration()):l.c.find(".note").html(v.app.localization.e("filedamaged"))}}}),setTimeout(function(){n.el.find("input").bind("paste",function(e){n.el.find(".note").html(v.app.localization.e("removepaste")),e.preventDefault()}),n.el.find('input[type="text"]').on("focus",function(){n.el.find(".inputTable").addClass("typeactive")}),n.el.find('input[type="text"]').on("blur",function(){n.el.find(".inputTable").removeClass("typeactive")}),isMobile()||n.el.find(".autosearchInputCnt input").focus()},600))})},qrcode:function(e,n){new QRCode(e[0],{text:n,width:256,height:256})},key:function(a){g.step("key",function(n){v.app.platform.m.log("registration_key");var e=n.el.find(".mnemonicKey"),t=l.c.find(".keyStep");t.removeClass("showedPanel");var i=n.el.find(".hiddenMnemonicKey").html();if(i){var o=v.app.user.keysFromMnemo(trim(i)).privateKey.toString("hex");g.qrcode(n.el.find(".qrcode"),o)}g.mnemonicEffect(e,!1,function(){t.addClass("showedPanel")}),n.el.find(".continue").on("click",u),setTimeout(function(){r.removeDisabled(n.el)},2e3),v.app.platform.clbks._focus.registration=function(){r.removeDisabled(n.el)},n.el.find(".copy").on("click",function(){copyText(n.el.find(".hiddenMnemonicKey")),sitemessage(v.app.localization.e("successfullycopied")),r.removeDisabled(n.el)}),n.el.find(".save").on("click",function(){var e=n.el.find(".qrcode img").attr("src");saveAs({file:e,format:"png",name:"pocketnetkey"})}),a?a():_scrollTo(n.el,s)})},mnemonicEffect:function(t,e,n){var i=indexArray(101);e&&i.reverse();var o=t.height();t.css("min-height",o+"px"),lazyEach({array:i,sync:!0,action:function(e){var n=e.item;t.html(g.mnemonic(n)),o=t.height(),t.css("min-height",o+"px"),setTimeout(e.success,rand(1,5))},all:{success:function(){t.css("min-height","0px"),n&&n()}}})},mnemonic:function(e){var i="",o=(a.mnemonicMask.length*e/100).toFixed(0);return _.each(a.mnemonicKey,function(e,n){var t=_.indexOf(a.mnemonicMask,n);i+=t<o||" "==e?e:v.app.platform.values.alph[rand(0,v.app.platform.values.alph.length-1)]}),i}};return{primary:o,getdata:function(e,n){if(n.state&&o)v.nav.api.load({open:!0,href:"index",history:!0});else{v.app.platform.m.log("registration_open"),a={last:!1,end:!1};e({})}},destroy:function(){delete v.app.platform.clbks._focus.registration,l={}},init:function(e){var n;(l={}).c=e.el.find("#"+v.map.id),l.registrationButton=l.c.find(".registrationButton"),l.toAuthorization=l.c.find(".toAuthorization"),l.login=l.c.find(".loginValue"),l.ler=l.c.find(".ler"),l.key=l.c.find(".key"),t=e.essenseData||{},i=e,(s=l.c.closest(".wndcontent")).length||(s=null),g.os(function(){g.tips()}),n=e,l.toAuthorization.on("click",function(){v.nav.api.loadSameThis("authorization",n)}),e.clbk(null,e)},wnd:{class:"withoutButtons allscreen"}}};return v.run=function(e){var n=v.addEssense(t,i,e);v.init(n,e)},v.stop=function(){_.each(t,function(e){e.destroy()})},v}();"undefined"!=typeof module?module.exports=registration:(app.modules.registration={},app.modules.registration.module=registration);
 /*_____*/ 
var filluser=function(){var m=new nModule,t={},a=function(e){var i,o,a,n,t=deep(e,"history"),s=null,l={email:{id:"email",prev:function(e){localStorage.uei?p.next():(e(),m.app.platform.sdk.node.transactions.get.allBalance(),m.sdk.users.requestFreeMoney(function(e,n){m.app.platform.sdk.node.transactions.clbks.filluser=function(){m.app.platform.sdk.node.transactions.get.allBalance()}}))},ret:!1,render:"email",after:function(e,n,t){var a=function(e){return!!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(e)},o=e.find(".uemailinput"),i=e.find(".skip"),s=e.find(".addEmail"),l="";o.focus(),o.on("keyup",function(){l=$(this).val(),a(l)?(s.removeClass("disabled"),i.addClass("hidden"),s.html("Add email and continue")):(s.addClass("disabled"),i.removeClass("hidden"),s.html("Add email"))}),s.on("click",function(){var e=o.val();a(e)&&(m.app.platform.m.log("userwisard_email_add"),p.next(),function(e,n){topPreloader(20);var t={Email:e};t.Action||(t.Action="ADDTOMAILLIST"),t.TemplateID="1005",$.ajax({type:"POST",url:"https://pocketnet.app/Shop/AJAXMain.aspx",data:t,dataType:"json",success:function(){topPreloader(100),n&&n()}})}(localStorage.uei=e,function(){}))}),i.one("click",function(){m.app.platform.m.log("userwisard_email_skip"),p.next()})}},money:{id:"money",prev:function(n){m.app.platform.sdk.ustate.me(function(e){e?m.app.platform.sdk.node.transactions.get.allBalance(function(e){if(0<e)return m.app.platform.m.log("userwisard_money_success"),void p.next();m.app.platform.sdk.node.transactions.clbks.filluser=function(){m.app.platform.sdk.node.transactions.get.allBalance(function(e){0<e&&1==r&&(m.app.platform.m.log("userwisard_money_success"),p.next())})},n()}):p.to(4)})},ret:!1,render:"money",after:function(n,t,e){console.log("AFTER"),p.timer(n.find(".time"),e||59,function(){m.app.platform.sdk.node.transactions.get.allBalance(function(e){1!=r&&5!=r||(1<e?(m.app.platform.m.log("userwisard_money_success"),p.to(2)):(m.app.platform.m.log("userwisard_modey_delay"),n.find(".subcaption").html(m.app.localization.e("wesentmoneydelay")),l.money.after(n,t,30)))},!0)})}},settings:{id:"settings",prev:function(n){m.app.platform.sdk.ustate.me(function(e){e?(m.app.platform.m.log("userwisard_account"),n()):p.to(4)})},render:"settings",after:function(e,n){},next:!0},welcome:{id:"welcome",prev:function(e){e()},render:"welcome",after:function(e){m.app.platform.m.log("userwisard_success"),e.find(".welcome").on("click",function(){if("_this"==deep(a,"successHref")){var e=deep(n,"container.close");e&&e(),a.signInClbk&&a.signInClbk()}else m.nav.api.go({href:"index",history:!0,open:!0})})}},network:{id:"network",prev:function(e){m.app.platform.m.log("userwisard_network_fail"),e()},render:"network",after:function(e){n&&clearInterval(n);var n=setInterval(function(){m.app.platform.sdk.ustate.me(function(e){e&&(m.app.platform.m.log("userwisard_network_success"),clearInterval(n),p.to(1))})},5e3)}}};l.moneym={id:"moneym",prev:function(e){m.app.platform.sdk.node.transactions.clbks.filluserm=function(){m.app.platform.sdk.node.transactions.get.allBalance(function(e){0<e&&5==r&&(m.app.platform.m.log("userwisard_money_success"),p.to(2))})},e()},ret:l.money.ret,render:"moneym",after:l.money.after};var r=-1,c=["email","money","settings","welcome","network","moneym"],p={to:function(e,n){r=e,p.makeStep(n)},next:function(e){r++,p.makeStep(function(){})},makeStep:function(e){var t=l[c[r]];t&&t.prev(function(){i.c&&(i.c.attr("step",t.id),f.panel(t,function(n){f.step(t,function(e){_scrollTo(e,s),n.find(".elpanel").addClass("active"),t.after(e,n)})}))})},timer:function(a,o,e){var i=new CircularProgress({radius:120,strokeStyle:"#ff1975",lineCap:"round",lineWidth:1,font:"100 56px 'Segoe UI',SegoeUI,'Helvetica Neue',Helvetica,Arial,sans-serif",fillStyle:"#5D5D5D",text:{value:""},initial:{strokeStyle:"#fff",lineWidth:1}});a.find(".circle").html(i.el);var n=function(e){var n=secInTime(e/1e3).split(":");a.find(".t .min").html(n[0]),a.find(".t .sec").html(n[1]),i.options.text={value:""};var t=100*(1-e/(1e3*o));t<0&&(t=0),i.update(t)};timer=new Timer({ontick:function(){n(timer.getDuration())},onend:function(){e&&e()}}),timer.start(o),n(timer.getDuration())}},d=function(){if(!(r<0)){var e=l[c[r]],n=i.c.find('.step[step="'+e.id+'"] .stepBody').closest(".step"),t=i.c.find(".stepsWrapperLine"),a=n.closest(".stepsWrapper").width();i.c.find(".step").width(a),t.css("margin-left","-"+r*a+"px"),t.width(a*c.length)}},f={step:function(e,t){i.c.find(".step").removeClass("active");var n=i.c.find('.step[step="'+e.id+'"] .stepBody'),a=n.closest(".step"),o=i.c.find(".stepsWrapperLine");f[e.render](n,function(e){var n=a.closest(".stepsWrapper").width();i.c.find(".step").width(n),o.css("margin-left","-"+r*n+"px"),o.width(n*c.length),a.closest(".step").addClass("active"),t&&t(e)})},panel:function(e,n){m.shell({name:"panel",el:i.panel,data:{step:e}},function(e){n&&n(e.el)})},email:function(e,n){m.shell({name:"email",el:e,data:{}},function(e){n&&n(e.el)})},welcome:function(e,n){m.shell({name:"welcome",el:e,data:{}},function(e){n&&n(e.el)})},network:function(e,n){m.shell({name:"network",el:e,data:{}},function(e){n&&n(e.el)})},money:function(e,n){m.shell({name:"money",el:e,data:{}},function(e){n&&n(e.el)})},moneym:function(e,n){m.shell({name:"moneym",el:e,data:{}},function(e){n&&n(e.el)})},settings:function(t,a,e){m.nav.api.load({open:!0,id:"test",el:t,essenseData:{wizard:!0,panel:i.panel,success:function(){p.next()}},clbk:function(e,n){o=n,a&&a(t)}})}},u=function(){};return{primary:t,getdata:function(n,e){a=e.settings.essenseData||{},r=-1;var t={steps:l};m.app.user.validate()?m.app.nav.api.load({open:!0,href:"index",history:!0}):m.fastTemplate("panel",function(e){n(t)})},destroy:function(){window.removeEventListener("resize",d),o&&o.destroy(),o=null,i={}},init:function(e){u(),(i={}).c=e.el.find("#"+m.map.id),i.panel=i.c.find(".panelWrapper"),window.addEventListener("resize",d),n=e,p.next(),(s=i.c.closest(".wndcontent")).length||(s=null),e.clbk(null,e)}}};return m.run=function(e){var n=m.addEssense(t,a,e);m.init(n,e)},m.stop=function(){_.each(t,function(e){e.destroy()})},m}();"undefined"!=typeof module?module.exports=filluser:(app.modules.filluser={},app.modules.filluser.module=filluser);
 /*_____*/ 
var article=function(){var g=new nModule,t={},n=function(a){var o,s,t,n,e,i=deep(a,"history"),c=/[,.!?;:()<> \n\r]/g,r={message:g.app.localization.e("emptymessage")},p={newart:function(){return g.app.platform.sdk.articles.empty()},complete:function(){t.save&&t.save(s),d.close(),t.complete&&t.complete(s)},change:function(e){s.content=e,s.time=Math.floor((new Date).getTime()/1e3),t.save&&t.save(s)},changecaption:function(e){s.caption.value=e,s.time=Math.floor((new Date).getTime()/1e3),t.save&&t.save(s)},trx:function(e,i){o.c.addClass("loading"),g.sdk.node.transactions.create.commonFromUnspent(e,function(e,a){if(topPreloader(100),o.c.removeClass("loading"),e)try{var t=new pShare;t._import(e,!0),t.temp=!0,t.address=e.address,g.app.platform.sdk.node.shares.add(t),s.txid=t.txid,s.ptime=Math.floor((new Date).getTime()/1e3),g.app.platform.sdk.user.survey(),p.complete()}catch(e){console.log(e)}else if(i)i(!1,r[a]);else{var n=g.app.platform.errorHandler(a,!0);n&&sitemessage(n)}},a)},add:function(){var e=new Share,a=g.app.platform.sdk.articles.echo(s);e.message.set(a),e.caption.set(s.caption.value),e.images.set(g.app.platform.sdk.articles.getImages(a)),e.tags.set(p.tagsFromText(a)),e.settings.v="a",e.settings.videos=g.app.platform.sdk.articles.getVideos(a),console.log(e,g.app.platform.sdk.articles.getImages(a));var t=e.validation();t?r[t]&&sitemessage(r[t]):dialog({html:"Do you really want to publish this article?",btn1text:g.app.localization.e("dyes"),btn2text:g.app.localization.e("dno"),class:"zindex",success:function(){p.trx(e)}})},tagsFromText:function(e){var a=e.split(c),t=_.filter(a,function(e){if("#"==e[0])return!!(e=e.replace(/#/g,""))});return _.each(t,function(e,a){t[a]=e.replace(/\#/g,"")}),t}},d={authorclose:function(){g.nav.api.load({open:!0,href:"author?address="+g.app.user.address.value.toString("hex"),history:!0}),g.closeContainer(),t.closeContainer&&t.closeContainer()},changecaption:function(){var e=$(this).val();p.changecaption(e)},change:function(){e=slowMade(function(){var e=g.app.platform.sdk.articles.lightVideo(n.serialize());p.change(e)},e,300)},close:function(){t.close&&t.close(),g.closeContainer()},add:function(){p.add()},goto:function(){s.txid&&(g.closeContainer(),t.closeContainer&&t.closeContainer(),g.nav.api.load({open:!0,href:"index?s="+s.txid,history:!0}))}},f=function(e,a){o.caption.val(e.caption.value)},u=function(){};return{primary:i,getdata:function(e,a){t=a.settings.essenseData||{},e({art:s=t.art||p.newart(parameters().aid)})},destroy:function(){g.app.nav.api.history.removeParameters(["aid"]),o={}},init:function(e){var a;u(),(o={}).c=e.el.find("#"+g.map.id),o.caption=o.c.find(".caption"),o.content=o.c.find(".content"),o.back=o.c.find(".back"),o.add=o.c.find(".add"),o.goto=o.c.find(".goto"),o.back.on("click",d.close),o.caption.on("keyup",d.changecaption),o.add.on("click",d.add),o.goto.on("click",d.goto),o.c.find(".uic").on("click",d.authorclose),o.c.find(".username").on("click",d.authorclose),console.log(MediumEditor),n=new MediumEditor(".edt",{delay:500,targetBlank:!0,toolbar:{buttons:["bold","italic","underline","anchor","quote"],diffLeft:25,diffTop:10},anchor:{placeholderText:"Type a link",customClassOption:"btn",customClassOptionText:"Create Button"},paste:{cleanPastedHTML:!0,cleanAttrs:["style","dir"],cleanTags:["label","meta"]},anchorPreview:{hideDelay:300},placeholder:{text:"Text",hideOnClick:!1}}),$(function(){$(".edt").mediumInsert({editor:n,addons:{images:{label:'<span class="fas fa-camera"></span>',deleteScript:function(e,a){g.sdk.imagesH.delete(e)},fileDeleteOptions:{},preview:!0,captions:!0,captionPlaceholder:"Type caption for image (optional)",autoGrid:3,formData:{},upload:function(e,n){resize(e,1080,1080,function(e){var a=e.split(",");a[1]&&g.ajax.run({type:"POST",imgur:!0,data:{Action:"image",image:a[1]},success:function(e){var a=deep(e,"data.link");if(a){var t=deep(e,"data.deletehash");t&&g.sdk.imagesH.add(a,t)}else a="https://pocketnet.app/img/imagenotuploaded.jpg";n&&n(a)},fail:function(){l="https://pocketnet.app/img/imagenotuploaded.jpg",n&&n(l)}})})},fileUploadOptions:{acceptFileTypes:/(\.|\/)(gif|jpe?g|png)$/i},styles:{wide:{label:'<span class="fa fa-align-justify"></span>',added:function(e){},removed:function(e){}},left:{label:'<span class="fa fa-align-left"></span>'},right:{label:'<span class="fa fa-align-right"></span>'},grid:{label:'<span class="fa fa-th"></span>'}},actions:{remove:{label:'<span class="fa fa-times"></span>',clicked:function(e){var a=$.Event("keydown");a.which=8,$(document).trigger(a)}}},messages:{acceptFileTypesError:"This file is not in a supported format: ",maxFileSizeError:"This file is too big: "},uploadCompleted:function(e,a){d.change()},uploadFailed:function(e,a){}},embeds:{label:'<span class="fas fa-play"></span>',placeholder:"Paste a YouTube, Vimeo link and press Enter",styles:{wide:{label:'<span class="fa fa-align-justify"></span>',added:function(e){},removed:function(e){}},left:{label:'<span class="fa fa-align-left"></span>'},right:{label:'<span class="fa fa-align-right"></span>'}},actions:{remove:{label:'<span class="fa fa-times"></span>',clicked:function(e){var a=$.Event("keydown");a.which=8,$(document).trigger(a)}}}}}}),n.subscribe("editableKeyup",function(){d.change()}),n.subscribe("editablePaste",function(){d.change()}),n.subscribe("editableBlur",function(){d.change()}),f(s),Plyr.setup(".js-player"),a&&a()}),e.clbk(null,e)},wnd:{class:"allscreen a100 article articlebtn"}}};return g.run=function(e){var a=g.addEssense(t,n,e);g.init(a,e)},g.stop=function(){_.each(t,function(e){e.destroy()})},g}();"undefined"!=typeof module?module.exports=article:(app.modules.article={},app.modules.article.module=article);
 /*_____*/ 
var about=function(){var p=new nModule,n={},a=function(e){var n,t,a,i=deep(e,"history"),o=null,s=null,c={videoWidth:function(e){var t=560,n=315,a=e.width(),i=a/(t/n);e.find("iframe").width(a),e.find("iframe").height(i)},time:function(){today=new Date,today=Math.floor((t-today)/1e3),tsec=today%60,today=Math.floor(today/60),tsec<0?tsec="00":tsec<10&&(tsec="0"+tsec),tmin=today%60,today=Math.floor(today/60),tmin<0?tmin="00":tmin<10&&(tmin="0"+tmin),thour=today%24,today=Math.floor(today/24),thour<0&&(thour="00"),today<0&&(today="00"),n.days.html(today),n.seconds.html(tsec),n.minutes.html(tmin),n.hours.html(thour)},fixed:function(){var e=$(window).scrollTop();n.main.offset().top+n.main.height()<e?n.fixed.addClass("active"):n.fixed.removeClass("active")},explore:function(){var e=n.c.find(".faq");_scrollToTop(e)},validateEmail:function(e){return!!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(e)},saveEmail:function(e,t,n,a){a||(a="4");var i={Email:e,Name:t};i.Action||(i.Action="ADDTOMAILLIST"),i.TemplateID||(i.TemplateID=a),$.ajax({type:"POST",url:"https://pocketnet.app/Shop/AJAXMain.aspx",data:i,dataType:"json",success:function(){n&&n()}})},joinSuccess:function(e){p.fastTemplate("joinSuccess",function(e){dialog({html:e,class:"one joinbeta",btn1text:"Okay"})},{email:e})},join:function(e){p.fastTemplate("join",function(e){dialog({html:e,wrap:!0,success:function(e){var t=e.el.find(".email"),n=e.el.find(".name"),a=t.val(),i=n.val();if(c.validateEmail(a)&&i)return c.saveEmail(a,i),c.joinSuccess(a,i),!0},clbk:function(e){var n=e.find(".name"),a=e.find(".email"),t=function(){var e=a.val(),t=n.val();return c.validateEmail(e)&&t?(i.removeClass("disabled"),!0):(i.addClass("disabled"),!1)},i=e.find(".btn1");i.addClass("disabled"),i.on("click",function(){}),n.focus(),n.on("change",t),n.on("keyup",t),a.on("change",t),a.on("keyup",t)},class:"one joinbeta"})},{action:e})},whitepaperSuccess:function(){p.fastTemplate("whitepaperSuccess",function(e){dialog({html:e,class:"one joinbeta",btn1text:"Okay"})})},whitepaper:function(){p.fastTemplate("whitepaper",function(e){dialog({html:e,wrap:!0,success:function(e){var t=e.el.find("input").val();if(c.validateEmail(t))return c.saveEmail(t,"",null,"5"),c.whitepaperSuccess(),!0},clbk:function(e){var t=function(){var e=$(this).val();return c.validateEmail(e)?(n.removeClass("disabled"),!0):(n.addClass("disabled"),!1)},n=e.find(".btn1");n.addClass("disabled"),n.on("click",function(){});var a=e.find("input");a.focus(),a.on("change",t),a.on("keyup",t)},class:"one joinbeta"})})}},l=function(){c.whitepaper()},d=function(){c.join()},r=function(){var e=$(this).attr("answer");e&&s.send(e,function(){f.survey()})},u=[{name:"Twitter",icon:'<i class="fab fa-twitter"></i>',href:"https://twitter.com/Pocket_Net"},{name:"Telegram",icon:'<i class="fab fa-telegram"></i>',href:"https://t.me/PocketRep"},{name:"Facebook",icon:'<i class="fab fa-facebook"></i>',href:"https://www.facebook.com/PocketNet"},{name:"Minds",image:"https://cdn-assets.minds.com/front/dist/assets/logos/bulb.svg",href:"https://www.minds.com/PocketNet"},{name:"Linkedin",icon:'<i class="fab fa-linkedin"></i>',href:"https://www.linkedin.com/company/cryptolo-io"},{name:"Mastodon",icon:'<i class="fab fa-mastodon"></i>',href:"https://mastodon.social/@PocketRep"},{name:"Gab",image:"https://gab.com/assets/img/logo-dec.png",href:"https://gab.com/PocketNet"},{name:"Sola",image:"https://web.solacore.net/img/logo_medium-3_mNF.png",href:"https://sola.ai/cryptolo_io"},{name:"Medium",icon:'<i class="fab fa-medium"></i>',href:"https://medium.com/@cryptolo.io"}],f={survey:function(t){p.shell({name:"survey",el:n.survey,data:{survey:s},animation:"fadeIn"},function(e){e.el.find(".sendanswer").on("click",r),e.el.find(".resultpercent").each(function(){var e=$(this);e.animate({width:e.attr("w")+"%"},130)}),t&&t()})},tes:function(){var e=n.c.find(".tes");lazyEach({array:e,sync:!0,action:function(e){var t=$(e.item),n=t.attr("time")||600;t.addClass("show"),setTimeout(function(){e.success()},n)}})},lenta:function(){p.nav.api.load({open:!0,id:"lenta",el:n.lenta,animation:!1,mid:"about",essenseData:{author:"PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd",byauthor:!0,authAction:function(e){c.join(e)},notscrollloading:!0},clbk:function(e,t){o=t}})}},m=function(){};return{primary:i,getdata:function(e){o=null,s=new sQuestion({id:"pocketnetlanding",ajax:p.app.ajax,question:"Are you fed up with traditional social media like Facebook, Twitter and others?",answers:[{t:"Yes, very",v:1},{t:"Yes, somewhat",v:2},{t:"Facebook and Twitter are just great",v:3}]}),e({socials:u,survey:s})},destroy:function(){a&&clearInterval(a),o&&(o.destroy(),o=null),window.removeEventListener("scroll",c.fixed),n={}},init:function(e){m(),(n={}).c=e.el.find("#"+p.map.id),n.lenta=e.el.find(".lenta"),n.main=n.c.find(".main"),n.fixed=n.c.find(".fixedButton"),n.join=n.c.find(".ejoin"),n.whitepaper=n.c.find(".whitepaper"),n.days=e.el.find(".days"),n.seconds=e.el.find(".seconds"),n.minutes=e.el.find(".minutes"),n.hours=e.el.find(".hours"),n.survey=e.el.find(".survey"),t=new Date(2019,0,23,23,59),a=setInterval(c.time,1e3),n.join.on("click",d),n.whitepaper.on("click",l),n.c.find(".exploremore").on("click",c.explore),window.addEventListener("scroll",c.fixed),f.tes(),f.lenta(),s.init(function(){f.survey()}),c.videoWidth(n.c.find(".videoContent")),e.clbk(null,e)}}};return p.run=function(e){var t=p.addEssense(n,a,e);p.init(t,e)},p.stop=function(){_.each(n,function(e){e.destroy()})},p}();"undefined"!=typeof module?module.exports=about:(app.modules.about={},app.modules.about.module=about);
 /*_____*/ 
var userpage=function(){var d=new nModule,t={},o=function(e){var r,n=deep(e,"history"),o=null,i=null,a=null,p=[],s={eachReport:function(a,e,n){e||(e=p);var r=function(e,o,i){o||(o=0),i||(i=""),_.each(e,function(e,n){var t=i;t&&(t+="_"),t+=e.id,e.reports?a.group(e,o,t,function(){r(e.reports,o+1,t)},n):a.report(e,o,t)})};r(e,0,n)},findReport:function(e){var i=function(e,n){var t=n.split("_");if(!t.length)return null;n=t[0];var o=_.find(e||[],function(e){return e.id==n});return o?(t.splice(0,1),(n=t.join("_"))&&o.reports?i(o.reports,n):o):null};return i(p,e)},mobileReports:function(){var i=[];return s.eachReport({group:function(e,n,t,o){e.mobile&&i.push(e),o()},report:function(e){e.mobile&&i.push(e)}}),i.push({name:d.app.localization.e("signout"),id:"signout"}),i},selector:function(){var e=s.mobileReports(),n=_.map(e,function(e){return e.id}),t=_.map(e,function(e){return e.text||e.name}),o=new Parameter({type:"VALUES",name:"Contents",id:"contents",possibleValues:n,possibleValuesLabels:t,defaultValue:n[0]});return o.value=parameters().id||n[0],o._onChange=function(e){if("signout"==e)c.signout();else{var n=s.findReport(e),t=parameters();t.report=n.report,t.id=n.id;var o="userpage"+collectParameters(t);d.nav.api.load({open:!0,href:o,history:!0})}},o}},c={closeGroup:function(e){var n=s.findReport(e);if(n){n.active=!n.active;var t=r.c.find('[levelid="'+e+'"]');n.active?t.addClass("active"):t.removeClass("active")}},openTree:function(a){s.eachReport({group:function(e,n,t,o){var i=r.c.find('[levelid="'+t+'"]');0==a.indexOf(t)?(e.active=!0,i.addClass("active"),o()):(e.active=!1,i.find(".openReport").removeClass("active"))},report:function(e,n,t){var o=r.c.find('[id="'+t+'"]');a==t?(e.active=!0,o.addClass("active")):(e.active=!1,o.removeClass("active"))}})},openReport:function(e,n){r.c.find(".openReport").removeClass("active"),r.c.find('[rid="'+e+'"]').addClass("active"),c.openTree(e),t.report(e),n&&d.nav.api.history.addParameters({id:e})},signout:function(){d.app.user.signout(),d.app.reload({href:"authorization"})}},l=function(){var e=$(this).closest("[levelid]").attr("levelid");c.closeGroup(e)},u=function(){var e=$(this).attr("rid");c.openReport(e,!0)},t={bgcaption:function(e){s.selector();r&&r.bgcaption&&d.shell({name:"bgcaption",el:r.bgcaption.find(".bgCaptionInner"),data:{}},function(e){})},contents:function(n){var t=s.selector();d.shell({name:"contents",el:r.contents,data:{reports:p,each:s.eachReport,selector:t}},function(e){e.el.find(".groupNamePanelWrapper").on("click",l),e.el.find(".openReport").on("click",u),ParametersLive([t],e.el),n&&n()})},report:function(e,t){o&&o.destroy();var n=s.findReport(e);d.shell({name:"report",el:r.report,data:{}},function(e){d.nav.api.load({open:!0,id:n.report,el:e.el.find(".reportCnt"),animation:!1,primary:!0,essenseData:{sub:n.sub},clbk:function(e,n){o=n,i&&i.apply(),t&&t()}})})}},f=function(){};d.authclbk=function(){t.bgcaption()};return{primary:n,getdata:function(n){(p=[]).push({name:d.app.localization.e("rstate"),id:"ustate",report:"ustate",mobile:!0,if:function(){if(a)return!0}}),p.push({name:"Notifications",id:"notifications",report:"notifications",mobile:!0}),p.push({name:d.app.localization.e("rwallet"),id:"wallet",report:"wallet",mobile:!0}),p.push({name:d.app.localization.e("rprofile"),id:"test",report:"test",mobile:!0}),p.push({name:d.app.localization.e("rsettings"),id:"usersettings",report:"usersettings",mobile:!0}),p.push({name:d.app.localization.e("raccounts"),id:"accounts",report:"accounts",mobile:!0});var t={};parameters();t.p2pkh=d.app.platform.sdk.address.pnet(),d.app.platform.sdk.ustate.me(function(e){a=e,n(t)})},destroy:function(){o&&o.destroy(),o=null,i&&i.destroy(),i=null,$("#menu").removeClass("abs"),r={}},init:function(e){f(),(r={}).c=e.el.find("#"+d.map.id),r.contents=r.c.find(".contents"),r.report=r.c.find(".report"),r.bgcaption=r.c.find(".bgCaption"),$("#menu").addClass("abs"),new Caption({container:r.c,caption:r.c.find(".captionfwrapper"),offset:[0,0]}).init(),r.c.on("click",".signout",function(){c.signout()}),function(e){t.bgcaption();var n=parameters().id||"ustate";t.contents(function(){c.openReport(n),e&&e()}),isMobile()||(i=new Roller({selector:".roller",inner:".cnt",cnt:r.c.find(".maketsWrapper"),offset:65}).init().apply())}(function(){e.noscroll=d.app.actions.scrollBMenu(),e.clbk(null,e)})}}};return d.run=function(e){var n=d.addEssense(t,o,e);d.init(n,e)},d.stop=function(){_.each(t,function(e){e.destroy()})},d}();"undefined"!=typeof module?module.exports=userpage:(app.modules.userpage={},app.modules.userpage.module=userpage);
 /*_____*/ 
var main=function(){var y=new nModule,o={},a=function(n){var l,a,o=deep(n,"history"),e=null,i=null,t=null,s=null,r="common",d={panelTopPosition:function(){isMobile()||(45<$(window).scrollTop()?l.panel.closest(".fxd").addClass("dfxd"):l.panel.closest(".fxd").removeClass("dfxd"),d.panelPosition())},panelPosition:function(){var n=l.panel.closest(".fxd"),e=l.panel.closest(".mwork"),a=$(window).width();if(n.hasClass("dfxd")){var o=(a-1280)/2;o<0&&(o=0);var i=a-(e.offset().left+e.width())+0,t=a-i-350+0+0;n.css("right",i+"px"),n.css("left",t+"px")}else n.removeAttr("style")},showHideUp:function(){200<l.w.scrollTop()?l.up.addClass("active"):l.up.removeClass("active")},currentMode:function(){"recommended"==r?y.nav.api.history.addParameters({r:"recommended"}):"sub"==r?y.nav.api.history.addParameters({r:"sub"}):y.nav.api.history.removeParameters(["r"]),m.lenta(),h(),m.smallpanel()}},c=function(){r=$(this).attr("lenta"),d.currentMode()},p=function(){d.panelPosition()},u=function(){s=slowMade(function(){d.showHideUp()},s,30)},f=function(){_scrollTop(0)},m={smallpanel:function(){l.smallpanel.find(".item").removeClass("active"),l.smallpanel.find('.item[lenta="'+r+'"]').addClass("active")},share:function(){isMobile()||y.nav.api.load({open:!0,id:"share",el:l.share,animation:!1,clbk:function(n,e){t=e}})},panel:function(){y.nav.api.load({open:!0,id:"panel",el:l.panel,animation:!1,clbk:function(n,e){a=e,d.panelPosition(),window.addEventListener("resize",p),window.addEventListener("scroll",d.panelTopPosition)}})},lenta:function(){y.nav.api.load({open:!0,id:"lenta",el:l.lenta,animation:!1,mid:"main",essenseData:{hr:"index?"},clbk:function(n,e){i=e}})}},v=function(){},h=function(){y.app.user.isState(function(n){n&&(isMobile()||(console.log("currentMode",r),"common"==r?(m.share(),l.c.find(".bgCaption").removeClass("hidden")):(l.share.html(""),l.c.find(".bgCaption").addClass("hidden"))))})},w=function(n){localStorage.lentakey=parameters().r||"index",m.lenta(),h(),y.app.user.isState(function(n){n&&(isMobile()||m.panel())}),m.smallpanel()};return{primary:o,parametersHandler:function(n){localStorage.lentakey=parameters().r||"index",r=parameters().r?parameters().r:"common",m.lenta(),h(),n&&n()},authclbk:function(){void 0!==l&&l.c&&l.c.find(".bgCaption").removeClass("hidden")},getdata:function(n,e){var a=parameters();if(r=a.r?a.r:"common",beginmaterial=a.s||a.i||a.v||null,e.state||!o||"undefined"==typeof _Electron&&!window.cordova&&("common"!=r||beginmaterial)){n({})}else"undefined"!=typeof _Electron||window.cordova?y.nav.api.load({open:!0,href:"authorization",history:!0}):y.nav.api.load({open:!0,href:"video",history:!0})},destroy:function(){window.removeEventListener("scroll",u),window.removeEventListener("scroll",d.panelTopPosition),window.removeEventListener("resize",p),e&&e.destroy(),i&&i.destroy(),t&&t.destroy(),a&&a.destroy(),i=e=a=null},init:function(n){i=e=null,v(),(l={}).c=n.el.find("#"+y.map.id),l.share=l.c.find(".share"),l.lenta=l.c.find(".lentaWrapper"),l.panel=l.c.find(".panel"),l.up=l.c.find(".upbutton"),l.smallpanel=l.c.find(".smallpanell"),l.w=$(window),window.addEventListener("scroll",u),l.up.on("click",f),l.smallpanel.find(".item").on("click",c),w()}}};return y.run=function(n){var e=y.addEssense(o,a,n);y.init(e,n)},y.stop=function(){var a=null;return _.each(o,function(n){var e=n.destroy();e&&(a=e)}),a},y.authclbk=function(){_.each(o,function(n){n.authclbk()})},y}();"undefined"!=typeof module?module.exports=main:(app.modules.main={},app.modules.main.module=main);
 /*_____*/ 
var imageGalleryEdit=function(){var P=new nModule,a={},n=function(e){var a,n,i=deep(e,"history"),t=null,r=0,l=!1,p=null,o=null,s=null,c={normal:{name:"Normal"},vintage:{name:"Vintage"},oldBoot:{name:"Old Boot"},clarity:{name:"Clarity"},sunrise:{name:"Sunrise"},crossProcess:{name:"Cross Process"},orangePeel:{name:"Orange Peel"},love:{name:"Love"},jarques:{name:"Jarques"},pinhole:{name:"Pinhole"}},d={},f={back:function(){--r<0&&(r=n.images.length-1),y()},next:function(){++r>=n.images.length&&(r=0),y()},initialValue:function(){n.initialValue&&(r=n.initialValue)},filters:function(){return(l=!l)?(a.c.addClass("filters"),h.filters()):a.c.removeClass("filters"),u.resize(),l},caman:function(e,i){var a="#galleryImage";i&&(a=i),o&&!i?e&&e(o):Caman(a,function(){i||(o=this),e&&e(this)})},crop:function(){return p?(p.destroy(),p=null,!1):(f.caman(function(){var e=a.imagesWrapper.find("#galleryImage"),i=e.parent();t=o,n.crop||(n.crop={}),p=new Cropper(e[0],{aspectRatio:n.crop.aspectRatio||null,autoCropArea:n.crop.autoCropArea||.9,crop:function(e){var i=o.width,a=o.height,n={x:e.detail.x/i,y:e.detail.y/a,w:e.detail.width/i,h:e.detail.height/a};d.crop=n},ready:function(){i.find(".cropper-container").addClass(n.crop.style||""),i.find(".cropper-crop-box").append('<div class="applyCrop center" action="apply">\t\t\t\t\t\t\t\t\t<span class="fa fa-check" aria-hidden="true"></span>\t\t\t\t\t\t\t\t</div>'),i.find(".applyCrop").on("click",function(){f.apply("crop"),h.savePanel()})}})}),!0)},camanFilter:function(e,i,a){e.revert(!1),"normal"!=i&&e.newLayer(function(){this.opacity(50),this.copyParent(),this.filter[i]()}),e.render(a)},previewFilter:function(e,i){var a=e.attr("filter"),n=e.attr("imageId");Caman("#"+n,function(){f.camanFilter(this,a,function(){e.animate({opacity:1})})}),e.on("click",function(){f.caman(function(){f.camanFilter(o,a,function(){t=o,d.filter=a,h.savePanel(),u.resize()})})})},applyFilters:function(t,e,r,l){"crop"!=e?"filter"==e&&f.caman(function(e){f.camanFilter(e,t,function(){l&&l()})},r):f.caman(function(e){var i=e.canvas.width,a=e.canvas.height,n={x:t.x*i,y:t.y*a,width:t.w*i,height:t.h*a};e.crop(n.width,n.height,n.x,n.y),e.resize({width:n.width,height:n.height}),e.render(function(){e.resetOriginalPixelData(),e.cropped=!1,e.cropCoordinates={x:0,y:0},e.originalHeight=n.height,e.originalWidth=n.width,e.preScaledHeight=n.height,e.preScaledWidth=n.width,e.resized=!1,r||u.resize(),l&&l()})},r)},apply:function(e,i){e&&d[e]&&(f.applyFilters(d[e],e,i),f[e](),a.c.find('[action="'+e+'"]').removeClass("active"))},close:function(){n.success?(topPreloader(20),n.success(n.images,function(){topPreloader(100),P.closeContainer()})):P.closeContainer()},exit:function(){n.apply&&(f.apply("crop"),f.save(!0)),f.close()},cancel:function(){d={},h.savePanel(),h.image({image:s})},save:function(e){f.checkUpdates()&&(s.original=o.toBase64(),d={},e||(h.savePanel(),h.image({image:s})))},checkUpdates:function(){return!!(d.filter&&"normal"!=d.filter||d.crop)}},u={resize:function(){u.bestFit(a.imagesWrapper.find(".image"),t)},bestFit:function(e,i){var a=e.closest(".imagesAbsWrapper"),n=e.find(".imgWrapper"),t=i.naturalWidth||i.width,r=i.naturalHeight||i.height,l=r/t;e.css("padding-top","0px");var o=e.width(),s=e.height(),c=a.width(),d=a.height();c<o&&(o=c),d<s&&(s=d),o<t&&(r=(t=o)*l),s<=r&&(t=(r=s)/l);var f=(s-r)/2;e.css("padding-top",f+"px"),i.canvas?(i.resize({width:t,height:r}),i.render()):(i.width=t,i.height=r,$(i).attr("data-camanwidth",t),$(i).attr("data-camanheight",r),$(i).css("opacity","1")),n.width(t),n.height(r),p&&p.resize({width:t,height:r})},nFormat:function(e){return e<10&&(e="0"+e),e}},m=function(){var e=$(this).attr("action");f[e]()},g=function(){var e=$(this).attr("action"),i=$(this);f[e]()?i.addClass("active"):i.removeClass("active")},h={savePanel:function(){(d.filter&&"normal"!=d.filter||d.crop)&&!n.apply?a.exitPanel.fadeOut(200,function(){a.savePanel.fadeIn(200)}):a.savePanel.fadeOut(200,function(){a.exitPanel.fadeIn(200)})},image:function(i){o=t=null,d={},h.savePanel(),p&&(p.destroy(),p=null,a.editPanel.find('.eitem[action="crop"]').removeClass("active")),a.imageNavigation.find(".number").html(u.nFormat(Number(r)+1)),$(window).off("resize",u.resize),i||(i={}),P.shell({name:"image",el:a.images,inner:html,display:"table",animation:!1,data:{data:n,image:i.image}},function(e){e.el.find("img").imagesLoaded(function(e){t=deep(e,"images.0.img"),s=i.image,u.resize(),$(window).on("resize",u.resize),l&&(l=!l,f.filters()),i.clbk&&i.clbk()})})},filters:function(i){i||(i={}),i.image||(i.image=n.images[r]),a.filters.html(""),resizeFit(i.image.original,80,80,function(e){P.shell({name:"filters",el:a.filters,data:{data:n,image:e,filters:c}},function(e){e.el.find(".preview").each(function(){f.previewFilter($(this),i.image)});var l=e.el.find(".filtersSwipe");swipedetect(l[0],function(e,i,a,n){var t=Number(l.css("margin-left").replace("px",""))+Number(1.7*i),r=-l.find(".filtersList").width()+l.closest(".filtersWrapperOvf").width();0<t&&(t=0),t<r&&(t=r),l.css("margin-left",t+"px")})})})}},v=function(){},y=function(){h.image({image:n.images[r],clbk:function(){n.apply&&(f.filters(),f.crop())}})},w=function(e){n.edit?P.nav.api.loadRelations({relations:[{src:"js/vendor/caman.full.min.js",f:"js",require:function(){Caman=require("../../js/vendor/caman.full.min.js").Caman}},{src:"js/vendor/cropper.js",f:"js",require:function(){Cropper=require("../../js/vendor/cropper.js"),console.log("Cropper",Cropper)}},{src:"css/cropper.min.css",f:"css"}]},e):e&&e()};return{primary:i,getdata:function(e){e({})},destroy:function(){$(window).off("resize",u.resize),console.log("ASDSADDSA"),a={}},init:function(e){console.log("ASDSADDS122121A"),s=t=o=null,l=!1,d={},n=e.essenseData||{},v(),f.initialValue(),(a={}).c=e.el.find("#"+P.map.id),a.imagesWrapper=e.el.find(".imagesWrapper"),a.images=e.el.find(".images"),a.imageNavigation=e.el.find(".imageNavigation"),a.arrows=a.imageNavigation.find(".arrow"),a.editPanel=a.c.find(".editPanel"),a.savePanel=a.c.find(".panel .savePanel"),a.exitPanel=a.c.find(".panel .exitPanel"),a.filters=a.c.find(".filters"),w(function(){y(),a.arrows.on("click",m),a.editPanel.find(".eitem").on("click",g),a.savePanel.find(".sitem").on("click",g),a.exitPanel.find(".sitem").on("click",g),e.clbk(null,e)})},wnd:{class:"allscreen black withoutButtons imageGalleryEdit"}}};return P.run=function(e){var i=P.addEssense(a,n,e);P.init(i,e)},P.stop=function(){_.each(a,function(e){e.destroy()})},P}();"undefined"!=typeof module?module.exports=imageGalleryEdit:(app.modules.imageGalleryEdit={},app.modules.imageGalleryEdit.module=imageGalleryEdit);
 /*_____*/ 
var discussions=function(){var y=new nModule,i={},t=function(s){var d,l,u,n,i=deep(s,"history"),t={},o={},e={},f=null,a=!1,c=null,r=null,p={preloader:function(s){d.c&&(s?d.c.addClass("loading"):d.c.removeClass("loading"))},inView:function(s,n,i){if(_.toArray(l).length&&d.c){var t=d.c.find(n||".discussion"),o="offset";"fixedin"==f.view&&(o="position");var e=inView(t,{inel:u,offset:0,mode:"part",f:o});if(0<e.length){var a={},c=_.map(e,function(s){var n=$(s).attr("chat");return a[n]=!0,l[n]});if(i){var r=[];_.each(l,function(s,n){a[n]||r.push(s)}),i(r)}s&&s(c)}}},chatp:function(s){l[s]&&(p.preloader(!0),retry(function(){if(o[s]||!t[s])return!0},function(){p.chat(l[s])}))},chat:function(n){r=!0,p.closeAll(function(){y.app.platform.sdk.chats.save();var s={open:!0,href:"chat",animation:!1,history:!0};"fixedin"==f.view?(s.history=!1,s.el=d.c.find(".chatWrapper"),s.essenseData={view:"fixedin",chat:n,destroyClbk:function(){r=!1,p.preloader(!0),d.c.removeClass("forChat"),s.el.html(""),m.discussions(null,function(){c=null,p.preloader(!1),u.scrollTop(0),setTimeout(function(){p.openInView()},100)})}},s.clbk=function(s,n){c=n,d.c.addClass("forChat"),p.preloader(!1)}):s.href="chat?chatid="+n.chat.id,y.nav.api.load(s)})},open:function(s,n){},remove:function(s){p.preloader(!0),p.close(s,function(){p.preloader(!1),y.app.platform.sdk.chats.remove(s),l=y.app.platform.sdk.discussions.fromChats(y.app.platform.sdk.chats.get("share"),f.author),d.c.find('.discussion[chat="'+s+'"]').remove(),m.empty()})},openInView:function(s){p.inView(function(s){_.map(s,function(s){return console.log(s),s.chat.id});_.each(s,function(s){p.open(s)})},".discussion:not(.dempty)",function(s){var n=_.map(s,function(s){return s.chat.id});p.closeMany(n)})},close:function(s,n){e[s]?retry(function(){if(!e[s])return!0},n):(e[s]=!0,retry(function(){if(o[s])return!0},function(){y.app.platform.rtc.destroy(s),delete e[s],delete o[s],delete t[s],n()}))},closeMany:function(s,n){lazyEach({array:s,action:function(s){var n=s.item;t[n]?p.close(n,s.success):s.success()},all:{success:function(){n&&n()}}})},closeAll:function(s){var n=_.map(t,function(s,n){return n});lazyEach({array:n,action:function(s){var n=s.item;p.close(n,s.success)},all:{success:function(){t={},o={},e={},s&&s()}}})}},h={inViewScroll:function(){n=slowMade(function(){r||(h.inView(),p.openInView())},n,200)},inView:function(){a||p.inView(function(s){a=!0,y.app.platform.sdk.discussions.info(s,function(s){m.fdiscussions(s,function(){a=!1}),l=y.app.platform.sdk.discussions.fromChats(y.app.platform.sdk.chats.get("share"),f.author)})},".discussion.dempty")},chat:function(){var s=$(this).closest(".discussion").attr("chat");p.chatp(s)},remove:function(){var s=$(this).closest(".discussion").attr("chat");p.remove(s)}},m={empty:function(){_.toArray(l).length?d.c.removeClass("sempty"):d.c.addClass("sempty")},message:function(s,n){y.shell({name:"message",inner:html,el:d.list.find('[chat="'+n+'"] .lastMessage'),data:{message:s}},function(s){})},discussion:function(s,n){var i=d.list.find('[chat="'+s.chat.id+'"]');s.share&&s.author?y.shell({name:"discussion",inner:html,el:i,data:{discussion:s}},function(s){i.removeClass("dempty"),s.el.find(".discussioncnt").on("click",h.chat),s.el.find(".remove").on("click",h.remove),n&&n()}):(i.remove(),n&&n())},fdiscussions:function(s,n){lazyEach({array:_.toArray(s),action:function(s){var n=s.item;m.discussion(n,s.success)},all:{success:function(){p.openInView(),n&&n()}}})},discussions:function(s,n,i){s||(s=l);var t=_.toArray(s);t=_.sortBy(t,function(s){return-s.chat.time}),y.shell({name:"discussions",inner:i||html,el:d.list,data:{discussions:t}},function(s){h.inView(),n&&n()})},discussionTemp:function(i,t,o){y.shell({name:"discussions",el:d.temp,data:{discussions:i}},function(s){var n=s.el.find(".discussion");y.app.platform.sdk.discussions.info(i,function(s){y.shell({name:"discussion",inner:html,el:n,data:{discussion:i[0],c:t}},function(s){n.removeClass("dempty"),n.on("click",function(){y.app.platform.sdk.chats.add(i[0].chat.id,"share")}),o&&o()})})})}},v=function(){};return{primary:i,getdata:function(s,n){f=n.settings.essenseData||{},a=!1;var i=y.app.platform.sdk.address.pnet().address+"addedtochat";localStorage[i]=!0,y.app.platform.sdk.chats.add("6768de97ad495c0110a9e09d43825ef24f1055449a5d368225ac102804397dc1_PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd","share");var t={};console.log("self.app.platform.sdk.chats.get('share')",y.app.platform.sdk.chats.get("share")),l=y.app.platform.sdk.discussions.fromChats(y.app.platform.sdk.chats.get("share"),f.author),t.discussions=l,s(t)},destroy:function(){u&&u.off("scroll",h.inViewScroll),delete y.app.platform.sdk.chats.clbks.discussions,p.closeAll(),c&&(c.destroy(),c=null),d={}},init:function(s){s,t={},opened={},r=!(o={}),v(),(d={}).c=s.el.find("#"+y.map.id),u="fixedin"==f.view?d.c.find(".discussionsWrapper"):$(window),d.list=d.c.find(".list"),d.temp=d.c.find(".gotoDisscussion"),u.on("scroll",h.inViewScroll),y.app.platform.sdk.chats.clbks.discussions=function(s,n,i){if("removeTemp"==n)return d.temp.html(""),void d.temp.fadeOut(1);var t=_.toArray(y.app.platform.sdk.discussions.fromChats([s]));"add"==n&&(l=y.app.platform.sdk.discussions.fromChats(y.app.platform.sdk.chats.get("share"),f.author),m.empty(),m.discussions(t,function(){p.chatp(t[0].chat.id)},prepend)),"addTemp"==n&&m.discussionTemp(t,i,function(){}),"addtwice"==n&&(m.discussions(),p.chatp(t[0].chat.id))},console.log("discussions",l),p.chatp("6768de97ad495c0110a9e09d43825ef24f1055449a5d368225ac102804397dc1_PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd"),s.clbk(null,s)}}};return y.run=function(s){var n=y.addEssense(i,t,s);y.init(n,s)},y.stop=function(){_.each(i,function(s){s.destroy()})},y}();"undefined"!=typeof module?module.exports=discussions:(app.modules.discussions={},app.modules.discussions.module=discussions);
 /*_____*/ 
var ustate=function(){var p=new nModule,e={},i=function(t){var e,i,o,n=deep(t,"history"),a=makeid(),u={profileInfo:{vis:"profileInfo",name:p.app.localization.e("sprofile"),bad:function(){return!p.app.user.validate()},if:function(){if(!o||"inf"==o)return!0}},waitActions:{vis:"waitActions",name:"",bad:function(){return!1},if:function(){if(o&&"inf"!=o)return!0}},post:{key:"post",vis:"scale",name:p.app.localization.e("spc"),bad:function(t){if(t<=2)return!0},if:function(){if(!o)return!0}},score:{key:"score",vis:"scale",name:p.app.localization.e("ssc"),bad:function(t){if(t<=8)return!0},if:function(){if(!o)return!0}},reputation:{key:"reputation",vis:"number",name:p.app.localization.e("srep"),bad:function(t){return!1}}},f=function(n){p.shell({name:"uscnt",el:e.c.find(".mwork"),data:{mestate:i,metrics:u}},function(t){n&&n()})},r=function(n){var t=u;u.profileInfo.bad()&&(t={profileInfo:u.profileInfo,reputation:u.reputation}),p.shell({name:"ustatecontent",el:e.ustatecontent,data:{metrics:t,mestate:i,waitActions:o}},function(t){n&&n()})},s=function(){},c=function(){p.app.platform.sdk.user.waitActions(function(n){p.app.platform.sdk.ustate.me(function(t){o=n,i=t,f(function(){e.ustatecontent=e.c.find(".ustatecontent"),r()})})})};return{primary:n,getdata:function(t){t({})},destroy:function(){e={},delete p.app.platform.sdk.ustate.clbks[a]},init:function(t){s(),(e={}).c=t.el.find("#"+p.map.id),(p.app.platform.sdk.ustate.clbks[a]=c)()},tooltip:{options:{minWidth:380,position:"left",functionPosition:function(t,n,e){return e.coord.top=10,e.coord.left+=10,e},theme:"tooltipster-light zindex ustatetooltip"}}}};return p.run=function(t){var n=p.addEssense(e,i,t);p.init(n,t)},p.stop=function(){_.each(e,function(t){t.destroy()})},p}();"undefined"!=typeof module?module.exports=ustate:(app.modules.ustate={},app.modules.ustate.module=ustate);
 /*_____*/ 
var menu=function(){var u=new nModule,a={},t=function(){var i,e=null,n=null,a=null,t=new Parameter({type:"VALUES",name:"Localization",id:"localization",defaultValue:app.localization.current().name,possibleValues:app.localization.availableMap("name"),format:{right:!0},_onChange:function(e){var n=app.localization.findByName(e);n&&n.key!=app.localization.key&&app.localization.set(n.key)}}),l={autoUpdate:function(){u.app.user.isState(function(e){})},elswidth:function(){i.c.find(".autowidth.active").each(function(){l.setWidth($(this))})},setWidth:function(e){if(e.offset()){var n=e.offset().left,a=e.width(),t=n-(i.c.width()-n-a);e.width(a+t)}},ah:function(e,n){0<n?e.addClass("amountHave"):e.removeClass("amountHave"),e.find(".amount").html(n)},sitenameToNav:function(){o.navinit.el&&(a=slowMade(function(){var e=u.app.nav.current.href;if(("index"==e||"author"==e)&&45<$(window).scrollTop()){i.nav.addClass("active"),i.c.addClass("menupanelactive"),i.nav.find(".pcenterLabel").removeClass("active");var n=parameters(u.app.nav.current.completeHref,!0).r||"empty";"index"==e&&i.nav.find('.pcenterLabel[r="'+n+'"]').addClass("active")}else i.c.removeClass("menupanelactive"),i.nav.removeClass("active");l.elswidth()},a,10))}},o={navinit:{init:function(e){isTablet()||($(window).on("scroll",l.sitenameToNav),u.app.nav.clbks.history.menu=function(e){l.sitenameToNav()})},destroy:function(){$(window).off("scroll",l.sitenameToNav),delete u.app.nav.clbks.history.menu}},sitename:{click:function(){u.app.user.isState(function(e){if("index"!=u.app.nav.get.pathname()){var n=localStorage.lentakey||"index";parameters().r==n&&(n="index"),"index"!=n&&(n="index?r="+n),e||(n="index"),u.nav.api.go({href:n,history:!0,open:!0,handler:!0})}})}},activate:{click:function(){dialog({header:u.app.localization.e("id167"),html:u.app.localization.e("id168"),class:"one",btn1text:u.app.localization.e("id169"),success:function(){u.app.platform.sdk.user.activateWithDialogs(function(e){})}})}},notifications:{init:function(n){var a=function(){return _.filter(u.app.platform.sdk.notifications.storage.notifications,function(e){if(!e.seen)return!0})};u.app.platform.sdk.notifications.init(function(){var e=a().length;l.ah(n,e),u.app.platform.api.electron.notifications(e,"notifications"),isMobile()||u.nav.api.load({open:!0,id:"notifications",el:n,inTooltip:!0})}),u.app.platform.sdk.notifications.clbks.added.menu=u.app.platform.sdk.notifications.clbks.seen.menu=function(){var e=a().length;l.ah(n,e),u.app.platform.api.electron.notifications(e,"notifications")}},click:function(e){isMobile()&&u.nav.api.go({href:"userpage?id=notifications&report=notifications",history:!0,open:!0})}},messenger:{init:function(e){var n=u.app.platform.clientrtc.rtchttp,a=function(){var a=0;return _.each(n.storage.chat,function(e,n){a+=e.messages.unreaded}),a};u.app.platform.clientrtc.rtchttp.info.allchats(function(){l.ah(e,a())}),u.app.platform.sdk.messenger.clbks.menu=function(){l.ah(e,a())}},click:function(e){isMobile()?u.nav.api.load({href:"messenger",history:!0,open:!0}):u.nav.api.go({href:"userpage?id=messenger&report=messenger",history:!0,open:!0})}},savecross:{init:function(a){var e=deep(u.app,"platform.sdk.user.storage.me.rc")||0;l.ah(a,e),u.app.platform.ws.messages.event.clbks.menusave=function(e){if("userInfo"==e.mesType){var n=deep(u.app,"platform.sdk.user.storage.me.rc")||0;l.ah(a,n)}}},click:function(){u.nav.api.load({open:!0,href:"socialshare",history:!0,inWnd:!0,essenseData:{rescue:!0}})}},search:{click:function(){i.c.toggleClass("searchactive"),i.c.hasClass("searchactive")?(i.postssearch.find("input").focus(),i.postssearch.addClass("active"),e&&(clearTimeout(e),e=null)):i.postssearch.removeClass("active"),l.elswidth()}},searchinit:{init:function(e){search(i.postssearch,{placeholder:"SEARCH ON POCKETNET...",clbk:function(e){e.find("input").on("blur",function(){})},last:{get:function(){return[]},tpl:function(e,n){}},events:{fastsearch:function(n,a){u.app.platform.sdk.search.get(n,"fs",function(e){s.results(e.fastsearch||[],n,function(e){a(e,function(e,n){e.find(".result").on("click",function(){var e=$(this).attr(".result");u.nav.api.go({href:"s?ss="+e,history:!0,open:!0}),n.closeResults()})})})})},search:function(e,n,a,t){u.nav.api.go({href:"s?ss="+e,history:!0,open:!0}),t.closeResults(),n&&n(!0)}}})}},newaccount:{click:function(){u.nav.api.go({href:"registration",history:!0,open:!0})}},ustate:{click:function(){isMobile()&&u.nav.api.go({href:"userpage?id=ustate&report=ustate",history:!0,open:!0})},init:function(a){isMobile()||u.nav.api.load({open:!0,id:"ustate",el:a,inTooltip:!0});var e=function(){u.app.platform.sdk.user.waitActions(function(n){u.app.platform.sdk.ustate.attention(1,function(e){isMobile()||(e||!u.app.user.validate()||n?a.removeClass("hidden"):a.addClass("hidden"),u.app.platform.sdk.ustate.me(function(e){e?(a.removeClass("disconected"),u.app.user.validate()&&n?a.addClass("wait"):a.removeClass("wait")):a.addClass("disconected")}))})})};e(),u.app.platform.sdk.ustate.clbks.menu=e,u.app.platform.ws.messages.transaction.clbks.menu=e}},wallets:{click:function(){u.nav.api.go({open:!0,href:"userpage?id=wallet",history:!0})},init:function(o){var s=o.find(".number"),c=!0,r=0,e=function(){u.app.platform.sdk.node.transactions.get.allBalance(function(e){var t,n,i,a=(e+=u.app.platform.sdk.node.transactions.tempBalance())-r;c&&(a=0,r=e),c=!1,t=r,n=a,i="good",o.removeClass("hidden"),n<0&&(i="bad"),0==n?s.text(u.app.platform.mp.coin(t)):s.animateNumber({number:n,numberStep:function(e,n){l.elswidth(),o.addClass(i);var a=Number(t+e).toFixed(8);$(n.elem).text(u.app.platform.mp.coin(a))}},rand(400,1200),function(){o.removeClass(i)}),r=e,u.app.platform.sdk.wallet.drawSpendLine(o.find(".numberWrp"))})},n=function(){e()};(u.app.platform.sdk.node.transactions.clbks.menu=n)()}},signout:{click:function(){u.app.user.signout(),u.app.reload({href:"authorization"})}},signin:{init:function(e){},click:function(){u.nav.api.go({href:"authorization",history:!0,open:!0})}},signup:{init:function(e){},click:function(){u.nav.api.go({href:"registration",history:!0,open:!0})}}},s={results:function(e,n,a){p||(p={}),u.shell({name:"results",data:{results:e,value:n}},function(e){a&&a(e.rendered)})}};return{getdata:function(e,n){var a={};t.value=app.localization.current().name,a.loc=t,a._SEO=_SEO,n.state,e(a)},destroy:function(){$(window).off("resize",l.elswidth),delete u.app.platform.sdk.node.transactions.clbks.menu,delete u.app.platform.ws.messages.event.clbks.menusave,delete u.app.platform.sdk.notifications.clbks.seen.menu,delete u.app.platform.sdk.notifications.clbks.added.menu,delete u.app.platform.sdk.messenger.clbks.menu,n&&clearInterval(n),_.each(o,function(e){delete e.el,e.destroy&&e.destroy()}),i={}},init:function(e){(i={}).c=e.el.find("#"+u.map.id),i.a=e.el.find(".additionalbar"),i.cart=i.c.find(".cart"),i.likes=i.c.find(".favorites"),i.messagesCount=i.c.find(".dialogs .count"),i.notificationsCount=i.c.find(".notifications .count"),i.walletsAmount=i.c.find(".wallets .amount"),i.notactive=i.c.find(".notactive"),i.currency=i.c.find(".currencyWrapper"),i.postssearch=i.c.find(".postssearch"),i.nav=i.c.find(".menutoppanel"),i.c.find("[events]").each(function(){var a=$(this),e=a.attr("events");o[e]&&(o[e].el=a,_.each(o[e],function(e,n){"init"==n?e(a):a.on(n,e)}))}),$(window).on("resize",l.elswidth),ParametersLive([t],i.c),n=setInterval(l.autoUpdate,100),u.app.user.isState(function(e){parameters().ss&&(i.c.addClass("searchactive"),i.c.find(".postssearch").addClass("active"),l.elswidth(),i.postssearch.find("input").val(parameters().ss))}),e.clbk(null,e)}}};return u.run=function(e){var n=u.addEssense(a,t,e);u.init(n,e)},u.stop=function(){_.each(a,function(e){e.destroy()})},u}();"undefined"!=typeof module?module.exports=menu:(app.modules.menu={},app.modules.menu.module=menu);
 /*_____*/ 
var scheduler=function(){var f=new nModule,t={},n=function(e){var s,r,a=deep(e,"history"),t=[],n=null,i=function(a){return _.find(t,function(e){return e.id==a})},o=function(a){return findIndex(t,function(e){return e.id==a})},d={postInterval:function(){n=setInterval(function(){var e=d.taskForTime();l.time(),e.length&&lazyEach({array:e,sync:!0,action:function(e){var a=e.item;f.app.platform.sdk.node.transactions.get.unspent(function(){d.post(a,function(){e.success()})},null,!0)}})},6e4)},missed:function(e){dialog({html:"You have <b>"+e.length+"</b> missed posts. Do you want to share it?",btn1text:"Yes",btn2text:"No",success:function(){_.each(e,function(e){d.post(e)})},fail:function(){_.each(e,function(e){e.time=null,l.task(e,null,!0)})}})},taskForTime:function(){var a=new Date;return _.filter(t,function(e){if(e.time&&e.ready&&a>e.time&&!e.remove)return!0})},post:function(n,s){if(n.share){var e=n.share.validation();e?(sitemessage(e),d.failPost(n.id),s&&s(!1)):f.app.platform.sdk.pool.dumpKey(r,n.address,function(e){if(e){var a=bitcoin.ECPair.fromPrivateKey(Buffer.from(e,"hex")),t=bitcoin.payments.p2pkh({pubkey:a.publicKey});n.module.post(function(e,a){e?d.successPost(n.id):(sitemessage(a),d.failPost(n.id)),s&&s(e)},{address:t,keys:a})}else sitemessage("noprivateley")})}else sitemessage("error"),d.failPost(n.id),s&&s(!1)},add:function(){var e={time:null,id:makeid(),share:new Share,address:f.app.platform.sdk.address.pnet().address,ready:!1};e.share.on.change.scheduler=function(){u.save()},t.push(e),l.task(e),u.save()},remove:function(e){var a=o(e);t.splice(a,1),u.save(),s.c.find('.shareAppendWrapper[t="'+e+'"]').remove()},failPost:function(a){var e=i(a);e.time=null,l.task(e,function(){l.ready();var e=s.c.find('.shareAppendWrapper[t="'+a+'"] .result');e.html('<i class="fas fa-exclamation-circle"></i>'),e.addClass("bad")},!0)},successPost:function(e){i(e).remove=!0;var a=s.c.find('.shareAppendWrapper[t="'+e+'"] .result');a.html('<i class="far fa-check-circle"></i>'),a.addClass("good"),l.ready(),u.save()}},c=function(){var e=$(this).closest(".shareTimeWrapper").attr("task"),a=i(e),t=function(){d.remove(e)};a&&(a.share.validation()?t():dialog({html:"Do you really want to remove this task?",btn1text:"Yes",btn2text:"No",success:t}))},l={tasks:function(e){lazyEach({array:t,action:function(e){var a=e.item;l.task(a,e.success)},sync:!0,all:{success:e}})},task:function(t,n,e){e||s.tasks.append('<div class="shareAppendWrapper" t="'+t.id+'">'),_el=s.tasks.find('.shareAppendWrapper[t="'+t.id+'"]'),f.shell({name:"task",el:_el,data:{task:t}},function(e){e.el.find(".remove").on("click",c);var a=e.el.find('.shareTimeWrapper[task="'+t.id+'"] .shareContainer');f.nav.api.load({open:!0,id:"share",el:a,animation:!1,_id:t.id,essenseData:{daddress:t.address||f.app.platform.sdk.address.pnet().address,dtype:t.ready,share:t.share,exoprtByTime:!0,pack:r||{},time:t.time,notClear:!0,changeArrange:function(){u.save()},selectTime:function(e){t.time=e,l.ready(),u.save()},address:function(e){t.address=e,l.ready(),u.save()},type:function(e){"p"==e&&d.post(t,function(){}),"t"==e&&(t.ready=!0),"w"==e&&(t.ready=!1),l.time(),l.ready(),u.save()}},clbk:function(e,a){t.module=a,n&&n()}})})},time:function(){var e=new Date;s.c.find(".timeCellWrapper .time").html(e.getHours()+":"+e.getMinutes())},ready:function(){var a=new Date,e=_.filter(t,function(e){if(e.time&&e.ready&&a<e.time&&!e.remove)return!0});s.c.find(".activeTasks .count").html(e.length)}},u={save:function(){var e=_.filter(t,function(e){if(!e.remove)return!0}),a=_.map(e,function(e){var a=null;return e.time&&(a=dateToStr(e.time)),{time:a,id:e.id,share:e.share.export(!0),address:e.address,ready:e.ready}});localStorage.tasks=JSON.stringify(a)},load:function(){var e=JSON.parse(localStorage.tasks||"[]");t=_.map(e,function(e){var a=new Share;a.import(e.share),a.on.change.scheduler=function(){u.save()};var t=null;return e.time&&(t=strToDate(e.time)),{time:t,id:e.id,share:a,address:e.address,ready:e.ready||!1}})}};return{primary:a,getdata:function(e){u.load(),e({tasks:t})},destroy:function(){s={},n&&clearInterval(n),n=null},init:function(e){var a,t,n;u.load(),(s={}).c=e.el.find("#"+f.map.id),s.tasks=s.c.find(".shares"),s.add=s.c.find(".addshare"),s.add.on("click",d.add),d.postInterval(),a=f.app.platform.sdk.address.pnet().address,t=f.app.platform.sdk.pool.getPack(a),n=function(){l.tasks();var e=d.taskForTime();l.time(),l.ready(),e.length&&d.missed(e)},t?(r=t[0],f.app.platform.sdk.pool.info(r,function(){n()})):n(),e.clbk(null,e)}}};return f.run=function(e){var a=f.addEssense(t,n,e);f.init(a,e)},f.stop=function(){_.each(t,function(e){e.destroy()})},f}();"undefined"!=typeof module?module.exports=scheduler:(app.modules.scheduler={},app.modules.scheduler.module=scheduler);
 /*_____*/ 
var userslist=function(){var f=new nModule,s={},t=function(e){var s,t,n=deep(e,"history"),i=[],o=!1,r=0,u=function(){$(window).scrollTop()+$(window).height()>$(document).height()-400&&!t&&!o&&c()},d=function(e,n){f.shell({name:"users",el:s.users,data:{addresses:e,commonkey:"subscribes"},inner:append},function(e){n&&n()})},a=function(e,n){t||(t=!0,topPreloader(80),f.sdk.users.get(e,function(){t=!1,topPreloader(100),n&&n()}))},c=function(e){var n=_.filter(i,function(e,n){if(10*r<=n&&n<10*(r+1))return!0});n.length?(a(n,function(){d(n,e)}),r++):o=!0},l=function(){};return{primary:n,getdata:function(e,n){r=0,t=o=!1;var s={};i=deep(n.settings,"essenseData.addresses")||[],s.addresses=i,s.empty=deep(n.settings,"essenseData.empty"),s.caption=deep(n.settings,"essenseData.caption"),e(s)},destroy:function(){window.removeEventListener("scroll",u),s={}},init:function(e){l(),(s={}).c=e.el.find("#"+f.map.id),s.users=s.c.find(".users"),c(function(){window.addEventListener("scroll",u)}),e.clbk(null,e)}}};return f.run=function(e){var n=f.addEssense(s,t,e);f.init(n,e)},f.stop=function(){_.each(s,function(e){e.destroy()})},f}();"undefined"!=typeof module?module.exports=userslist:(app.modules.userslist={},app.modules.userslist.module=userslist);
 /*_____*/ 
var post=function(){var D=new nModule,a={},t=function(s){var t,r,i,a,n=deep(s,"history")||deep(s,"primary");console.log("primary",s);var e=function(e){var s="https://pocketnet.app/"+i.hr+"s="+r.txid+"&mpost=true&ref="+D.app.platform.sdk.address.pnet().address+"&address="+(parameters().address||""),a=r.caption||r.message,t=trimHtml(a,20),n=r.images[0];if(!n&&r.url){var o=videoImage(r.url);o&&(n=o)}D.nav.api.load({open:!0,href:"socialshare",history:!0,inWnd:!0,essenseData:{url:s,caption:"Share publication in social",image:n,title:t}})},o=function(e){var s=deep(app,"platform.sdk.usersl.storage."+r.address)||{address:r.address,addresses:[]},a="send?address="+r.address+"&amount=1&message="+hexEncode(D.app.localization.e("postlabel")+" &mdash; "+(r.caption||r.message).substr(0,20)+"...")+"&label="+(s.name||s.address)+"&setammount=true";D.fastTemplate("donation",function(e){dialog({html:e,class:"one donation",btn1text:D.app.localization.e("dcancel"),clbk:function(e,s){e.find(".pnetdnt").on("click",function(){D.nav.api.load({open:!0,href:a,history:!0}),D.closeContainer(),s.destroy()}),e.find(".copy").on("click",function(){var e=$(this).closest(".address").find(".addr");copyText(e),sitemessage(D.app.localization.e("successfullycopiedaddress"))})}})},{userinfo:s})},c=function(){if(!isMobile()&&!n){var e=($(window).height()-t.wr.height())/2;0<e?t.wr.css("margin-top",e+"px"):t.wr.css("margin-top","0px")}},l=function(e){if(!D.app.platform.sdk.usersettings.meta.embedvideo||D.app.platform.sdk.usersettings.meta.embedvideo.value){var s=t.c.find(".js-player");if(s.length)new Plyr(s[0],{autoplay:!0,resetOnEnd:!0}).on("ready",function(){e&&e()})}},d=function(e,a){var s=r.upvote(e);if(console.log("upvoteShare",s,e),!s)return D.app.platform.errorHandler("4",!0),void(a&&a(!1));D.sdk.node.transactions.create.commonFromUnspent(s,function(e,s){console.log(e,s),topPreloader(100),e?a&&a(!0):(r.myVal=null,D.app.platform.errorHandler(s,!0),a&&a(!1))})},p=function(a){var e=r.complain();D.sdk.node.transactions.create.commonFromUnspent(e,function(e,s){console.log(e,s),topPreloader(100),e?(dialog({html:"<b>TXID:</b> "+e.txid,class:"one"}),a&&a(!0)):(t.postWrapper.addClass("showError"),sitemessage(errors.complain[s]),a&&a())})},u=function(a){D.app.platform.api.actions.unsubscribe(r.address,function(e,s){e||D.app.platform.errorHandler(s,!0),a&&a(e,s)})},m=function(a){D.app.platform.api.actions.subscribe(r.address,function(e,s){e||D.app.platform.errorHandler(s,!0),a&&a(e,s)})},f=function(s){var e=_.map(r.images,function(e){return{src:e}}),a=findIndex(e,function(e){if(e.src==s)return!0});D.app.nav.api.load({open:!0,href:"imagegallery?i="+r.txid+"&num="+(a||0),inWnd:!0,history:"true",essenseData:{initialValue:s,idName:"src",images:e}})},h=function(e){u(function(){tx&&t.share.find(".shareTable").removeClass("subscribed")})},g=function(e){m(function(e){e&&t.share.find(".shareTable").addClass("subscribed")})},v=function(){D.app.platform.sdk.node.transactions.get.tx(r.txid)},b=function(){var t=$(this).attr("value");D.app.user.isState(function(e){if(e){var a=$(this).closest(".stars");if(a.attr("value"))return;a.attr("value",t),a.addClass("liked"),d(t,function(e){if(e){r.scnt||(r.scnt=0),r.score||(r.score=0),r.scnt++,r.score=Number(r.score||0)+Number(t);var s=Number(r.score)/Number(r.scnt);a.find(".tstarsov").css("width",s/5*100+"%"),a.closest(".itemwr").find(".count span.v").html(s.toFixed(1)),C.stars(),i.like&&i.like(r)}else a.removeAttr("value"),a.removeClass("liked")})}else D.nav.api.load({open:!0,href:"authorization",history:!0})})},k=function(){dialog({html:"Do yor really want to complain on this post?",btn1text:"Yes",btn2text:"No",success:function(){t.share.addClass("complained"),topPreloader(30),p(function(e){topPreloader(100),e||s.removeClass("hidden")})}})},y=function(){var e=$(this).attr("i");f(e)},w=function(){e()},x=function(){o()},C={comments:function(){D.fastTemplate("commentspreview",function(e){var s=t.c.find(".commentsWrapper");D.nav.api.load({open:!0,id:"comments",el:s,eid:r.txid+"post",essenseData:{totop:t.c,caption:e,send:function(){var e=t.c.find(".commentsAction .count span");e.html(Number(e.html()||"0")+1)},txid:r.txid,showall:!0,reply:i.reply},clbk:function(e,s){c(),a=s}})},{share:r})},empty:function(){D.shell({name:"empty",el:t.share},function(e){c()})},images:function(e){var s=t.c.find(".image"),a=t.c.find(".images");!a.hasClass("active")&&s.length&&a.length?s.imagesLoaded({background:!0},function(o){"a"!=r.settings.v&&_.each(o.images,function(e,s){var a=e.img,t=$(o.elements[s]).closest(".imagesWrapper"),n=t.width();t.height(),a.width,a.height;t.height(n*(a.height/a.width))}),a.addClass("active"),s.addClass("active"),e&&e()}):e&&e()},share:function(s){D.shell({turi:"lenta",name:"share",el:t.share,data:{share:r,all:!0,mestate:{}}},function(e){c(),t.wr.addClass("active"),C.stars(function(){C.url(function(){c(),C.urlContent(function(){c(),l(),C.images(function(){c(),s&&s()})})})})})},stars:function(s){D.shell({turi:"lenta",name:"stars",el:t.share.find(".forstars"),data:{share:r}},function(e){fastars(e.el.find(".stars")),s&&s()})},url:function(s){var e=r.url,a=D.app.platform.sdk.remote.storage[e];D.shell({turi:"share",name:"url",el:t.c.find(".url"),data:{url:e,og:a,share:r}},function(a){var t=a.el.find("img");a.el.find("img").imagesLoaded({background:!0},function(e){_.each(e.images,function(e,s){e.isLoaded?($(t[s]).addClass("active"),500<e.img.naturalWidth&&a.el.addClass("bigimageinlink")):$(t[s]).closest(".image").css("display","none")}),s&&s()})})},urlContent:function(s){var e=r.url;if(e){var a=D.app.platform.parseUrl(e),t=D.app.platform.sdk.remote.storage[e];e&&!t?"youtube"==a.type||"vimeo"==a.type?s&&s():D.app.platform.sdk.remote.get(e,function(e){e?C.url(s):s&&s()}):s&&s()}else s&&s()}},T=function(){};return{primary:n,getdata:function(e,s){var a=deep(s,"settings.essenseData.share");if(i=deep(s,"settings.essenseData")||{},r=null,console.log("ID",a),a&&!(r=D.app.platform.sdk.node.shares.storage.trx[a])){var t=_.find(D.sdk.node.transactions.temp.share,function(e){return e.txid==a});t&&((r=new pShare)._import(t),r.temp=!0,r.address=D.app.platform.sdk.address.pnet().address)}console.log("SHARE",r,D.app.platform.sdk.node.shares.storage.trx,a);e({})},destroy:function(){t={},a&&a.destroy(),delete D.app.platform.ws.messages.event.clbks.post,delete D.app.platform.ws.messages.transaction.clbks.temppost,D.app.nav.api.history.removeParameters(["s"])},init:function(e){T(),(t={}).c=e.el.find("#"+D.map.id),t.share=t.c.find(".share"),t.wr=t.c.find(".postWrapper"),t.c.on("click",".stars i",b),t.c.on("click",".complain",k),t.c.on("click",".image",y),t.c.on("click",".txid",v),t.c.on("click",".donate",x),t.c.on("click",".sharesocial",w),t.c.on("click",".asubscribe",g),t.c.on("click",".aunsubscribe",h),D.app.platform.ws.messages.transaction.clbks.temppost=function(e){e.temp&&r.txid==e.temp.txid&&(r.temp=!1,r.scnt="0",r.score="0",r.myVal=0,C.share())},D.app.platform.ws.messages.event.clbks.post=function(e){"upvoteShare"==e.mesType&&e.share&&r.txid==e.share.txid&&C.stars(function(){})},D.app.platform.clbks.api.actions.subscribe.post=function(e){e==r.address&&t.c.find(".shareTable").addClass("subscribed")},D.app.platform.clbks.api.actions.unsubscribe.post=function(e){e==r.address&&t.c.find(".shareTable").removeClass("subscribed")},r?C.share(function(){C.comments()}):C.empty(),e.clbk(null,e)},wnd:{class:"withoutButtons postwindow",close:function(){}}}};return D.run=function(e){var s=D.addEssense(a,t,e);D.init(s,e)},D.stop=function(){_.each(a,function(e){e.destroy()})},D}();"undefined"!=typeof module?module.exports=post:(app.modules.post={},app.modules.post.module=post);
 /*_____*/ 
var aboutus=function(){var t=new nModule,o={},e=function(n){var u=deep(n,"history"),o=function(){};return{primary:u,getdata:function(n){n({})},destroy:function(){({})},init:function(n){o(),{}.c=n.el.find("#"+t.map.id),n.clbk(null,n)}}};return t.run=function(n){var u=t.addEssense(o,e,n);t.init(u,n)},t.stop=function(){_.each(o,function(n){n.destroy()})},t}();"undefined"!=typeof module?module.exports=aboutus:(app.modules.aboutus={},app.modules.aboutus.module=aboutus);
 /*_____*/ 
var test = (function(){

	var self = new nModule();

	var mdl = self;

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, lastTransaction, ed, ref; 

		var firstTime = false;

		var tempInfo = {
			language : /*self.app.localization.key ||*/ 'en'
		}

		var changedLoc = false;

		var actions = {		

			valid : function(v1, v2){
				if(!actions.equal((v1), (v2))){

					if(trim(v1.name) && v1.image) return true

				}
			},

			equal : function(v1, v2){

				var a = function(o){
					return 'name:' + (trim(o.name) || "") + 'image:' + (o.image || "") + 'about:' + (trim(o.about) || "") + 'site:' + (trim(o.site) || "")  + 'language:' + (o.language || "") + "addresses:" + JSON.stringify(o.addresses || [])
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

				if(el.c.find('.userPanel').hasClass('loading')){
					return
				}

				if(actions.equal(tempInfo, self.app.platform.sdk.user.storage.me)){
					sitemessage(self.app.localization.e('uchanges'))

					return
				}

				if(!actions.valid(tempInfo, self.app.platform.sdk.user.storage.me)){
					sitemessage(self.app.localization.e('uchangesvalid'))

					if(!trim(tempInfo.name)){	
						var pn = el.c.find('[parameter="name"] input')

						pn.focus()

						_scrollTo(pn)
					}
					else{
						if(!tempInfo.image){	
							var pn = el.c.find('.fileUploader')

							_scrollTo(pn)
						}	

						/*else
						{
							if(!tempInfo.about){	
								var pn = el.c.find('[parameter="about"] input')

								pn.focus()

								_scrollTo(pn)
							}	
						}*/
					}

						

					return
				}

				var userInfo = new UserInfo();

					userInfo.name.set(trim(tempInfo.name));
					userInfo.language.set(tempInfo.language);
					userInfo.about.set(trim(tempInfo.about));
					userInfo.site.set(trim(tempInfo.site));
					userInfo.image.set(tempInfo.image);
					userInfo.addresses.set(tempInfo.addresses);

					userInfo.ref.set(deep(ref, 'address') || '');

				topPreloader(40)

				el.c.find('.userPanel').addClass('loading')

				el.upanel.addClass('loading')

				userInfo.uploadImage(function(){


					self.sdk.node.transactions.create.commonFromUnspent(

						userInfo,

						function(tx, error){

							el.upanel.removeClass('loading')

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

								if (ref && firstTime){
									localStorage[self.app.platform.sdk.address.pnet().address + 'subscribeRef'] = ref.address
								}

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

				if(!el.upanel) return

				if(_.toArray((self.app.platform.sdk.node.transactions.temp.userInfo || {})).length > 0){

					el.upanel.addClass('wait')

					el.c.find('.caption').remove()

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

				console.log('self.app.platform.sdk.user.storage.me', self.app.platform.sdk.user.storage.me)

				tempInfo = _.clone(self.app.platform.sdk.user.storage.me)

				_.each(userOptions, function(parameter, id){
					var value = self.app.platform.sdk.user.storage.me[parameter.id];
					
					parameter.value = value || parameter.defaultValue || ''
					tempInfo[parameter.id] = parameter.value

					parameter._onChange = function(value){

						if(id == 'addresses'){
							tempInfo[parameter.id] = value;
						}
						else
						{
							tempInfo[parameter.id] = trim(value);
						}

						

						actions.upanel()

						if (id == 'language'){
							var a = self.app.localization.available[value];

							if (a && a.key != self.app.localization.key)
							{
								self.app.localization.lightSet(a.key);
							}
						}

						if (id == 'name'){
							self.app.platform.sdk.users.nameExist(tempInfo[parameter.id], function(exist){

								if(!exist || exist == self.app.platform.sdk.address.pnet().address){
									el.c.find('.errorname').fadeOut();
								}
								else
								{
									el.c.find('.errorname').fadeIn();
								}

								
							})	
						}
					}

					//if(id == 'ref'){

						//self.app.platform.api.inputs.user(parameter)

					//}
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
				name : 'Nickname',
				id : 'name',
				type : "STRING",
				onType : true,
				require : true
			}),

			language : new Parameter({
				name : self.app.localization.e('ulanguage'),
				id : 'language',
				type : "VALUES",
				defaultValue : /*self.app.localization.key || */'en',
				possibleValues : ['en'/*, 'ru'*/],
				possibleValuesLabels : ['English'/*, 'Русский'*/],
			}),

			about : new Parameter({
				name : self.app.localization.e('uabout'),
				id : 'about',
				type : "TEXT",
				onType : true,
				
				placeholder : 'Please write a few words about yourself to help people decide if they want to follow you'
			}),

			site : new Parameter({
				name : self.app.localization.e('uwebsite'),
				id : 'site',
				type : "TEXT",
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
			},

			/*ref : new Parameter({
				name : "Referal",
				id : 'ref',
				type : "BOOLEAN",
				onType : true,
				value : ''
			}),*/
			
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
						tempInfo : tempInfo,
						ed : ed
					},

				}, function(_p){

					initUpload({
						el : _p.el.find('.pgroup'),
			
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
			unspent : function(unspent, clbk){
				self.shell({

					name :  'unspent',
					el :   el.unspent,
					data : {
						unspent : unspent
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

			el.c.find('.refRemove').on('click', function(){
				ref = null;

				delete localStorage['ref']

				el.c.find('.referalMaketWrapper').remove()
			})
		}

		var make = function(){

			renders.caption()

			renders.icon();

			renders.options();

			self.sdk.node.transactions.get.unspent(function(unspent){
				renders.unspent(unspent)
			})

			self.app.platform.ws.messages.transaction.clbks.utemp = function(data){
				if(data.temp){
					if(data.temp.type == 'userInfo'){
						actions.upanel()
					}
				}
			}
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

				ref = null
				changedLoc = true;

				ed = p.settings.essenseData;

				self.app.platform.sdk.user.get(function(){

					if(_.isEmpty(self.app.platform.sdk.user.storage.me)){
						firstTime = true

						var _r = self.app.ref;

						if (_r && _r != self.app.platform.sdk.address.pnet())

						ref = _r;
					}

					prepare();

					var data = {};

						data.p2pkh = self.app.platform.sdk.address.pnet()

						data.setNode = setNode;
						data.setAddressType = setAddressType;
						data.userOptions = userOptions;
						data.tempInfo = tempInfo;
						data.firstTime = firstTime;
						data.ref = ref;

					if(ref){
						self.sdk.users.get(ref, function(){

							var address = ref;

							ref = self.sdk.users.storage[address] || null;

							if(ref) ref.address = address;

							
							data.ref = ref;

							clbk(data);

						})
					}
					else
					{
						clbk(data);
					}

					

				})

			},

			destroy : function(){
				el = {};



				if(self.app.platform.sdk.user.storage.me && !actions.equal(tempInfo, self.app.platform.sdk.user.storage.me)){
					
					return function(clbk){


						var locF = function(){

							delete self.app.platform.ws.messages.transaction.clbks.utemp
							
							clbk()

						}

						dialog({
							html : self.app.localization.e('usavechanges'),
							btn1text : self.app.localization.e('dyes'),
							btn2text : self.app.localization.e('dno'),
							success : function(){
								actions.save(locF)
							},

							fail : function(){

								tempInfo = _.clone(self.app.platform.sdk.user.storage.me)
								
								locF()
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
				el.icon = el.c.find('.pgroupIconWrapper');

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
var chat=function(){var b=new nModule,k={},n=function(e){var t,m,n=deep(e,"history"),a=makeid(),d={},l=null,f=null,s=null,i=0,u=null,p=null,h={},g={},v={preloader:function(e){e?m.c.addClass("loading"):m.c.removeClass("loading")},close:function(){b.removeEssense(k,a),d.closeClbk&&d.closeClbk()},sendClbk:function(e,t,n){var a=m.messages.find("#"+e.EncryptedMessageID);t?(e.EncryptedMessageID=t,e.result="success",e.Message=n.note||"",e.Attachment=n.attachment||"",e.AttachmentName=n.attachmentName||"",e.AttachmentPreview=n.attachmentPreview||"",a.attr("id",e.EncryptedMessageID)):e.result="fail",a.removeClass("sending"),a.addClass(e.result)},mobileBuildHeight:function(){if("buildin"==d.view&&isMobile()){var e=m.c.find(".chatwindow").height(),t=$(window).height(),n=m.c.find(".chatmessages").height();e<=t-175&&n<e?m.c.find(".chatwindow").height(t-175):m.c.find(".chatwindow").css("height","auto")}},spacer:function(){if(v.mobileBuildHeight(),isTablet()){var e=0;0<m.messages.find(".chatmessage").length&&(m.c.find(".spacer").height(0),(e=m.c.find(".chatwindow").height()-m.c.find(".chatmessages").height()-10)<0&&(e=0),m.spacer.height(e+"px"))}},send:function(e){e&&u.rtc.send(e)},sendAttachment:function(e,n){b.app.platform.sdk.chats.send({attachment:e.attachment,attachmentName:e.attachmentName,attachmentPreview:e.attachmentPreview,temp:n},u.ThreadID,function(e,t){v.sendClbk(n,e,t)})},addTempMessage:function(e){var t=new Date;b.app.platform.timeDifference&&(t=t.addSeconds(b.app.platform.timeDifference/1e3));var n={Created:dateToStrUtcS(t),ThreadID:u.ThreadID,EncryptedMessageID:makeid(!0),temp:!0,UserID:b.app.user.data.id,decrypted:{Message:e.note,AttachmentName:e.attachmentName,AttachmentPreview:e.attachmentPreview}};return u.messages.push(n),o.messages(null,[n],!0),n},clearTempMessages:function(){m.messages.find(".temp").remove()},scrollToPx:function(e,t){if(!v.checkState())return!1;if(null!==t){var n=null,a=null,s="position";if("buildin"==d.view?(n=$(window),a=$("html"),s="offset"):(n=m.c.find(".chatwindow"),a=m.c.find(".chatmessages")),"toLast"==e||"toLast"==t){var i=m.messages.find(".chatmessage:nth-last-child(1)");if(i[s]()){var c=70;isMobile()&&(c=115),t=i[s]().top+i.height()+c-n.height(),n.scrollTop(t,200)}}else{var o=a.height();n.scrollTop(o-t,200)}}},scrollPx:function(e){var t=null,n=null,a=null;if(n="buildin"==d.view?(t=$(window),$("html")):(t=m.c.find(".chatwindow"),m.c.find(".chatmessages")),"toLast"==e)a="toLast";else{var s=m.messages.find(".chatmessage:nth-last-child(1)"),i="position";"buildin"==d.view&&(i="offset");inView(s,{inel:t,offset:-20,mode:"partall"});if(s&&s[i]()){var c=n.height(),o=t.scrollTop();a=c-s.height()-150,a=o+t.height()>a?"toLast":null}}return a},saveAttachment:function(e){topPreloader(30);var t=c.findEl(e);t&&t.addClass("saveAttachment"),b.app.platform.sdk.chats.getAttachment(e,function(e){topPreloader(100),t&&t.removeClass("saveAttachment"),e?e.ChatMessageAttach&&saveAs({download:e.decrypted.AttachmentName,file:e.ChatMessageAttach,noA:!0}):console.log("ERROR")})},openGallery:function(e){var t={idName:"EncryptedMessageID",initialValue:e.EncryptedMessageID,getImages:function(){return _.filter(u.messages,function(e){var t=deep(e,"decrypted.AttachmentName");if(t&&(-1<t.indexOf(".jpg")||-1<t.indexOf(".png")||-1<t.indexOf(".jpeg")))return!0})},getImage:function(e,n){e.ChatMessageAttach?n&&n({src:e.ChatMessageAttach,name:e.decrypted.AttachmentName}):b.app.platform.sdk.chats.getAttachment(e,function(e){var t={src:e.ChatMessageAttach,name:e.decrypted.AttachmentName};n&&n(t)})}};o.gallery(t)},getPreview:function(e){b.app.platform.sdk.chats.getPreview(e,function(e){_.each(e,function(e){var t=c.findEl(e);o.messages(null,[e],!0,t)})})},read:function(){i&&setTimeout(function(){i=0,v.countUnread()}),t=slowMade(function(){},t,1e3)},countUnread:function(){if(m.countUnread){var e=i;e?m.countUnread.html(e+' <i class="far fa-envelope"></i>'):m.countUnread.html(""),b.app.platform.api.electron.notifications(e,"messages")}},checkState:function(){if(!m.c.hasClass("minimized"))return!0}},w={minimize:function(){m.c.addClass("minimized"),d.minimizeClbk&&d.minimizeClbk(),l.clear(),f.clear(),m.type.blur()},expand:function(){m.c.removeClass("minimized"),d.expandClbk&&d.expandClbk(),isTablet()||m.type.focus(),v.spacer(),setTimeout(function(){v.scrollToPx("toLast","toLast")},100)},out:function(){b.app.modules.chats.module.api.add(u.ThreadID)},close:function(){v.close()},type:function(e,t){var n=this.getText();if(13==t.which||13==t.keyCode)return n&&(this.setText(""),v.send(n),$(this).val("")),!1},resizeWindow:function(){l&&l.setOffset([0,0]),f&&f.setOffset([50,100])},getAttachment:function(){var e=$(this).closest(".chatmessage"),t=e.attr("id");if(!e.hasClass("sending")){var n=c.findMessage(t);if(n.decrypted&&n.decrypted.AttachmentName){var a=n.decrypted.AttachmentName.toLowerCase();-1<a.indexOf(".jpg")||-1<a.indexOf(".png")||-1<a.indexOf(".jpeg")?v.openGallery(n):v.saveAttachment(n)}}},messagesInView:function(){s=slowMade(function(){if(!v.checkState())return!1;var e,t=m.messages.find(".chatmessage"),n=m.messages.find(".chatmessage:nth-last-child(1)");"buildin"==d.view&&(e=$(window)),"fixedin"==d.view&&(e=m.c.find(".chatwindow"));var a=inView(t,{inel:e}),s=inView(n,{inel:e});if(0<a.length)_.map(a,function(e){var t=$(e).attr("id");return c.findMessage(t)});0<s.length&&v.read()},s,100)}},c={findMessage:function(t){return _.find(u.messages,function(e){return e.EncryptedMessageID==t})},findEl:function(e){return m.c.find("#"+(e.tm+e.f))}},o={gallery:function(e){e||(e={}),b.app.nav.api.load({open:!0,id:"imageGallery",inWnd:!0,essenseData:e})},safemessages:function(e,t){var s=_.map(g,function(e,t){return{m:e,t:t}});s=_.sortBy(s,function(e){return Number(e.t)});var i=[];_.each(s,function(t,n){var a={newmessages:[],oldmessage:t};_.each(e,function(e){(Number(e.tm)<Number(t.t)||n==s.length-1)&&(!n||Number(s[n-1].t)>Number(e.tm))&&a.newmessages.push(e)}),a.newmessages.length&&(a.newmessages.push(a.oldmessage.m),a.newmessages=_.sortBy(a.newmessages,function(e){return Number(t.t)}),i.push(a))}),i.length?lazyEach({array:i,action:function(e){var t=e.item,n=c.findEl(t.oldmessage);o.messages(e.success,t.newmessages,null,n)},all:{success:t}}):o.messages(t,e)},messages:function(t,a,n,e){a=_.filter(a,function(e,t){var n=e.tm;if(17==e.tm.length&&(e.tm=n+"0"),!(p&&p.tm>e.tm))return!(a.length-50>t)});var s="toLast";a&&(s="fixed");var i=v.scrollPx(s);a||(a=[]),a=_.filter(a,function(e){var t=e.tm+e.f;return!!e.tm&&(h[t]?void 0:(h[t]=!0,g[e.tm]=e,!0))});var c=_.sortBy(a,function(e){var t=e.tm;return 17==e.tm.length&&(e.tm=t+"0"),Number(e.tm)});n||v.clearTempMessages();var o=append,r=m.messages;e&&(o=replaceWith,r=e),a.length?(p=c[c.length-1],b.shell({name:"messages",el:r,data:{chat:u,messages:c},inner:o},function(e){d.messagesClbk&&d.messagesClbk(),m.messages.find(".attachment").off("click"),m.messages.find(".attachment").on("click",w.getAttachment),w.messagesInView(),0<m.messages.find(".chatmessage").length?m.c.find(".other").fadeOut(1):m.c.find(".other").fadeIn(1),n&&(i="toLast"),v.spacer(),setTimeout(function(){v.scrollToPx(s,i)},20),l&&l.action(),f&&f.action(),v.countUnread(),t&&t()})):t&&t()}},r=function(){};return{primary:n,getdata:function(t,e){var n={},a=deep(e,"settings.essenseData.chat");if(!a){var s=parameters().chatid;a=b.app.platform.sdk.discussions.fromChatId(s)}deep(e,"settings.essenseData");a&&(u=a.chat,b.app.platform.sdk.chats.info([a.chat],function(e){n.chat=a,b.app.platform.sdk.tempmessenger.getChat(a.chat),n.canEnc=!0,t(n)}))},destroy:function(){t&&clearInterval(t),m.type&&m.type.blur(),$("html").off("mousemove",w.messagesInView),window.removeEventListener("scroll",w.messagesInView),window.removeEventListener("resize",w.resizeWindow),function(){b.app.platform.ws;$(window).off("focus",v.read),$(window).off("mousemove",v.read),delete u.rtc.clbks.receive.message.messenger,delete u.rtc.clbks.receive.messages.messenger,delete u.rtc.clbks.send.message.messenger}(),s&&clearTimeout(s),m={},l&&l.destroy(),f&&f.destroy(),u=l=f=null,clearInterval(null),0,$("#tawkchat-container").fadeIn(),d.destroyClbk&&d.destroyClbk()},init:function(e){h={},g={},(d=e.essenseData||{}).view||(d.view="buildin"),r(),(m={}).c=e.el.find("#"+b.map.id),m.messages=m.c.find(".chatmessages"),m.type=m.c.find(".type"),m.attachement=m.c.find(".attachement"),m.countUnread=m.c.find(".countUnread"),m.spacer=m.c.find(".spacer"),m.c.addClass(d.view),function(){if("buildin"==d.view){isMobile()||(l=new Caption({container:m.c.find(".chatWrapper"),caption:m.c.find(".captionfwrapper"),offset:[0,0]}).init());var e=0;isMobile()&&(e=50),f=new Caption({container:m.c.find(".chatWrapper"),caption:m.c.find(".bcaptionfwrapper"),offset:[e,2*e],pos:"bottom"}).init(),m.c.find(".out").on("click",w.out),window.addEventListener("scroll",w.messagesInView),window.addEventListener("resize",w.resizeWindow),$("html").on("mousemove",w.messagesInView)}"fixedin"==d.view&&(m.c.find(".close").on("click",w.close),m.c.find(".chatwindow").on("scroll",w.messagesInView),$("html").on("mousemove",w.messagesInView)),m.c.find(".minimize").on("click",w.minimize),m.c.find(".expand").on("click",w.expand),m.countUnread.on("click",function(){w.expand()}),m.type.emojioneArea({pickerPosition:"top",search:!1,tones:!1,attributes:{spellcheck:!0,autocomplete:"on"},events:{keyup:w.type,onLoad:function(e,t){}}}),initUpload({el:m.attachement,ext:["png","jpeg","jpg","pdf"],multiple:!0,maxFileSize:5,dropZone:m.c.find(".chatWrapper"),beforeUpload:function(e){var a=deep(e,"file.name");if("png"==e.ext||"jpeg"==e.ext||"jpg"==e.ext)resize(e.base64,200,200,function(t){var n=v.addTempMessage({attachmentName:a,attachmentPreview:t});resize(e.base64,1600,1600,function(e){v.sendAttachment({attachment:e,attachmentName:a,attachmentPreview:t},n)})});else{var t=v.addTempMessage({attachmentName:a});v.sendAttachment({attachment:e.base64,attachmentName:a},t)}}})}(),function(){if(u.rtc.clbks.receive.message.messenger=function(e){!b.app.platform.focus&&b.app.platform.titleManager&&b.app.platform.titleManager.add("You have new messages"),p=e,b.app.platform.sdk.messenger.load.messages(e,function(){o.messages(null,[e])})},u.rtc.clbks.receive.messages.messenger=function(e){i++,b.app.platform.sdk.messenger.load.messages(e,function(){o.messages(null,e,!0)})},u.rtc.clbks.send.message.messenger=function(e){b.app.platform.sdk.messenger.load.messages(e,function(){p=e,o.messages(null,[e],!0)})},u){var e=_.toArray(u.rtc.storage._db||{});b.app.platform.sdk.messenger.load.messages(e,function(){o.messages(null,e,!0)}),u.rtc.connect(function(){})}}(),function(){b.app.platform.ws;$(window).on("focus",v.read),$(window).on("mousemove",v.read)}(),v.countUnread(),e.clbk(null,e)},id:a,api:w}};return b.run=function(e){var t=b.addEssense(k,n,e);b.init(t,e)},b.stop=function(){_.each(k,function(e){e.destroy()})},b}();"undefined"!=typeof module?module.exports=chat:(app.modules.chat={},app.modules.chat.module=chat);
 /*_____*/ 
var comments=function(){var x=new nModule,t={},s=function(e){var d,r,m,t,s,i,o,n=deep(e,"history"),f={},a=!1,l=!1,c=!1,p={content:"message empty",share:"hasn't share",messagelength:"Comments have 1000 character limit per comment",money:"hasn't money",network:"network error"},u={},h={},v=/[,.!?;:() \n\r]/g,w=function(e,n,t,s,i,o,a){if(t==r&&(d.c.find(".sending").removeClass("sending"),!e)){T.save(),d.c.find(".emojionearea-editor").blur(),d.c.find(".att").html("");var l={comments:[n]};if(delete f[a],"0"==a)h[a]&&h[a].setText(""),l.class="firstcomment";else{var c=d.c.find("#"+a);o?(c.find(".edit").html(""),n.timeupd=n.timeupd.addMinutes(1),delete h[a],delete u[a],c.removeClass("editing"),l.inner=replaceWith,l.el=c):(c.find(".answer").html(""),c.find(".repliescount").html(Number(c.find(".repliescount").html()||"0")+1),c.find(".replies").removeClass("hidden"),l.el=d.c.find("#"+a+" .answers"),delete h[a])}l.newcomments="newcomments",y.list(l),!o&&m.send&&m.send(n),o||(m.comments&&m.comments++,g.showhideLabel())}},g={removeForm:function(e){delete h[e],d.c.find("#"+e+" .answer").html(""),d.c.find("#"+e+" .edit").html("")},post:function(e,n,t,s){e||(e="0");var i=f[e];if(i){var o=i.validation();o?sitemessage(p[o]):g.send(i,function(e,n){},n,t,s,e)}},send:function(e,t,n,s,i,o){x.app.platform.sdk.comments.send(r,e,n,s,function(e,n){e?(x.app.platform.errorHandler(e,!0),t&&t(e,null)):t&&t(null,n)},i,o)},links:function(e,n){e||(e="0");var t=f[e];if(t&&!t.url.v){var s=null,i=n.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);i&&0<i.length&&(s=i[0]),s&&t.url.set(s)}},process:function(e){e||(e="0"),f[e]||(f[e]=new Comment(r))},message:function(e,n){e||(e="0"),f[e]&&f[e].message.set(n),T.save()},emessage:function(e,n){var t=n.getText();g.links(e,t),g.message(e,t)},fastreply:function(n){n&&g.replies(n.parentid||n.answerid,!0,function(){if(n.noaction){g.tocomment(n.answerid);var e=d.c.find("#"+n.answerid);e.addClass("newcommentsn"),setTimeout(function(){e.removeClass("newcommentsn")},2500)}else g.reply(n.parentid||n.answerid,n.answerid)})},reply:function(o,a){var e=d.c.find("#"+o).find(".answer");y.post(function(e,n){var t="0";a!=o&&(t=o);var s=x.app.platform.sdk.comments.address(r,a,t)||deep(m,"lastComment.address"),i="@"+(deep(x.app,"platform.sdk.usersl.storage."+s+".name")||s)+",  ";s==x.app.platform.sdk.address.pnet().address&&(i=""),e.setText(i),h[o]=e,n.focus(),i.length&&ecaretPosition(n,0,i.length)},{placeholder:"Send Reply",el:e,answer:"answer",pid:o,aid:a,id:o})},replies:function(n,e,t){if("0"!=n){var s={};s.el=d.c.find("#"+n+" .answers");var i=d.c.find("#"+n);void 0===e&&(i.hasClass("showedreplies")?e=!1:(e=!0,i.find(".repliesloaderWrapper").removeClass("hidden"))),e?b.level(n,function(e){i.find(".repliesloaderWrapper").addClass("hidden"),s.comments=x.app.platform.sdk.comments.storage[r][n],i.addClass("showedreplies"),y.list(s,function(){t&&t()})}):(_.each(x.app.platform.sdk.comments.storage[r][n],function(e){delete u[e.id]}),i.removeClass("showedreplies"),g.removeForm(n),s.el.html(""))}else t&&t()},getid:function(e){if(e.attr("answer")){(n=e.closest(".comment")).attr("id");return e.closest(".firstcomment").attr("id")}if(e.attr("edit")){var n;(n=e.closest(".comment")).attr("aid"),n.attr("pid");return n.attr("id")}return"0"},tocomment:function(e){_scrollTo(d.c.find("#"+e),s)},closeEdit:function(e){d.c.find("#"+e).removeClass("editing"),g.removeForm(e)},update:function(e){var n={},t=null;t=e?d.c.find("#"+id+" .answers"):(n.class="firstcomment",d.c.find(".list")),b.level(e,function(e){t.html(""),n.comments=e,y.list(n)})},hiddenCounts:function(e){0<e?d.showall.find(".ccounts").html("("+e+")"):d.showall.find(".ccounts").html()},showall:function(){c=!0,d.c.addClass("showedall"),g.showhideLabel(),l&&(l=!1,d.c.removeClass("listpreview"),d.c.find(".loaderWrapper").removeClass("hidden"),y.caption(),b.level(null,function(e){u={};var n={};n.comments=x.app.platform.sdk.comments.storage[r][0],n.class="firstcomment",n.inner=html,y.list(n,function(){d.c.find(".loaderWrapper").addClass("hidden")})}))},showhideLabel:function(){if(c)d.showall.addClass("hidden");else{var e=deep(x.app.platform,"sdk.node.shares.storage.trx."+r+".comments")||0;l?1<e?(d.showall.removeClass("hidden"),g.hiddenCounts(e-1)):d.showall.addClass("hidden"):5<e?(d.showall.removeClass("hidden"),g.hiddenCounts(e-5)):d.showall.addClass("hidden")}}},C={replyandreplies:function(){var e=$(this).closest(".firstcomment").attr("id");g.replies(e,!0);var n=$(this).closest(".comment"),t=(e=$(this).closest(".firstcomment").attr("id"),n.attr("id"));g.reply(e,t)},replies:function(){var e=$(this).closest(".firstcomment").attr("id");g.replies(e)},emessage:function(e,n){var t=g.getid(e.closest(".postbody"));g.emessage(t,this)},message:function(){var e=$(this).val(),n=g.getid(editor.closest(".postbody"));g.links(n,e),g.message(n,e)},reply:function(){var e=$(this).closest(".comment"),n=$(this).closest(".firstcomment").attr("id"),t=e.attr("id");g.reply(n,t)},tocomment:function(){var e=$(this).attr("comment");g.tocomment(e)},metmenu:function(){var t=$(this),s=t.closest(".comment"),e=s.attr("id"),n=s.attr("pid"),i=x.app.platform.sdk.comments.find(r,e,n),o={address:x.app.user.address.value,caddress:x.app.platform.sdk.comments.address(r,e,n)};x.fastTemplate("metmenu",function(e,n){x.app.platform.api.tooltip(t,function(){return n(o)},function(e){e.find(".edit").on("click",function(){y.edit(s,i),t.tooltipster("hide")}),e.find(".remove").on("click",function(){t.tooltipster("hide")})},{theme:"zindex lighttooltip"})},o)}},k=function(i,t,s){var e=t.el.find(".leaveComment"),o=t.el.find(".postbody");e.emojioneArea({pickerPosition:"bottom",search:!1,tones:!1,autocomplete:!1,attributes:{spellcheck:!0},events:{change:C.emessage,click:C.emessage,keyup:function(e,n){var t=String.fromCharCode(n.keyCode||n.which),s=this.getText();if(v.test(t)&&g.links(s),n.ctrlKey&&13==n.keyCode){if(o.hasClass("sending"))return;return o.addClass("sending"),void g.post(i.id||"0",i.pid,i.aid,i.editid)}g.message(i.id||"0",s)},onLoad:function(e,n){(m.init||i.init)&&(t.el.find(".emojionearea-editor").focus(),m.init=!1),i.value&&this.setText(i.value),s&&s(this,t.el.find(".emojionearea-editor"))}}}),t.el.find(".emojionearea-editor").on("focus",function(){g.process(i.id||"0")}),g.process(i.id||"0"),t.el.find(".postaction").on("click",function(){o.hasClass("sending")||(o.addClass("sending"),g.post(i.id||"0",i.pid,i.aid,i.editid))}),i.id&&t.el.find(".closeEdit").on("click",function(){g.closeEdit(i.id)}),t.el.find(".closeAnswer").on("click",function(){g.removeForm(i.id||"0")})},y={cpreview:function(e){e||(e=m.caption),d.caption.find(".captionPreview").html(e),bgImages(d.caption.find(".captionPreview"))},caption:function(n){m.caption&&x.shell({name:"caption",el:d.caption,data:{ed:m}},function(e){y.cpreview(),t=new Caption({container:d.c,caption:d.c.find(".captionfwrapper"),offset:[i,-100],removeSpacer:!0,iniHeight:!0,_in:s}).init(),e.el.find(".close .cact").on("click",function(){m.close&&m.close()}),e.el.find(".top .cact").on("click",function(){m.totop&&_scrollToTop(m.totop,s,0,-65)}),e.el.find(".bottom .cact").on("click",function(){var e=d.c.find(".post .emojionearea-editor");_scrollTo(e,s),e.focus()}),n&&n()})},edit:function(e,n){e.addClass("editing"),y.post(function(e,n){},{value:n.message,init:!0,edit:"edit",el:e.find(".edit"),pid:n.parentid,aid:n.answerid,id:n.id,editid:n.id})},post:function(n,t){t||(t={});var s=a&&!t.answer&&!t.editid;x.shell({name:"post",el:t.el||d.post,data:{placeholder:t.placeholder||"",answer:t.answer||"",edit:t.edit||"",preview:s}},function(e){s?e.el.find("textarea").on("click",function(){a=!1,$(this).blur(),t.init=!0,d.c.removeClass("preview"),k(t,e,n)}):k(t,e,n)})},list:function(e,n){e||(e={}),e.comments=_.filter(e.comments||[],function(e){if(!u[e.id])return u[e.id]=!0}),e.comments=_.sortBy(e.comments,function(e){return e.time}),x.shell({name:"list",el:e.el||d.list,inner:e.inner||append,data:{comments:e.comments||[],_class:e.class||"",newcomments:e.newcomments||"",replaceName:function(e,n){return'<span class="tocomment" comment="'+n.comment+'">'+e+"</span>"},replaceNameNoComment:function(e,n){return'<span class="tocommentno">'+e+"</span>"}}},function(e){e.el.find(".reply").off("click").on("click",C.replyandreplies),e.el.find(".replies").off("click").on("click",C.replies),e.el.find(".panel").off("click").on("click",C.metmenu),e.el.find(".tocomment").off("click").on("click",C.tocomment),setTimeout(function(){e.el.find(".newcomments").removeClass("newcomments")},600),bgImages(d.list),n&&n()})}},b={preview:function(e){var n=[];m.lastComment&&(n=x.app.platform.sdk.comments.ini([m.lastComment])),x.sdk.comments.users(n,function(){e&&e(n)})},level:function(e,n){x.app.platform.sdk.comments.get(r,e||"",function(e){n&&n(e)})}},T={save:function(){},load:function(){var e=x.app.settings.get(x.map.id,r);e&&f[0].import(e)}};return{primary:n,getdata:function(e,n){if(o=n.settings.eid,u={},f={},m=n.settings.essenseData||{},a=m.preview||!1,l=a,c=!1,r=m.txid||null,f[0]=new Comment(r),r){e({})}},destroy:function(){delete x.app.platform.sdk.comments.sendclbks[o],delete x.app.platform.ws.messages.comment.clbks[o],t&&t.destroy(),d={}},init:function(e){var n;(d={}).c=e.el.find("#"+x.map.id),d.post=d.c.find(".post"),d.list=d.c.find(".list"),d.caption=d.c.find(".captionCnt"),d.showall=d.c.find(".showall"),s=d.c.closest(".wndcontent"),i=s.length?0:(s=null,65),a?function(){d.c.find(".loaderWrapper").addClass("hidden"),d.c.addClass("preview"),d.c.addClass("listpreview");var n={};y.post(function(e){h[0]=e}),b.preview(function(e){n.comments=e,n.class="firstcomment",g.showhideLabel(),y.list(n,function(){})})}():(n={},b.level(null,function(e){n.comments=x.app.platform.sdk.comments.storage[r][0],n.class="firstcomment",g.showhideLabel(),y.caption(),y.list(n,function(){d.c.find(".loaderWrapper").addClass("hidden"),y.post(function(e){h[0]=e,g.fastreply(m.reply)})})}),m.showall&&g.showall()),d.c.find(".showall").on("click",function(){g.showall()}),x.app.platform.sdk.comments.sendclbks[o]=w,x.app.platform.ws.messages.comment.clbks[o]=function(e){if(e.posttxid==r){var n={};if(n.comments=[e.comment],e.parentid){var t=d.c.find("#"+e.parentid);if(n.el=t.find(".answers"),t.find(".repliescount").html(Number(t.find(".repliescount").html()||"0")+1),t.find(".replies").removeClass("hidden"),!t.hasClass("showedreplies"))return}else n.el=d.c.find(".list"),n.class="firstcomment";y.list(n)}},e.clbk(null,e)},hideall:function(e){c=!1,void 0!==e&&(l=e||!1),l?(d.c.addClass("listpreview"),t&&t.destroy()):d.c.removeClass("listpreview"),d.c.removeClass("showedall"),g.showhideLabel()},changein:function(e,n){e?(s=e,i=n,t&&(t.addscroll=!0,t.setOffset([i,0]),t.setIn(s))):(s=d.c.closest(".wndcontent"),i=s.length?0:(s=null,65),t&&(t.addscroll=!!s,t.setOffset([i,0]),t.setIn(s)))}}};return x.run=function(e){var n=x.addEssense(t,s,e);x.init(n,e)},x.stop=function(){_.each(t,function(e){e.destroy()})},x}();"undefined"!=typeof module?module.exports=comments:(app.modules.comments={},app.modules.comments.module=comments);
 /*_____*/ 
var mchat=function(){var w=new nModule,i={},n=function(e){var d,t=deep(e,"history"),n=makeid(),m={},l=null,f=null,a=null,p=null,u={},h={},g={preloader:function(e){e?d.c.addClass("loading"):d.c.removeClass("loading")},close:function(){w.removeEssense(i,n),m.closeClbk&&m.closeClbk()},sendClbk:function(e,t,n){var a=d.messages.find("#"+e.EncryptedMessageID);t?(e.EncryptedMessageID=t,e.result="success",e.Message=n.note||"",e.Attachment=n.attachment||"",e.AttachmentName=n.attachmentName||"",e.AttachmentPreview=n.attachmentPreview||"",a.attr("id",e.EncryptedMessageID)):e.result="fail",a.removeClass("sending"),a.addClass(e.result)},mobileBuildHeight:function(){if("buildin"==m.view&&isMobile()){var e=d.c.find(".chatwindow").height(),t=$(window).height(),n=d.c.find(".chatmessages").height();e<=t-175&&n<e?d.c.find(".chatwindow").height(t-175):d.c.find(".chatwindow").css("height","auto")}},spacer:function(){if(g.mobileBuildHeight(),isTablet()){var e=0;0<d.messages.find(".chatmessage").length&&(d.c.find(".spacer").height(0),(e=d.c.find(".chatwindow").height()-d.c.find(".chatmessages").height()-10)<0&&(e=0),d.spacer.height(e+"px"))}},send:function(e){e&&p.rtc.send(e)},sendAttachment:function(e,n){w.app.platform.sdk.chats.send({attachment:e.attachment,attachmentName:e.attachmentName,attachmentPreview:e.attachmentPreview,temp:n},p.ThreadID,function(e,t){g.sendClbk(n,e,t)})},addTempMessage:function(e){var t=new Date;w.app.platform.timeDifference&&(t=t.addSeconds(w.app.platform.timeDifference/1e3));var n={Created:dateToStrUtcS(t),ThreadID:p.ThreadID,EncryptedMessageID:makeid(!0),temp:!0,UserID:w.app.user.data.id,decrypted:{Message:e.note,AttachmentName:e.attachmentName,AttachmentPreview:e.attachmentPreview}};return p.messages.push(n),o.messages(null,[n],!0),n},clearTempMessages:function(){d.messages.find(".temp").remove()},scrollToPx:function(e,t){if(!g.checkState())return!1;if(null!==t){var n=null,a=null,s="position";if("buildin"==m.view?(n=$(window),a=$("html"),s="offset"):(n=d.c.find(".chatwindow"),a=d.c.find(".chatmessages")),"toLast"==e||"toLast"==t){var i=d.messages.find(".chatmessage:nth-last-child(1)");if(i[s]()){var c=70;isMobile()&&(c=115),t=i[s]().top+i.height()+c-n.height(),n.scrollTop(t,200)}}else{var o=a.height();n.scrollTop(o-t,200)}}},scrollPx:function(e){var t=null,n=null,a=null;if(n="buildin"==m.view?(t=$(window),$("html")):(t=d.c.find(".chatwindow"),d.c.find(".chatmessages")),"toLast"==e)a="toLast";else{var s=d.messages.find(".chatmessage:nth-last-child(1)"),i="position";if("buildin"==m.view&&(i="offset"),inView(s,{inel:t,offset:0}).length){var c=n.height(),o=t.scrollTop();a=s[i]().top+s.height()+70,a=o+t.height()>a?c-o:"toLast"}}return a},saveAttachment:function(e){topPreloader(30);var t=c.findEl(e);t&&t.addClass("saveAttachment"),w.app.platform.sdk.chats.getAttachment(e,function(e){topPreloader(100),t&&t.removeClass("saveAttachment"),e?e.ChatMessageAttach&&saveAs({download:e.decrypted.AttachmentName,file:e.ChatMessageAttach,noA:!0}):console.log("ERROR")})},openGallery:function(e){var t={idName:"EncryptedMessageID",initialValue:e.EncryptedMessageID,getImages:function(){return _.filter(p.messages,function(e){var t=deep(e,"decrypted.AttachmentName");if(t&&(-1<t.indexOf(".jpg")||-1<t.indexOf(".png")||-1<t.indexOf(".jpeg")))return!0})},getImage:function(e,n){e.ChatMessageAttach?n&&n({src:e.ChatMessageAttach,name:e.decrypted.AttachmentName}):w.app.platform.sdk.chats.getAttachment(e,function(e){var t={src:e.ChatMessageAttach,name:e.decrypted.AttachmentName};n&&n(t)})}};o.gallery(t)},getPreview:function(e){w.app.platform.sdk.chats.getPreview(e,function(e){_.each(e,function(e){var t=c.findEl(e);o.messages(null,[e],!0,t)})})},read:function(){w.app.platform.focus&&w.app.platform.sdk.chats.read(p.messages,function(e){g.countUnread(),_.each(e,function(e){c.findEl(e).addClass("read")})})},countUnread:function(){w.app.user.data.id},checkState:function(){if(!d.c.hasClass("minimized"))return!0}},v={minimize:function(){d.c.addClass("minimized"),m.minimizeClbk&&m.minimizeClbk(),l.clear(),f.clear(),d.type.blur()},expand:function(){d.c.removeClass("minimized"),m.expandClbk&&m.expandClbk(),isTablet()||d.type.focus(),g.spacer(),setTimeout(function(){g.scrollToPx("toLast","toLast")},100)},out:function(){w.app.modules.chats.module.api.add(p.ThreadID)},close:function(){g.close()},type:function(e,t){var n,a;if(a=isMobile()?(n=this).getText():(t=e,(n=$(this)).val()),13==t.which||13==t.keyCode)return a&&(isMobile()?n.setText(""):n.val(""),g.send(a)),!1},resizeWindow:function(){l&&l.setOffset([$("#menu .menuWrapper").height(),0]),f&&f.setOffset([50,100])},getAttachment:function(){var e=$(this).closest(".chatmessage"),t=e.attr("id");if(!e.hasClass("sending")){var n=c.findMessage(t);if(n.decrypted&&n.decrypted.AttachmentName){var a=n.decrypted.AttachmentName.toLowerCase();-1<a.indexOf(".jpg")||-1<a.indexOf(".png")||-1<a.indexOf(".jpeg")?g.openGallery(n):g.saveAttachment(n)}}},messagesInView:function(){a=slowMade(function(){if(!g.checkState())return!1;var e,t=d.messages.find(".chatmessage"),n=d.messages.find(".chatmessage:nth-last-child(1)");"buildin"==m.view&&(e=$(window)),"fixedin"==m.view&&(e=d.c.find(".chatwindow"));var a=inView(t,{inel:e}),s=inView(n,{inel:e});if(0<a.length)_.map(a,function(e){var t=$(e).attr("id");return c.findMessage(t)});s.length},a,100)}},c={findMessage:function(t){return _.find(p.messages,function(e){return e.EncryptedMessageID==t})},findEl:function(e){return d.c.find("#"+(e.tm+e.f))}},o={gallery:function(e){e||(e={}),w.app.nav.api.load({open:!0,id:"imageGallery",inWnd:!0,essenseData:e})},safemessages:function(e,t){var s=_.map(h,function(e,t){return{m:e,t:t}});s=_.sortBy(s,function(e){return Number(e.t)});var i=[];_.each(s,function(t,n){var a={newmessages:[],oldmessage:t};_.each(e,function(e){(Number(e.tm)<Number(t.t)||n==s.length-1)&&(!n||Number(s[n-1].t)>Number(e.tm))&&a.newmessages.push(e)}),a.newmessages.length&&(a.newmessages.push(a.oldmessage),a.newmessages=_.sortBy(a.newmessages,function(e){return Number(t.t)}),i.push(a))}),i.length?lazyEach({array:i,action:function(e){var t=e.item,n=c.findEl(t.oldmessage);o.messages(e.success,t.newmessages,null,n)},all:{success:t}}):o.messages(t,e)},messages:function(t,e,n,a){var s="toLast";e&&(s="fixed");var i=g.scrollPx(s);e||(e=[]),e=_.filter(e,function(e){var t=e.tm+e.f;if(!u[t])return u[t]=!0,h[e.tm]=e,!0});var c=_.sortBy(e,function(e){return Number(e.tm)});n||g.clearTempMessages();var o=append,r=d.messages;a&&(o=replaceWith,r=a),w.shell({name:"messages",el:r,data:{chat:p,messages:c},inner:o},function(e){m.messagesClbk&&m.messagesClbk(),d.messages.find(".attachment").off("click"),d.messages.find(".attachment").on("click",v.getAttachment),v.messagesInView(),0<d.messages.find(".chatmessage").length?d.c.find(".other").fadeOut(1):d.c.find(".other").fadeIn(1),n&&(i="toLast"),g.spacer(),setTimeout(function(){g.scrollToPx(s,i)},20),l&&l.action(),f&&f.action(),g.countUnread(),t&&t()})}},s=function(){};return{primary:t,getdata:function(t,e){deep(e,"settings.essenseData");var n={};(p=deep(e,"settings.essenseData.chat"))&&w.app.platform.sdk.chats.info([p],function(e){n.chat=p,w.app.platform.sdk.messenger.getChat(p),n.canEnc=!0,t(n)})},destroy:function(){d.type&&d.type.blur(),$("html").off("mousemove",v.messagesInView),window.removeEventListener("scroll",v.messagesInView),window.removeEventListener("resize",v.resizeWindow),w.app.platform.ws,a&&clearTimeout(a),d={},l&&l.destroy(),f&&f.destroy(),l=f=null,w.app.platform.rtc.destroy(p.chat.id),p=null,0,m.destroyClbk&&m.destroyClbk()},init:function(e){u={},h={},(m=e.essenseData||{}).view||(m.view="buildin"),s(),(d={}).c=e.el.find("#"+w.map.id),d.messages=d.c.find(".chatmessages"),d.type=d.c.find(".type"),d.attachement=d.c.find(".attachement"),d.countUnread=d.c.find(".countUnread"),d.spacer=d.c.find(".spacer"),d.c.addClass(m.view),function(){if("buildin"==m.view){isMobile()||(l=new Caption({container:d.c.find(".chatWrapper"),caption:d.c.find(".captionfwrapper"),offset:[$("#menu .menuWrapper").height(),0]}).init());var e=0;isMobile()&&(e=50),f=new Caption({container:d.c.find(".chatWrapper"),caption:d.c.find(".bcaptionfwrapper"),offset:[e,2*e],pos:"bottom"}).init(),d.c.find(".out").on("click",v.out),window.addEventListener("scroll",v.messagesInView),window.addEventListener("resize",v.resizeWindow),$("html").on("mousemove",v.messagesInView)}"fixedin"==m.view&&(d.c.find(".close").on("click",v.close),d.c.find(".chatwindow").on("scroll",v.messagesInView),$("html").on("mousemove",v.messagesInView)),d.c.find(".minimize").on("click",v.minimize),d.c.find(".expand").on("click",v.expand),d.countUnread.on("click",function(){v.expand()}),isMobile(),d.type.on("keyup",v.type),initUpload({el:d.attachement,ext:["png","jpeg","jpg","pdf"],multiple:!0,maxFileSize:5,dropZone:d.c.find(".chatWrapper"),beforeUpload:function(e){var a=deep(e,"file.name");if("png"==e.ext||"jpeg"==e.ext||"jpg"==e.ext)resize(e.base64,200,200,function(t){var n=g.addTempMessage({attachmentName:a,attachmentPreview:t});resize(e.base64,1600,1600,function(e){g.sendAttachment({attachment:e,attachmentName:a,attachmentPreview:t},n)})});else{var t=g.addTempMessage({attachmentName:a});g.sendAttachment({attachment:e.base64,attachmentName:a},t)}}})}(),function(){if(p.rtc.clbks.receive.message.messenger=function(e){w.app.platform.sdk.messenger.load.messages(e,function(){o.messages(null,[e])})},p.rtc.clbks.receive.messages.messenger=function(e){w.app.platform.sdk.messenger.load.messages(e,function(){o.safemessages(e)})},p.rtc.clbks.send.message.messenger=function(e){w.app.platform.sdk.messenger.load.messages(e,function(){o.messages(null,[e],!0)})},p){var e=_.toArray(p.rtc.storage._db||{});w.app.platform.sdk.messenger.load.messages(e,function(){o.messages(null,e,!0)}),p.rtc.connect(function(){console.log(p)})}}(),w.app.platform.ws,e.clbk(null,e)},id:n,api:v}};return w.run=function(e){var t=w.addEssense(i,n,e);w.init(t,e)},w.stop=function(){_.each(i,function(e){e.destroy()})},w}();"undefined"!=typeof module?module.exports=mchat:(app.modules.mchat={},app.modules.mchat.module=mchat);
 /*_____*/ 
var author=function(){var d=new nModule,s={},n=function(e){var i,t,o=deep(e,"history"),s=null,n=null,a={showmoreabout:function(){var e=filterXSS(clearScripts(findAndReplaceLink(deep(i,"data.about"),!0)));t.c.find(".aboutwrapper").html(e),t.c.find(".showmoreabout").remove()},showHideUp:function(){200<t.w.scrollTop()?t.up.addClass("active"):t.up.removeClass("active")},panelTopPosition:function(){if(!isMobile()){var e=$(window).scrollTop();t.caption.height()+20<e?t.fxd.addClass("dfxd"):t.fxd.removeClass("dfxd"),a.panelPosition()}},panelPosition:function(){if(!isMobile()){var e=t.fxd,o=t.panel.closest(".mwork"),s=$(window).width(),n=(s-1280)/2;n<0&&(n=0);var i=s-(o.offset().left+o.width())+0,a=s-i-350+0+0;e.css("right",i+"px"),e.css("left",a+"px")}},destroy:function(){_.each(l,function(e){e.active=!1,e.module&&e.module.destroy()})}},r={showHideUp:function(){n=slowMade(function(){a.showHideUp()},n,30)},up:function(){_scrollTop(0)},unsubscribe:function(){d.app.platform.api.actions.unsubscribe(i.address,function(e,o){e||d.app.platform.errorHandler(o,!0)})},subscribe:function(){d.app.platform.api.actions.subscribe(i.address,function(e,o){e||d.app.platform.errorHandler(o,!0)})},subscribePrivate:function(){a.subscribePrivate(function(e,o){e?t.subscribe.addClass("subscribed"):d.app.platform.errorHandler(o,!0)})}},l={shares:{name:d.app.localization.e("uposts"),mobile:'<i class="fas fa-align-justify"></i>',id:"shares",render:"lenta",count:function(){return 0}},followers:{name:d.app.localization.e("followers"),mobile:'<i class="fas fa-users"></i>',id:"followers",render:"followers",count:function(){return deep(i,"data.subscribers.length")||0}},following:{name:d.app.localization.e("following"),id:"following",mobile:'<i class="fas fa-user-plus"></i>',render:"following",count:function(){return deep(i,"data.subscribes.length")||0}},settings:{name:d.app.localization.e("settings")+' <i class="fas fa-cog"></i>',mobile:'<i class="fas fa-cog"></i>',id:"settings",href:"userpage?id=test",class:"tosettings",if:function(){if(d.user.isItMe(i.address))return!0}},info:{name:'Info <i class="fas fa-info-circle"></i>',mobile:'<i class="fas fa-info-circle"></i>',id:"info",class:"info",render:"info",if:function(){if(isMobile())return!0}}},u={panel:function(){var e={};d.user.isItMe(i.address)||(e.author=i.address),d.nav.api.load({open:!0,id:"panel",el:t.panel,animation:!1,essenseData:{discussions:e},clbk:function(e,o){s=o,a.panelPosition(),window.addEventListener("resize",r.panelPosition),window.addEventListener("scroll",a.panelTopPosition)}})},report:function(e){a.destroy(),e.active=!0,d.app.nav.api.history.addParameters({report:e.id}),u[e.render](t.lenta,e),u.menulight()},menulight:function(){t.menu.find(".usermenuitem").removeClass("active");var e=_.find(l,function(e){return e.active});e&&t.menu.find(".usermenuitem .c"+e.class).addClass("active")},menu:function(o){d.shell({name:"menu",el:t.menu,data:{reports:l},animation:"fadeIn"},function(e){e.el.find(".toReport").on("click",function(){var e=$(this).attr("report");u.report(l[e])}),o&&o()})},userslist:function(e,o,s,n,i){d.nav.api.load({open:!0,id:"userslist",el:e,animation:!1,essenseData:{addresses:o,empty:s,caption:n},clbk:function(e,o){i&&i(e,o)}})},info:function(e){d.shell({name:"info",el:e,data:{author:i},animation:"fadeIn"},function(e){e.el.find(".showmoreabout").on("click",a.showmoreabout)})},followers:function(e,s){var o=_.map(deep(i,"data.subscribers")||[],function(e){return e}),n=d.app.localization.e("anofollowers");d.user.isItMe(i.address)&&(n=d.app.localization.e("aynofollowers")),u.userslist(e,o,n,"Followers",function(e,o){s.module=o})},following:function(e,s){var o=_.map(deep(i,"data.subscribes")||[],function(e){return e.adddress}),n=d.app.localization.e("anofollowing");d.user.isItMe(i.address)&&(n=d.app.localization.e("aynofollowing")),u.userslist(e,o,n,"Following",function(e,o){s.module=o})},lenta:function(e,s){d.nav.api.load({open:!0,id:"lenta",el:e,animation:!1,mid:i.address,essenseData:{author:i.address,byauthor:!0,hr:"author?address="+i.address+"&"},clbk:function(e,o){s.module=o}})}},c=function(){};return{primary:o,getdata:function(o){i={};var e=parameters();d.sdk.users.addressByName(e.address,function(e){e?(i.address=e,d.sdk.users.get(i.address,function(){d.sdk.ustate.get(i.address,function(){d.app.platform.sdk.address.pnet()&&i.address==d.app.platform.sdk.address.pnet().address?l.shares.name=d.app.localization.e("myuposts"):l.shares.name=d.app.localization.e("uposts"),i.data=d.sdk.users.storage[i.address],i.state=d.sdk.ustate.storage[i.address],o({author:i})})})):console.log("sd")})},destroy:function(){s&&s.destroy(),window.removeEventListener("resize",r.panelPosition),window.removeEventListener("scroll",a.panelTopPosition),window.removeEventListener("scroll",r.showHideUp),delete d.app.platform.ws.messages.event.clbks.author,delete d.app.platform.clbks.api.actions.subscribe.author,delete d.app.platform.clbks.api.actions.unsubscribe.author,a.destroy(),t={}},init:function(e){var o;c(),(t={}).c=e.el.find("#"+d.map.id),t.lenta=t.c.find(".lentaWrapper"),t.menu=t.c.find(".usermenu"),t.panel=t.c.find(".panel"),t.caption=t.c.find(".bgCaption"),t.fxd=t.c.find(".fxd"),t.subscribe=t.c.find(".subscribebuttons"),t.up=t.c.find(".upbutton"),t.w=$(window),t.info=t.c.find(".authorinfoWrapper"),o=parameters().report||"shares",u.report(l[o]),u.menu(),isMobile()||u.info(t.info),t.up.on("click",r.up),t.subscribe.find(".subscribe").on("click",r.subscribe),t.subscribe.find(".unsubscribe").on("click",r.unsubscribe),t.subscribe.find(".subscribeprivate").on("click",r.subscribePrivate),d.app.platform.ws.messages.event.clbks.author=function(e){"subscribe"!=e.mesType&&"unsubscribe"!=e.mesType||(t.c.find('.toReport[report="followers"] .count').html(l.followers.count()),t.c.find('.toReport[report="following"] .count').html(l.following.count()))},d.app.platform.clbks.api.actions.subscribe.author=function(e){e==i.address&&(t.subscribe.addClass("subscribed"),t.c.find('.toReport[report="followers"] .count').html(l.followers.count()),t.c.find('.toReport[report="following"] .count').html(l.following.count()))},d.app.platform.clbks.api.actions.unsubscribe.author=function(e){e==i.address&&(t.subscribe.removeClass("subscribed"),t.c.find('.toReport[report="followers"] .count').html(l.followers.count()),t.c.find('.toReport[report="following"] .count').html(l.following.count()))},e.clbk(null,e)}}};return d.run=function(e){var o=d.addEssense(s,n,e);d.init(o,e)},d.stop=function(){_.each(s,function(e){e.destroy()})},d}();"undefined"!=typeof module?module.exports=author:(app.modules.author={},app.modules.author.module=author);
 /*_____*/ 
var donations=function(){var f=new nModule,t={},a=function(n){var i,e=deep(n,"history"),t=["PHdW4pwWbFdoofVhSEfPSHgradmrvZdbE5","PTziv8ym7eJRUfyfAFBejJgEYemTdUgFzH","PBE1MLbsFoY3o1YW6t3Goi6spS1y9GY1vj","PRV1eoYkhA5PGkASm2tyD12xwdQnigbpkp","PRCeHituQ5WN2EXRZz4t9qTYyCBqTc4g4M","P9V67HjuApdEhj4DZxNnibxEqSnmCPbxvB","PA57U1QmmowNzSaz6ThG2EPs34QCsLyksL"],a={amount:new Parameter({name:f.app.localization.e("wsamount"),id:"amount",type:"NUMBER",placeholder:f.app.localization.e("wsamountof"),format:{Precision:6}})},o=[{id:"btc",name:"Bitcoin",action:function(n){u.ways.ltcbtc(n)},qrname:"bitcoin"},{id:"ltc",name:"Litecoin",qrname:"litecoin",action:function(n){u.ways.ltcbtc(n)}},{id:"xmr",name:"Monero",qrname:"monero",action:function(n){u.ways.xmr(n)}},{id:"paypal",name:"Paypal",action:function(n){u.ways.paypal(n)}}],s={},c=null,u={checkFunds:function(n,e,t){u.status(n,e,function(n,e){t&&t(e)})},waitfunds:function(e,t,a,o){s[e]=t,l.save(),r.address(e,t,o,a,function(n){c=setInterval(function(){u.checkFunds(e,t,function(n){"AWAITINGFUNDS"!=n.Status&&"AWAITINGDONATION"!=n.Status&&(clearInterval(c),c=null),"AWAITINGFUNDS"==n.Status||"AWAITINGDONATION"==n.Status||"EXPIREDAWAITINGFUNDS"==n.Status?r.address(e,t,o,n):r.thankyou(o,!1,a)})},6e4)})},ways:{ltcbtc:function(t){var a=t.id;s[a]?(console.log("cur, storage[cur]",a,s[a]),u.status(a,s[a],function(n,e){"AWAITINGFUNDS"==e.Status||"AWAITINGDONATION"==e.Status?u.waitfunds(a,s[a],e,t):"EXPIREDAWAITINGFUNDS"==e.Status?u.address(a,function(n,e){u.waitfunds(a,n,e,t)}):(delete s[a],l.save(),r.thankyou(t,!0,e))})):u.address(a,function(n,e){u.waitfunds(a,n,e,t)})},xmr:function(n){r.xmraddress(n,function(n){})},paypal:function(n){window.open("https://www.paypal.me/pocketnet","_blank").focus(),r.thankyou(n)}},donate:function(){u.hidepage(function(){r.ways()})},hidepage:function(n){i.c.find(".hideprocess").fadeOut(200,n)},showpage:function(n){i.c.find(".hideprocess").fadeIn(200,n)},status:function(n,e,t){f.app.platform.sdk.exchanges.status(n,e,t)},address:function(n,t){f.app.ajax.run({data:{Action:"GETADDRESSFORDONATION",Currency:n.toUpperCase()},success:function(n){var e=deep(n,"Address.Address");e?t&&t(e,n.Address):sitemessage("Something went wrong. Please reload page and try again (error: 0001)")},fail:function(){sitemessage("Something went wrong. Please reload page and try again (error: 0001)")}})}},d=function(){u.donate()},r={thankyou:function(e,t,n){_scrollTop(0),a.amount.value=deep(n,"Amount")||0,f.shell({name:"thankyou",inner:html,el:i.process.find(".step"),data:{second:t,curobj:e,info:n,parameters:a}},function(n){ParametersLive(_.toArray(a),n.el),n.el.find(".send").on("click",function(){0<a.amount.value?$.ajax({type:"POST",url:"https://pocketnet.app/Shop/AJAXMain.aspx",data:{Action:"ADDTOMAILLIST",TemplateID:100,Email:f.app.platform.sdk.address.pnet().address,Name:(e.name||"NAN0")+", "+(a.amount.value||0)},dataType:"json",success:function(){n.el.html(""),setTimeout(function(){u.showpage()},100),dialog({html:"Thank you for supporting our work for freedom. We will make sure every penny counts.",class:"one"})}}):sitemessage("Please fill amount of donation")}),n.el.find(".back").on("click",function(){t?(n.el.html(""),setTimeout(function(){e.action(e)},100)):(n.el.html(""),setTimeout(function(){u.showpage()},100))})})},xmraddress:function(e,t){_scrollTop(0),f.shell({name:"xmraddress",inner:html,el:i.process.find(".step"),data:{curobj:e}},function(n){n.el.find(".back").on("click",function(){n.el.html(""),setTimeout(function(){r.ways()},100)}),n.el.find(".next").on("click",function(){r.thankyou(e,!0)}),n.el.on("click",".copyaddress",function(){copyText(n.el.find(".aw")),sitemessage(f.app.localization.e("waddresswascop"))}),t&&t(n.el)})},address:function(t,a,o,s,e){f.shell({name:"address",inner:html,el:i.process.find(".step"),data:{curobj:o,address:a,currency:t,info:s}},function(n){n.el.find(".back").on("click",function(){n.el.html(""),setTimeout(function(){r.ways()},100),c&&(clearInterval(c),c=null)}),n.el.on("click",".copyaddress",function(){copyText(n.el.find(".aw")),sitemessage(f.app.localization.e("waddresswascop"))}),n.el.find(".reactivate").on("click",function(){f.app.platform.sdk.exchanges.reactivate({address:a,currency:t},function(n,e){n?sitemessage("Something went wrong. Please reload page and try again (error: 0002)"):u.waitfunds(t,a,s,o)})}),n.el.find(".next").on("click",function(){r.thankyou(o,!0),c&&(clearInterval(c),c=null)}),e&&e(n.el)})},ways:function(e){_scrollTop(0),f.shell({name:"ways",inner:html,el:i.process.find(".step"),data:{ways:o}},function(n){n.el.find(".back").on("click",function(){n.el.html(""),setTimeout(function(){u.showpage()},100)}),n.el.find(".way").on("click",function(){var e=$(this).attr("way"),n=_.find(o,function(n){return n.id==e});n&&n.action(n)}),e&&e()})}},l={save:function(){f.app.settings.set(f.map.uri,"storage",JSON.stringify(s))},load:function(){s=JSON.parse(f.app.settings.get(f.map.uri,"storage")||"{}")}};return{primary:e,getdata:function(n){l.load(),f.sdk.users.get(t,function(){n({donated:t})},!0)},destroy:function(){c&&(clearInterval(c),c=null),i={}},init:function(n){(i={}).c=n.el.find("#"+f.map.id),i.process=i.c.find(".process"),i.donate=i.c.find(".donate"),i.donate.on("click",d),n.clbk(null,n)}}};return f.run=function(n){var e=f.addEssense(t,a,n);f.init(e,n)},f.stop=function(){_.each(t,function(n){n.destroy()})},f}();"undefined"!=typeof module?module.exports=donations:(app.modules.donations={},app.modules.donations.module=donations);
 /*_____*/ 
var faq=function(){var h=new nModule,o={},a=function(e){var a,t=deep(e,"history"),o=[{name:"Technical",id:"technical",group:[{id:"downloadclient",q:"Where do I download the client?",a:'<div><a href="https://github.com/pocketnetteam/pocketnet.gui/releases/latest">https://github.com/pocketnetteam/pocketnet.gui/releases/latest</a></div><div>Click on PocketnetSetup.exe</div>'}]},{name:"Pocketnet Roadmap",id:"roadmap",group:[{id:"walletaddresses",q:"I see a PN address and a wallet address... are both these addresses on the PN blockchain?",a:"<div>PN address is the one used for posting content and using social network in general. It also keeps coins that you win for your highly rated posts.</div><div>Wallet addresses are to keep the rest of coins.</div>"},{id:"linktoprofile",q:'Can I link to my profile? or my "page"? So that i can post it into my community to bring members over.',a:"<div>In the browser, go to your profile by clicking on avatar in the upper right and just copy the browser address, everyone who will sign up from that link will follow you automatically and you will actually get rewards.</div>\t\t\t\t\t<div>On the desktop,  from a desktop application go to your profile,  once there, there will be three icons to the right of your avatar first there will be a wallet with number of coins, then a bell with notifications and a third is a green cross icon click on that green cross  and click copy,  send that link around everyone who subscribes will follow you and you will get rewards.</div>"},{id:"starsystem",q:"The star system. is there a limit on how many stars a person has to give people?",a:"<div>There are some limits. But as your reputation grows you can upvote more and more. This is done, so bots don&rsquo;t break down our blockchain. Initially you can 10 ratings every 24 hours. As your reputation grows (that happens by posting and getting rated), then you do 45 ratings a day.</div>"},{id:"updateprofiletime",q:"How long until I&rsquo;m able to update my profile? ",a:"<div>You are able to update your profile once every hour.</div>"},{id:"linuxdesktop",q:"Is there a Linux Desktop?",a:"<div>Yes! It is in the works 2-3 weeks as the beta test progresses.</div>"},{id:"savevideo",q:"Where do you save the video content?",a:"<div>We are working on video storage, in the meantime you can share from Bitchute, Youtube, Vimeo and other video sources.</div>"},{id:"mobileapp",q:"Is there a mobile app?",a:"<div>Mobile app is not ready yet. We plan it for June 2019. But we strongly encourage everyone to also download the desktop app, since, unlike Android or iPhone app, it cannot be taken away from you by Google or Apple.</div>"},{id:"postinglimit",q:"Can you tell me what is the limit for posting each day or hour?",a:"<div>We do have some limitations, but after testing it we have increased our limits. At the outset you can make 15 posts and issue 45 ratings every 24 hours. Once your reputation grows above 50, you will be able to make up to 30 posts and 90 ratings every 24 hours.</div>"},{id:"reputation",q:"What is reputation and how is it calculated?",a:"<div>Your reputation is the sum of your ratings calculated in the following way.</div>\t\t\t\t<div>5=2<br>4=1<br>3=0<br>2=-1<br>1=-2</div><div>So, if you have two 5 start ratings and one 1 star rating, the total will be 2+2-2=2</div>"},{id:"deletepostoruser",q:"Is there a way to delete or edit a post?",a:"<div>Not at this point, as it is baked into blockchain. However, we are working on a feature to create an overwrite transaction as well &#10075;hide&#10076; transaction, which would effectively translate to edit or delete.</div>"},{id:"usersearch",q:"Is there a way to search for a user?",a:"<div>We are going to release this feature before the end of March.</div>"},{id:"follow",q:"How do you follow someone?",a:"<div>Next to post author (on top of post) there is a Follow link, you can find his posts in Top posts (red flame on top of the page). You will also soon see Subscriptions feed, which is going to be different from the main feed. The main feed will be everything that anyone posts chronologically, but Subscriptions feed will only contain posts from people you follow. So, you will go into general feed in search of good content, though you may not like everything. Then select those you want to keep. Kind of like fishing :)</div>"},{id:"otherbrowsers",q:"Can it be used on Brave or Duck Duck go browsers?",a:"<div>Those browsers are not yet fully supported. Our developers are aware of the issue and are working on making pocketnet work on them. It is fully functional on Chrome and Firefox. But we strongly encourage everyone to download the desktop app. It cannot be blocked ever (even if pocketnet.app is down or blocked for some reason). This is a serious consideration in totalitarian and quasi-totalitarian countries which, if you think about it, is beginning to include more and more of the globe.</div>"},{id:"replypost",q:"Can we reply to our own/and other&rsquo;s posts?",a:"<div>That feature is being worked on by our developers. No timeline yet.</div>"},{id:"addtags",q:"How to add a tag to a post?",a:"<div>Just type in the field tag and press enter. No need to specify #, it will be added automatically.</div>"},{id:"usepublicaddress",q:"How can I use the public address?",a:"<div>Your public address is what Pocketnet uses to verify your identity. Essentially, your private key is a really large number (that can be represented with a 12 word sequence or a QR code). This number gets multiplied by another that everyone knows (called a base point) and we get a public key. When you enter your private key, we can multiply it by the base point to get your public key and we can match it against public address. If they match, we know it is you. It is impossible to go back i.e. to divide public key by the base point to get your private key. The way multiplication in cryptography works is it is only one way and cannot be reversed, so your key is safe. Pocketnet uses the same exact cryptography as Bitcoin.</div>"},{id:"desktopmac",q:"Will there be a downloadable executable for Mac?",a:"<div>Yes - we are working of Mac platform. Target is for mid-April.</div>"}]},{name:"Pocketcoin",id:"pocketcoin",group:[{id:"pocketcoin",q:"What can I do with Pocketcoin?",a:"<div>Currently you can win it or send as a gift. However, if and when Pocketnet takes off, Pocketcoin will be the main method of buying advertising on the platform. Advertisers will be able to easily find content authors with the right audience and then offer them advertising opportunities. This will be a trustless endeavor (i.e. neither side can cheat), because of something called multi-signature contracts. Multisig contract requires a digital signature of both parties to be valid. When advertiser offers an ad to the content creator, he creates the first of two required signatures. He signs the actual ad and the amount bid. Content creator reviews this partially signed multisig and if it is accepted, then he appends the second signature. When a blockchain sees both signatures, content creator is automatically paid and an ad is automatically shown on creator’s channel. These transactions will only be done through Pocketcoin. Thus, if Pocketcoin becomes big, it will be an immensely valuable token.</div>"},{id:"pocketcoinstock",q:"Is Pocketcoin like a share of stock in Pocketnet?",a:"<div>Definitely no. Pocketnet is not even a corporation and does not have any ownership. It is an open source code that anyone can copy and run. Pocketcoin is a token that facilitates value exchange, specifically advertising transactions. In addition, Pocketnet will include a marketplace where goods and services will be sold directly for Pocketcoin</div>"},{id:"pocketcoinbuy",q:"Can I buy additional Pocketcoin?",a:"<div>Yes, we will create a way to buy Pocketcoin for Bitcoin and a few other cryptocurrencies on pocketnet.app. All proceeds of sales will be used to advertise Pocketnet to the world. So, by buying a Pocketcoin you are positioning yourself for success of Pocketnet, but just as importantly you are helping Pocketnet achieve this success. All major social networks had billion dollar advertising budgets. Pocketnet was funded by its founders and developers worked only for Pocketcoin. We need you to help us spread the word. To go the extra mile consider buying some Pocketcoin to help us advertise the site. To buy Pocketcoin you will need to first buy Bitcoin or some other cryptocurrency, which is exceedingly easy now.</div>"},{id:"pocketcoinbuyfiat",q:"Can I buy Pocketcoin for US Dollars or other fiat currency?",a:"<div>No.</div>"}]},{name:"Privacy",id:"privacy",group:[{id:"anonymous",q:"Are people who do not enter their real names anonymous?",a:"<div>Yes - no names, phones, email is NOT connected to your account in any way, it is just optionally entered to receive newsletter updates.</div>"},{id:"viewoutside",q:"Can someone view a profile (someone&rsquo;s posts) outside the garden? Is it a walled garden?",a:"<div>Since the whole blockchain and all the posts are in opensource anyone can have access to your posts and profile. They just know that it is linked to your public address. In practice, you can have multiple accounts. You can use some with your real name and others anonymously. Anonymity is a great tool to protect free speech from abuse of power.</div>"},{id:"walletid",q:"Is my public key like a wallet ID that I enter on my profile and people can send points to?",a:"<div>Exactly. And it is safe to reveal. But not a secret phrase - keep it safe!</div>"},{id:"runnode",q:"Can I run a node on my headless server?",a:"<div>We will put the node&rsquo;s sources into GitHub. Instructions for running a node will be made available in early April.</div>"},{id:"signback",q:"How can I sign back in?",a:"<div>You can use your private 12-word key or a QR code to sign in.</div>"}]},{name:"Curation of content",id:"curation",group:[{id:"content",q:"Is any content allowed on Pocketnet? If some content is not allowed, can the platform still be called free speech?",a:"<div>This is a very important question and we will be releasing many videos and articles about it, as well as looking for your input. To begin with, not all types of content are allowed. However, and this is crucial, the enforcement is transparent and up to the community in the way we will explain below. Enforcement is done by the community and is in the open with no hidden shadow bans or selective banning practiced by the Silicon Valley.</div>"},{id:"specific",q:"Specifics of curation on Pocketnet.",a:"<div>When your reputation gets to 100 and you press on dots in the upper right of any post, you will see an option to Complain. If enough Complaints come in, the post will not be shown anymore. When someone has more than 2 posts that are voted off the platform in 24 hours, they cannot post for another 48 hours after the second post. Complain is completed when number of complaints is at least ⅓ of the number of 4 and 5 star ratings, subject to a minimum of 10 complaints (which will be adjusted over time in consultation with the community).</div><div>We are extremely and passionately pro-speech. However, we do not want to turn Pocketnet into a marginal forum where lunatics reign. What would cause you to Complain?</div><div>Do NOT complain about stuff that you simply don’t like or that offends you. That is not a high enough bar. Do not follow people who offend you, soon we will have a feature for not seeing their posts, but do not complain about them. Complain only about things that threaten long term viability of Pocketnet as a mass communication platform that intends to reach to all levels of society in many countries.</div><div>We strongly recommend that you complain about porn of any kind. There are plenty of porn sites on the web, we do not want to mix our free speech endeavor with that. We strongly encourage the community to vote off porn. Secondly, any type of a direct threat should be voted off and clear examples of racism should too. If we allow MSM to tie us to racism or violence directly, Pocketnet will cease to exist before we can even get it out there. Just because MSM media cries wolf about fake racism, doesn’t mean we should prove them right by tolerating it in our platform. It will detract from what we are trying to achieve, which is to challenge new totalitarianism created by the unholy alliance of media, finance and corrupt government officials.</div> "},{id:"racism",q:"Important Note on Racism.",a:"<div>Free thought and free speech is under attack on mainstream social platforms and in the media. We need to speak the truth and this platform is non-corporate and decentralized for that very reason. But we ask everyone make your point without attacking people&rsquo;s nationality or race. You can make your point based on evidence. We cannot afford to turn Pocketnet into a marginal platform. Speak the truth, but please avoid racism and attacks against specific nationalities on the whole. We know that Silicon Valley and MSM has turned the issue of racism into their playing card and they constantly cry wolf. Even more the reason for us to be measured and evidence based and not let them smear us with that. If we are not, we are not allowing most of the population to weigh the evidence of MSM corruption presented on Pocketnet. Please keep that in mind, so that free speech can thrive and we can beat the facebokks of the world.</div><div>Ultimately, it is the community that will determine the direction of the platform. Having a bunch of snowflakes that complain about stuff that offends them is equally as bad as when people want to voice direct violent threats. However, the first indication is that early users of the platform are generally intelligent and evidence based, so the future looks incredibly bright. Pocketnet team has noticed after a few days of the beta test, that we stopped reading even alternative news, because there was so much interesting content on Pocketnet. Keep it up!</div><div>Please get involved in the discussion on these topics. This is a community platform. We are always eager to improve transparency of the platform and you should let us know how we can improve our content curation and policing. Use group chat or email support(at)pocketnet*dot*app or make full posts on this topic.</div>"}]},{name:"How is Pocketnet different from...",id:"differents",group:[{id:"differents1",q:"Twitter, Facebook, Reddit & other centralized platforms?",a:"<div>There is no central authority or corporation. Platform is run by equal nodes on a blockchain. All revenue is split between node operators and content creators. Node operators stake Pocketcoin in order to mint blocks with rewards and transactions fees. Half of rewards in each block go to content creators based on ratings their content gathers from users.</div>"},{id:"differents2",q:"Decentralized platforms like Minds.com and Sola?",a:"<div>Both of those platforms, while great, are not self-contained. Both are highly dependent on the Ethereum platform, because their tokens are based on ERC-20 Ethereum standard. That means that operations with tokens carry Ether gas fees. Also, those entities have corporations behind them and a corporation will always be a point of centralization due to its economic logic of growing profits. In addition, corporations are exceedingly easy to censor.</div>"},{id:"differents3",q:"From Steemit?",a:"<div>Steemit has its own blockchain, but is a corporate entity with all of the centralization that comes from that.</div>"},{id:"differents4",q:"Decentralized platforms like Mastodon and others?",a:"<div>While Mastodon is a fully decentralized platform, it requires a great deal of technical knowledge to use. This presents a great hindrance to potential widespread acceptance. Pocketnet features a web and desktop applications and users can log in from any device, pull in their personal settings from the blockchain and start using the platform immediately without any technial knowledge.</div>"}]},{name:"Pocketnet ecosystem",id:"ecosystem",group:[{id:"ecosystem1",q:"How is Pocketnet develpment funded?",a:"<div>Pocketnet is open sourced and is currently run by the group of volunteers with some serious programming and math skills. After launch Pocketnet will attract top programming talent based on its promise of creating a decentralized fair social network. Programmers and marketers working on Pocketcoin receive 5% of emission. The awards to developers and marketers will be assigned by nodes voting in a transparent manner.</div>"},{id:"ecosystem2",q:"What is Pocketcoin?",a:"<div>Pocketcoin is a network token. It is used exclusively to buy advertising from Pocketnet contributors and to pay transaction fees for such payments. Pocketcoin emission depends on the number of users of Pocketnet and has inherent algorithmic factors tying its long term value to Annual Revenue Per User (ARPU). ARPU is a term in digital advertising which signifies the total amount of revenue platform receives for one active user per year. In Pocketent all of the revenue is split between content creators and nodes.</div>"},{id:"ecosystem3",q:"How are content creators and node operators rewarded?",a:"<div>Pocketnet features unique Direct Marketplace where content creators can sell advertising to ad buyers. Content creators set their price and can accept mass-produced ads or can offer highly valued custom placements (creators pitching the product in their own way). Direct Marketplace is essentially an exchange for advertising that allows ad buyers target specific audiences without any intermediaries. All ad buys and ads themselves are linked on the blockchain, therefore ad buying is completely trustless.</div>"},{id:"ecosystem4",q:"What if users post illegal content, pornography and SPAM?",a:"<div>Pocketnet is not a darknet platform or some sort of pornhub. While it is decentralized and censorship resistant, it is policed by the users. Any illegal content is flagged and removed from the platform using the Wikipedia model. This means that users with highest reputation can police the platform. However, there are safeguards in place (within the open source code) from same or very similar group(s) of people repeatedly voting content off the platform. Also, users are explicitly encouraged to flag only illegal content, not simply the content they find offensive. To make sure that Pocketnet is a free speech platform, we encourage you to start participate, grow your reputation and police the platform properly without the censorship currently prevalent in centralized social media.</div>"}]}],i={},n=function(e){_scrollToTop(a.c.find('.faqcnt .question[question="'+e+'"]'),null,null,-110)},r=function(e){_scrollToTop(a.c.find('.faqcnt .group[group="'+e+'"]'),null,null,-110)},s=function(e){console.log(i,e);var t=i[e],o="https://pocketnet.app/help?page=faq&id="+e+"&ref="+h.app.platform.sdk.address.pnet().address,a=t.q;h.nav.api.load({open:!0,href:"socialshare",history:!0,inWnd:!0,essenseData:{url:o,caption:"Share FAQ answer in social",title:a}})},l=function(){var e=$(window).height()/4,t=inView(a.c.find(".faqcnt .group"),{offsetTop:e,offsetBottom:e,mode:"line"}),o=null;0<t.length&&(o=$(t[0]).attr("group"),a.contens.removeClass("active"),a.c.find('.contens .item[group="'+o+'"]').addClass("active"))},d=function(){var e=$(this).attr("group");r(e)},c=function(){var e=$(this).closest(".question").attr("question");s(e)},u=function(){};return{primary:t,getdata:function(e){i={},_.each(o,function(e){_.each(e.group,function(e){i[e.id]=e})}),e({groups:o})},destroy:function(){console.log("DESTROY"),roller&&roller.destroy(),window.removeEventListener("scroll",l),a={}},init:function(e){u(),(a={}).c=e.el.find("#"+h.map.id),a.contens=a.c.find(".contens .item"),a.contens.on("click",d),a.c.find(".share").on("click",c),a.c.find(".question .questionName").on("click",function(){$(this).closest(".question").toggleClass("opened")}),window.addEventListener("scroll",l),roller=new Roller({selector:".roller",inner:".cnt",cnt:a.c,offset:65}).init().apply();var t=parameters().id;t&&n(t),e.clbk(null,e)}}};return h.run=function(e){var t=h.addEssense(o,a,e);h.init(t,e)},h.stop=function(){_.each(o,function(e){e.destroy()})},h}();"undefined"!=typeof module?module.exports=faq:(app.modules.faq={},app.modules.faq.module=faq);
 /*_____*/ 
var share=function(){var u=new nModule,t={},n=function(e){var o,s,i=/[,.!?;:() \n\r]/g,a=deep(e,"history"),r=null,l={waitActions:function(){u.app.platform.sdk.user.waitActions(function(e){o.c&&(e&&"inf"!=e?o.c.addClass("waitActions"):o.c.removeClass("waitActions"))})},autoFilled:function(){l.filled("i",0!=r.images.v.length),l.filled("u",r.url.v),l.filled("t",0!=r.tags.v.length),l.filled("cm",r.message.v||r.caption.v)},filled:function(e,a){var t=o.c.find('.draggablepart[part="'+e+'"]');a?t.addClass("filled"):t.removeClass("filled")},checkUrlForImage:function(a){if(a=a.split("?")[0].toLowerCase(),_.find([".jpg",".gif",".png",".jpeg"],function(e){if(-1<a.indexOf(e))return!0}))return!0},embeding20:function(e){var a=r.export(!0);u.nav.api.load({open:!0,id:"embeding20",inWnd:!0,essenseData:{storage:a,value:e,on:{added:function(e){"url"==type&&e&&l.checkUrlForImage(e)&&(type="images",e=e),r[type].set(e),p[type]&&p[type]()}}}})},embeding:function(n,e){var a=r.export(!0);"article"==n?u.nav.api.load({open:!0,id:"articles",inWnd:!0,history:!0,essenseData:{storage:a,value:e,on:{added:function(e){}}}}):u.nav.api.load({open:!0,id:"embeding",inWnd:!0,essenseData:{type:n,storage:a,value:e,on:{added:function(e){var t=!0;"url"==n&&e&&l.checkUrlForImage(e)&&(n="images",e=e),_.isArray(e)||(e=[e]),_.each(e,function(e,a){t=r[n].set(e),s.share||g.save()}),!t&&c[n]&&sitemessage(c[n]),p[n]&&p[n]()}}}})},addTag:function(e){r.tags.set(e)?(o.error.html(""),s.share||g.save()):o.error.html("You can enter less that 30 tags")},editImage:function(e){var a=_.map(r.images.v,function(e,a){return{original:e,index:a}}),n=_.filter(a,function(e){if(-1<e.original.indexOf("data:image"))return!0});u.nav.api.load({open:!0,id:"imageGalleryEdit",inWnd:!0,essenseData:{edit:!0,initialValue:e,images:n,success:function(e,a){_.each(r.images.v,function(e,a){var t=_.find(n,function(e){if(e.index==a)return!0});t&&(r.images.v[a]=t.original)}),s.share||g.save(),p.images(a)}}})},removeImage:function(t){var e=r.images.v.splice(t,1)[0];o.c.find(".imageContainer").each(function(){var e=$(this),a=e.attr("value");t<a&&e.attr("value",a-1),a==t&&e.remove()}),o.c.find(".imagesEmbWr").isotope();var a=o.eMessage[0].emojioneArea.getText();a=a.split(e).join(""),o.eMessage[0].emojioneArea.setText(a),s.share||g.save()},removelink:function(){var e=r.url.v;r.url.set();var a=o.eMessage[0].emojioneArea.getText();a=a.split(e).join(""),o.eMessage[0].emojioneArea.setText(a),s.share||g.save()},removeTag:function(e){r.tags.remove(e);var a=o.eMessage[0].emojioneArea.getText();a=a.split("#"+e).join(e),o.eMessage[0].emojioneArea.setText(a),s.share||g.save()},applyText:function(e){r.message.set(e)},caption:function(e){r.caption.set(e)},linksFromText:function(e){if(!r.url.v){var a=e.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%|_\+.~#/?&//=]*)?/gi);a&&0<a.length&&_.each(a,function(e){if(l.checkUrlForImage(e))-1==r.images.v.indexOf(e)&&(r.images.set(e),p.images());else{if(r.url.v)return;r.url.set(e),p.url()}})}},tagsFromText:function(e){var a=e.split(i),t=_.filter(a,function(e){if("#"==e[0])return!!(e=e.replace(/#/g,""))&&!r.tags.have(e)});t.length&&(_.each(t,function(e){e=e.replace(/\#/g,""),r.tags.set(e)}),p.tags())},post:function(i,e){topPreloader(50),r.uploadImages(u.app,function(){u.sdk.node.transactions.create.commonFromUnspent(r,function(e,a){if(topPreloader(100),o.c.removeClass("loading"),e){try{var t=new pShare;t._import(e,!0),t.temp=!0,t.address=e.address,u.app.platform.sdk.node.shares.add(t),s.notClear||(r.clear(),s.share||g.save(),m())}catch(e){console.log(e)}i&&i(!0)}else if(i)i(!1,c[a]);else{o.postWrapper.addClass("showError");var n=u.app.platform.errorHandler(a,!0);n&&o.error.html(n)}},e)})},error:function(e){var a=r.validation();return a&&!e?(o.postWrapper.addClass("showError"),o.error.html(c[a]),"message"==a&&o.c.find(".emojionearea-editor").focus(),"tags"==a&&o.c.find(".tgs input").focus(),!0):(o.postWrapper.removeClass("showError"),o.error.html(""),!1)},eTextChange:function(e){var a=e.getText();l.tagsFromText(a),l.applyText(a),l.linksFromText(a),p.caption(),s.share||g.save()}},c={message:u.app.localization.e("emptymessage"),tags:u.app.localization.e("emptytags"),images:u.app.localization.e("maximages")},d={selectTime:function(){var e=new Date,a={day:null,hour:(e=e.addMinutes(10)).getHours(),minutes:e.getMinutes()};s.time&&(a.day=s.time.yyyymmdd(),a.hour=s.time.getHours(),a.minutes=s.time.getMinutes()),u.fastTemplate("sharedate",function(e){dialog({html:e,btn1text:u.app.localization.e("daccept"),class:"one sharedate",clbk:function(e){},wrap:!0,success:function(e){var a=e.el.find(".day").val(),t=e.el.find(".hours").val(),n=e.el.find(".minutes").val(),i=strToDateSmall(a);return i=(i=i.addHours(t)).addMinutes(n),new Date<i?(s.time=i,o.selectTime.find(".selectedTime").html(convertDate(dateToStr(i))),s.selectTime&&s.selectTime(i),!0):(sitemessage(u.app.localization.e("pastdate")),!1)}})},{date:a})},changePostTime:function(){var e=$(this),a=$(this).val();if("p"!=a){if("t"==a)l.error()?e.val("w"):s.time&&s.time<new Date&&(s.time=null,o.selectTime.find(".selectedTime").html(u.app.localization.e("timenotselected")),s.selectTime&&s.selectTime(null));a=$(this).val(),s.type&&s.type(a)}else dialog({html:u.app.localization.e("sharenow"),btn1text:u.app.localization.e("dyes"),btn2text:u.app.localization.e("dno"),success:function(){s.type&&s.type(a)},fail:function(){e.val("w")}})},changeAddress:function(){var e=$(this).val(),a=o.c.find(".usericon"),t=deep(app,"platform.sdk.users.storage."+e+".image")||"";t?(a.html(""),a.attr("image",t),bgImages(o.c.find(".icon"))):(a.html('<svg width="30" height="30" data-jdenticon-value="'+e+'"></svg>'),a.attr("image",""),a.css("background","#F9F6F6"),a.css("background-image",""),a.css("background-size",""),a.css("background-position",""),a.css("background-repeat",""),o.c.find("[data-jdenticon-value]").each(function(){var e=$(this),a=e.data("jdenticon-value");e.html(jdenticon.toSvg(a,e.width()))})),s.address&&s.address(e)},change:function(){l.error(!0),l.autoFilled()},post:function(){l.error()||l.post()},embeding:function(){var e=$(this).attr("embeding");"embeding20"==e?l.embeding20():l.embeding(e)},addTag:function(e){l.addTag(e),p.tags()},caption:function(){var e=$(this).val();l.caption(e)},eTextChange:function(e,a){l.eTextChange(this)},textChange:function(){var e=$(this).val();l.tagsFromText(e),l.applyText(e),l.linksFromText(e),p.caption()},eText:function(e,a){var t=String.fromCharCode(a.keyCode||a.which),n=this.getText();i.test(t)&&(l.tagsFromText(n),l.linksFromText(n)),l.applyText(n),p.caption(),s.share||g.save()},text:function(e){var a=String.fromCharCode(e.keyCode||e.which),t=$(this).val();i.test(a)&&(l.tagsFromText(t),l.linksFromText(t)),l.applyText(t),p.caption()},removeTag:function(){var e=$(this).closest(".tag").attr("tag");l.removeTag(e),$(this).closest(".tag").remove()},removelink:function(){l.removelink(),p.url()}},p={tags:function(a){o.tags.find(".tag").remove(),u.shell({name:"tags",inner:append,el:o.tags,data:{tags:r.tags.get()}},function(e){e.el.find(".remove").on("click",d.removeTag),a&&a()})},tagsResults:function(e,a){u.shell({name:"tagsResult",data:{results:e}},function(e){a&&a(e.rendered)})},all:function(){o.eMessage[0].emojioneArea.setText(r.message.v),p.tags(),p.url(),p.caption(),p.images()},caption:function(){r.caption.v||100<r.message.v.length?o.cpt.hasClass("active")||o.cpt.addClass("active"):o.cpt.removeClass("active")},url:function(e){var a=r.url.v,i=u.app.platform.parseUrl(a),s=u.app.platform.sdk.remote.storage[a];u.shell({name:"url",inner:html,el:o.urlWrapper,data:{url:r.url.v,og:s,remove:!0,share:r}},function(t){if(r.url.v&&!s)if("youtube"==i.type||"vimeo"==i.type)Plyr.setup(".js-player");else u.app.platform.sdk.remote.get(i.url,function(e){e&&p.url()});else if(s){var n=t.el.find("img");t.el.find("img").imagesLoaded({background:!0},function(e){_.each(e.images,function(e,a){e.isLoaded?($(n[a]).addClass("active"),500<e.img.naturalWidth&&t.el.addClass("bigimageinlink")):$(n[a]).closest(".image").css("display","none")})}),t.el.find(".removeImage").on("click",function(){r.settings.image="r",p.url(),g.save()})}t.el.find(".removelink").on("click",d.removelink),e&&e()})},images:function(t){u.shell({name:"images",turi:"embeding",inner:html,el:o.images,data:{images:_.map(r.images.v||[],function(e,a){return{src:e,id:a}})}},function(e){e.el.find(".remove").on("click",function(){var e=$(this).closest(".imageContainer").attr("value");l.removeImage(e)}),e.el.find(".edit").on("click",function(){var e=$(this).closest(".imageContainer").attr("value");l.editImage(e)}),e.el.find(".image").on("click",function(){var e=$(this).attr("i");if(e){var a=_.map(r.images,function(e){return{src:e}});u.app.nav.api.load({open:!0,id:"imageGallery",inWnd:!0,essenseData:{initialValue:e,idName:"src",images:a}})}}),e.el.find(".image").imagesLoaded({background:!0},function(e){if(isMobile())t&&t(),o.images.addClass("active");else{var a=o.images.find(".imagesEmbWr");a.isotope({layoutMode:"packery",itemSelector:".imageContainer",packery:{gutter:20},initLayout:!1}),a.on("arrangeComplete",function(){t&&t(),o.images.addClass("active")}),a.isotope()}})})}},g={save:function(){r?u.app.settings.set(u.map.id,"currentShare",r.export(!0)):u.app.settings.set(u.map.id,"currentShare","")},load:function(){var e=u.app.settings.get(u.map.id,"currentShare");e&&r.import(e)}},m=function(){p.all()};return{primary:a,post:l.post,auto:function(){parameters().marticles&&!u.app.nav.wnds.articles&&l.embeding("article",null)},getdata:function(e,a){r=deep(a,"settings.essenseData.share")||new Share,(s=deep(a,"settings.essenseData")||{}).share||g.load(),e({share:r})},destroy:function(){delete u.app.platform.ws.messages.transaction.clbks.share,o.c&&o.c.find(".emojionearea-editor").off("pasteImage"),o={},Sortable&&Sortable.destroy&&Sortable.destroy()},init:function(e){(o={}).c=e.el.find("#"+u.map.id),o.tagSearch=o.c.find(".searchWrapper"),o.tags=o.c.find(".tagsCont"),o.message=o.c.find(".message"),o.eMessage=o.c.find("#emjcontainer"),o.panel=o.c.find(".panel .item"),o.error=o.c.find(".error"),o.postWrapper=o.c.find(".postWrapper"),o.post=o.c.find(".post"),o.urlWrapper=o.c.find(".urlWrapper"),o.caption=o.c.find(".captionshare"),o.cpt=o.c.find(".cpt"),o.images=o.c.find(".imagesWrapper"),o.changeAddress=o.c.find(".changeAddress"),o.changePostTime=o.c.find(".postTime"),o.selectTime=o.c.find(".selectedTimeWrapper"),function(){o.changeAddress.on("change",d.changeAddress),o.changePostTime.on("change",d.changePostTime),o.selectTime.on("click",d.selectTime),o.panel.on("click",d.embeding),o.post.on("click",d.post),o.eMessage.emojioneArea({pickerPosition:"bottom",search:!1,tones:!1,autocomplete:!1,attributes:{spellcheck:!0},events:{change:d.eTextChange,click:d.eTextChange,keyup:d.eText,onLoad:function(e,a){parameters().newshare&&o.c.find(".emojionearea-editor").focus(),o.c.find(".emojionearea-editor").pastableContenteditable(),o.c.find(".emojionearea-editor").on("pasteImage",function(e,a){topPreloader(100),r.images.set(a.dataURL)?p.images&&p.images():sitemessage(c.images)}).on("pasteImageStart",function(){topPreloader(30)}).on("pasteImageError",function(e,a){topPreloader(100)}).on("pasteText",function(e,a){l.eTextChange(o.eMessage[0].emojioneArea)})}}}),o.caption.on("keyup",d.caption),r.on.change.edit=d.change,isMobile()||o.c.find(".tooltip").tooltipster({theme:"tooltipster-light",maxWidth:600,zIndex:20}),search(o.tagSearch,{placeholder:u.app.localization.e("addtags"),clbk:function(e){},time:0,events:{fastsearch:function(e,a,t){if(console.log("fastsearch",e,t),t){var n=String.fromCharCode(t.keyCode||t.which);if(/[,.!?;:() ]/.test(n))return d.addTag(e.replace(/#/g,"").replace(/ /g,"")),o.tagSearch.find("input").val("").focus(),void a(null)}u.app.platform.sdk.tags.search(e,function(e){p.tagsResults(e,function(e){a(e,function(e,a){e.find(".result").on("click",function(){var e=$(this).attr("result");a.closeResults(),a.clear(),d.addTag(e)}),e.find(".empty").on("click",function(){var e=trim(o.tagSearch.find("input").val());e&&(a.closeResults(),a.clear(),d.addTag(e))})})})})},search:function(e,a,t){e=(e=e.replace(/#/g," ")).split(" "),1==(e=_.filter(e,function(e){return e})).length&&(e=e[0]),d.addTag(e),t.clear(),a&&a()}},last:{get:function(){return[u.app.localization.e("tnews"),u.app.localization.e("timages"),u.app.localization.e("tvideos"),u.app.localization.e("tmarket"),u.app.localization.e("tsport")]},tpl:function(e,a){p.tagsResults(e,function(e){a(e,function(e,a){e.find(".result").on("click",function(){var e=$(this).attr("result");a.closeResults(),a.clear(),d.addTag(e)})})})}}});var e={animation:150,swapThreshold:.5,draggable:".draggablepart",onUpdate:function(e){var a=[],t=$(n).find(".draggablepart");$.each(t,function(){a.push($(this).attr("part"))}),r.settings.a=a,s.share||g.save(),s.changeArrange&&s.changeArrange()},forceFallback:!0,handle:".marker"},n=document.getElementById("sortableBody");n&&!isMobile()&&Sortable.create(n,e),l.autoFilled(),console.log("INIT"),u.app.platform.ws.messages.transaction.clbks.share=l.waitActions}(),m(),e.noscroll=u.app.actions.scrollBMenu(),e.clbk(null,e),l.waitActions()},id:e._id}};return u.run=function(e){var a=u.addEssense(t,n,e);u.init(a,e)},u.stop=function(){_.each(t,function(e){e.destroy()})},u}();"undefined"!=typeof module?module.exports=share:(app.modules.share={},app.modules.share.module=share);
 /*_____*/ 
var wallet=function(){var g=new nModule,t={},n=function(e){var i,a=deep(e,"history"),s={},l={pnetwallet:{label:g.app.localization.e("tacaddress"),alabel:g.app.localization.e("tacaddress"),id:"pnetwallet",addresses:function(){return[g.app.platform.sdk.address.pnet().address]}},wallet:{label:g.app.localization.e("twallet"),id:"wallet",addresses:function(){return g.app.platform.sdk.addresses.storage.addresses||[]},caption:g.app.localization.e("twalletaddresses")},total:{label:g.app.localization.e("tTotal"),id:"total",addresses:function(){return[g.app.platform.sdk.address.pnet().address].concat(g.app.platform.sdk.addresses.storage.addresses||[])}}},o={parameters:{source:new Parameter({name:"Source",type:"VALUES",id:"source",defaultValue:"pnetwallet",possibleValuesLabels:[g.app.localization.e("twallet"),g.app.localization.e("tacaddress"),g.app.localization.e("tTotal")],possibleValues:["wallet","pnetwallet","total"],placeholder:g.app.localization.e("wsselect")}),reciever:new Parameter({name:g.app.localization.e("wsreciever"),type:"VALUESCUSTOM",id:"reciever",possibleValuesLabels:[],possibleValues:[],placeholder:g.app.localization.e("wsenter"),onType:!0}),amount:new Parameter({name:g.app.localization.e("wsamount"),id:"amount",type:"NUMBER",placeholder:g.app.localization.e("wsamountof"),format:{Precision:6}}),fees:new Parameter({name:g.app.localization.e("wsincludefees"),type:"VALUES",id:"fees",defaultValue:"include",possibleValuesLabels:[g.app.localization.e("wsrecieverpay"),g.app.localization.e("wssenderpay")],possibleValues:["include","exclude"]})}},n={wallet:g.app.localization.e("twallet"),pnetwallet:g.app.localization.e("tacaddress")},r={active:!1,parameters:{deposit:new Parameter({name:g.app.localization.e("wrecieveon"),type:"VALUES",id:"deposit",defaultValue:"wallet",possibleValuesLabels:[g.app.localization.e("twallet"),g.app.localization.e("tacaddress")],possibleValues:["wallet","pnetwallet"],placeholder:g.app.localization.e("wdselectfrom")}),depositamount:new Parameter({name:g.app.localization.e("wdamount"),id:"depositamount",type:"NUMBER",placeholder:g.app.localization.e("wdenteramount"),onType:!0,format:{Precision:6}}),message:new Parameter({name:g.app.localization.e("wdmessage"),id:"message",type:"TEXT",placeholder:g.app.localization.e("wdmessageplaceholder"),onType:!0}),label:new Parameter({name:g.app.localization.e("wdlabel"),id:"label",type:"STRING",onType:!0})}},d={active:!1,parameters:{reciever:new Parameter({name:g.app.localization.e("wrecieveon"),type:"VALUES",id:"reciever",defaultValue:"pnetwallet",possibleValuesLabels:[g.app.localization.e("tacaddress")],possibleValues:["pnetwallet"],placeholder:g.app.localization.e("wdselectfrom")}),amount:new Parameter({name:"Pocetcoin Amount",id:"amount",type:"NUMBER",placeholder:g.app.localization.e("wsamountof"),format:{Precision:6}}),currency:new Parameter({name:"Currency",id:"currency",type:"VALUES",defaultValue:"btc",possibleValuesLabels:["BTC","LTC"],possibleValues:["btc","ltc"],placeholder:"Select currency"}),currencyAmount:new Parameter({name:"Currency Amount",id:"currencyAmount",type:"NUMBER",placeholder:g.app.localization.e("wsamountof"),format:{Precision:6}})},segments:[{id:"AWAITINGFUNDS",time:180,exclude:"all",label:function(e,a,t){if(e==this.id)return'<div class="todeal">'+t.currency.toUpperCase()+": "+a.Address+' <i class="fas fa-chevron-circle-right"></i> </div>'},currentLabel:function(e){return"Awaitng Funds. Address will be valid for <b>"+e.MinutesLeft+" minutes</b>"}},{id:"EXPIREDAWAITINGFUNDS",class:"bad",finish:!0,exclude:"all",label:function(e,a){return"Time to this deal has been expired."},currentLabel:function(e){return'Time to this deal has been expired. <div class="reactivate">Reactivate</div>'}},{id:"CONFIRMATIONS0",time:10,currentLabel:function(e){return"Waiting blockchain confirmations (0/4)"}},{id:"CONFIRMATIONS1",time:10,currentLabel:function(e){return"Waiting blockchain confirmations (1/4)"}},{id:"CONFIRMATIONS2",time:10,currentLabel:function(e){return"Waiting blockchain confirmations (2/4)"}},{id:"CONFIRMATIONS3",time:10,currentLabel:function(e){return"Waiting blockchain confirmations (3/4)"}},{id:"POCSENT",time:4,currentLabel:function(e){return"Send Pocketcoins to You"}},{id:"POCDELEVERED",finish:!0,currentLabel:function(e){return"Pocketcoins delivered"}}]},c=[],p=[],u=0,m={showCrInStep:function(a,e,t,n){h.step(function(e){h.crowdfunding(function(e){a&&m[a](e,n),h.stepC(e,t)},e)},e,{class:"crowdfunding",view:a})},olddeal:function(e,a){h.crDeal(a,g.app.platform.sdk.exchanges.info[a.info.address],e.find(".actionbody"))},newdeal:function(n){var e={currency:d.parameters.currency.value,address:d.parameters.reciever.value,amount:d.parameters.amount.value,currencyAmount:d.parameters.currencyAmount.value};m.pocAddress(e,function(e,a,t){e?sitemessage("Something went wrong. Please reload page and try again (error: 0003)"):h.crDeal(a,t,n.find(".actionbody"))})},showListcount:function(t){g.app.platform.sdk.exchanges.statuses(function(e,a){e?sitemessage("Something went wrong. Please reload page and try again (error: 0004)"):h.showListcount(a,t.find(".actionbody"))})},status:function(){},pocAddress:function(e,n){e||(e={}),e.reciever&&"pnetwallet"!=e.reciever||(e.address=g.app.platform.sdk.address.pnet().address),"wallet"==e.reciever&&(e.address=g.app.platform.sdk.addresses.storage.addresses[0]),e.currency&&e.address?g.app.platform.sdk.exchanges.address(e,function(e,a,t){e?n&&n("fail",null):n&&n(null,a,t)}):n&&n("no data",null)},sendAddresses:function(){var e=o.parameters.source.value;return l[e].addresses()},canChangeSend:function(){if(o.parameters.reciever.value){var t=null;if(_.find(n,function(e,a){return t=a,o.parameters.reciever.value==e||o.parameters.reciever.value==a}))return t}return null},sendParameters:function(){var t=o.parameters.source.value;(o.parameters.reciever.possibleValues=[],o.parameters.reciever.possibleValuesLabels=[],_.each(n,function(e,a){a!=t&&"total"!=t&&(o.parameters.reciever.possibleValues.push(a),o.parameters.reciever.possibleValuesLabels.push(e))}),"total"==t)&&(_.find(n,function(e,a){return o.parameters.reciever.value==e||o.parameters.reciever.value==a})&&(o.parameters.reciever.value=""));o.parameters.reciever.value!=t&&o.parameters.reciever.value!=n[t]||(o.parameters.reciever.value=o.parameters.reciever.possibleValuesLabels[0]),o.parameters.reciever.possibleValues.length?o.parameters.reciever.placeholder=g.app.localization.e("wrenteraddressselect"):o.parameters.reciever.placeholder=g.app.localization.e("wrenteraddress");var e=m.sendAddresses();g.app.platform.sdk.node.transactions.get.balance(function(e){o.parameters.amount.value>e&&(o.parameters.amount.value=e)},e,null,!0)},addaddress:function(){var e=g.app.platform.sdk.addresses.storage.addresses.length;g.app.platform.sdk.addresses.addWalletAddress(e),g.app.platform.sdk.addresses.save(),topPreloader(0),b(function(){topPreloader(100)})},linkValidation:function(){return 0<r.parameters.depositamount.value&&trim(r.parameters.message.value)},linkValidationQr:function(){return 0<r.parameters.depositamount.value},showDepositInStep:function(a,e,t){h.step(function(e){h.deposit(function(e){m[a](e),h.stepB(e,t)},e)},e,{class:"deposit"})},showQrResult:function(e){r.address&&m.linkValidationQr()&&h.qrResultForDeposit(r.address,e.find(".actionbody"))},showLinkResult:function(e){r.address&&m.linkValidation()&&h.linkResultForDeposit(r.address,e.find(".actionbody"))},showLinkMaker:function(e){r.address&&h.linkMakerForDeposit(r.address,e.find(".actionbody"))},showQrMaker:function(e){r.address&&h.qrMakerForDeposit(r.address,e.find(".actionbody"))},showDeposit:function(a){r.address="";var e=r.parameters.deposit.value,t="";if(r.active=!0,"pnetwallet"==e)return t=g.app.platform.sdk.address.pnet().address,r.address=t,void h.addressForDeposit(t,a.find(".actionbody"));"wallet"!=e||g.app.platform.sdk.addresses.addNewWalletAddress(function(e){g.app.platform.sdk.addresses.save(),t=e,r.address=t,h.addresses(),h.addressForDeposit(t,a.find(".actionbody"))})},showSendInStep:function(a,e,t){h.step(function(e){h.send(function(e){m[a](e),h.stepB(e,t)},e)},e,{class:"send"})},calculateFee:function(a){g.app.platform.sdk.node.fee.estimate(function(e){h.sendFees(a.find(".actionbody"),e)})},validSend:function(){var e=o.parameters.amount.value,a=o.parameters.reciever.value;return!!(0<e&&a)},prepareTransaction:function(l,d){var a=function(r,o,i){g.app.platform.sdk.wallet.txbase(r,_.clone(o),0,i,function(e,a,t){if(e)sitemessage(e);else{var n=g.app.platform.sdk.node.transactions.create.wallet(a,t),s=Math.min(n.virtualSize()*l,.0999);d&&d(r,o,s,i)}})},t=o.parameters.amount.value,n=o.parameters.fees.value,s=m.sendAddresses(),r=[],e=o.parameters.reciever.value;if("pnetwallet"==e||e==g.app.localization.e("tacaddress"))return r.push({address:g.app.platform.sdk.address.pnet().address,amount:t}),void a(s,r,n);"wallet"!=e&&e!=g.app.localization.e("twallet")?(r.push({address:e,amount:t}),a(s,r,n)):g.app.platform.sdk.addresses.addNewWalletAddress(function(e){r.push({address:e,amount:t}),g.app.platform.sdk.addresses.save(),a(s,r,n)})}},f=function(){m.addaddress()},v=function(){$(this).closest(".actionbody").html("")},h={clearMain:function(e){g.shell({animation:{id:"fadeInByElement",selector:".fadeInByElement",timeouts:150},clear:!0,el:i.c.find(".animationWrapper")},e)},clearStep:function(e){g.shell({animation:{id:"fadeInByElement",selector:".fadeInByElementStep",timeouts:150},clear:!0,el:i.step},e)},mainWithClear:function(e){c=[],p=[],h.clearStep(function(){h.main(function(){b()})})},main:function(e){g.shell({name:"main",el:i.main,data:{},animation:"fadeIn"},function(){i.total=i.c.find(".total"),i.addresses=i.c.find(".addresses"),i.send=i.c.find(".send"),i.deposit=i.c.find(".deposit"),i.crowdfunding=i.c.find(".crowdfunding"),e&&e()})},stepC:function(e,a){e.find("._stepback").html('<div class="backWrapper"><div class="back"><i class="fas fa-arrow-left"></i></div></div>'),e.find("._stepclose").html('<div class="closeAdditional"><span><i class="fas fa-undo"></i> '+g.app.localization.e("wreturntoeallet")+"</span></div>"),e.find("._subcaptionlevel span").html(a||"")},stepB:function(e,a){e.find("._stepback").html('<div class="backWrapper"><div class="back"><i class="fas fa-arrow-left"></i></div></div>'),e.find("._stepclose").html('<div class="closeAdditional"><span><i class="fas fa-undo"></i> '+g.app.localization.e("wreturntoeallet")+"</span></div>"),e.find("._subcaptionlevel span").html(a||"")},step:function(t,e,n){n||(n={}),u==e?t&&t(i.c.find(".step")):(c[u=e]=t,p[e]=n,h.clearMain(function(){_scrollToTop(i.step,0,200,-70),setTimeout(function(){g.shell({name:"step",el:i.step,data:{},animation:"fadeIn"},function(e){var a=e.el.find(".step");n.class&&a.addClass(n.class),n.view?a.attr("view",n.view):a.removeAttr("view"),t&&t(a)})},200)}))},showListcount:function(e,a){var t=g.app.platform.sdk.exchanges.get();g.shell({name:"listcr",el:a,data:{list:t,c:d}},function(s){var r=function(e,a){g.app.platform.sdk.exchanges.remove(e.currency,e.info.address),a.remove(),(t=g.app.platform.sdk.exchanges.get()).length||h.step(c[u-1],u-1,p[u-1])};s.el.find(".removecr").on("click",function(){var t=$(this).closest(".item"),e=t.attr("item"),n=g.app.platform.sdk.exchanges.find(e);g.app.platform.sdk.exchanges.status(n.currency,n.info.address,function(e,a){e?sitemessage("Something went wrong. Please reload page and try again (error: 0006)"):"AWAITINGFUNDS"==a.Status||"EXPIREDAWAITINGFUNDS"==a.Status?r(n,t):dialog({html:"Do you really want to delete information about this deal? Deal can't be stop",success:function(){r(n,t)}})})}),s.el.find(".updatecr").on("click",function(){var t=$(this).closest(".item"),e=t.attr("item"),n=g.app.platform.sdk.exchanges.find(e);n?g.app.platform.sdk.exchanges.status({address:n.info.address,currency:n.currency},function(e,a){e?sitemessage("Something went wrong. Please reload page and try again (error: 0002)"):h.crStatus(n,a,t.find(".status"))}):sitemessage("Something went wrong. Please reload page and try again (error: 0001)")}),s.el.on("click",".todeal",function(){var e=$(this).closest(".item").attr("item"),a=g.app.platform.sdk.exchanges.find(e);m.showCrInStep("olddeal",u+1,"Deal",a)}),lazyEach({array:t,action:function(e){var a=e.item,t=s.el.find('[item="'+a.info.address+'"] .status'),n=g.app.platform.sdk.exchanges.info[a.info.address];h.crStatus(a,n,t)}})})},listcount:function(e){var a="",t=g.app.platform.sdk.exchanges.get(),n=e.find(".listcountWrapper");0<t.length?(a="("+t.length+")",e.find(".listcount").html(a),n.fadeIn()):n.fadeOut()},crdealstatusstep:function(e,a,t){g.shell({name:"crdealstatusstep",el:t,data:{addressobject:e,info:a}},function(e){})},crDeal:function(n,s,e){console.log("addressobject",n,s),g.shell({name:"crdeal",el:e,data:{addressobject:n}},function(t){h.crStatus(n,s,t.el.find(".status")),h.crdealstatusstep(n,s,t.el.find(".crdealstatusstep")),t.el.on("click",".copyaddress1",function(){copyText(t.el.find(".forcopyaddress1")),sitemessage(g.app.localization.e("waddresswascop"))}),t.el.on("click",".copyaddress2",function(){copyText(t.el.find(".forcopyaddress2")),sitemessage(g.app.localization.e("waddresswascop"))}),t.el.on("click",".reactivate",function(){g.app.platform.sdk.exchanges.reactivate({address:n.info.address,currency:n.currency},function(e,a){e?sitemessage("Something went wrong. Please reload page and try again (error: 0002)"):(s=a,h.crStatus(n,s,t.el.find(".status")),h.crdealstatusstep(n,s,t.el.find(".crdealstatusstep")))})})})},applyStatus:function(n,s){_.find(d.segments,function(e){var a=s.find('.segment[segment="'+e.id+'"]');if(e.id==n.Status){console.log("Number(info.MinutesLeft) / Number(s.time)",Number(n.MinutesLeft)/Number(e.time),Number(n.MinutesLeft),Number(e.time));var t=100*Math.min((Number(e.time)-Number(n.MinutesLeft))/Number(e.time),.99);return a.find(".line").css("width",t+"%"),a.addClass("active"),e.class&&a.addClass(e.class),e.finish&&(a.addClass("ended"),a.find(".line").css("width","100%")),(e.finish||"all"==e.exclude)&&s.find(".current").html(e.currentLabel(n)),!0}a.addClass("ended"),a.find(".line").css("width","100%")})},crStatus:function(e,a,t,n){g.shell({name:"pocstatus",el:t,data:{addressobject:e,info:a,segments:d.segments}},function(e){h.applyStatus(a,t),n&&n()})},crowdRate:function(e,a,t){e.find(".rate .value").html("<b>1 POC = "+a[t].toFixed(6)+" "+t.toUpperCase()+"</b>")},crowdCurrencyLabel:function(e,a){e.find(".currencyAmountLabel").html(a.toUpperCase()+" Amount</b>")},crowdfunding:function(e,a){2==u&&(c[1]=function(e){m.showCrInStep("",1,"")},p[1]={class:"crowdfunding"}),d.parameters.currency||(d.parameters.currency.value="btc"),g.app.platform.sdk.exchanges.rates(function(n){g.app.platform.sdk.node.transactions.get.balance(function(t){t=Math.min(t/3,1e3),g.shell({name:"crowdfunding",el:a||i.crowdfunding,data:{d:d,amount:t}},function(a){ParametersLive(_.toArray(d.parameters),a.el),a.el.on("click",".closeAdditional",v),h.crowdRate(a.el,n,d.parameters.currency.value),h.crowdCurrencyLabel(a.el,d.parameters.currency.value),h.listcount(a.el),d.parameters.amount._onChange=function(e){d.parameters.amount.value<0&&(d.parameters.amount.value=0),d.parameters.amount.value>t&&(d.parameters.amount.value=t),d.parameters.currencyAmount.value=d.parameters.amount.value*n[d.parameters.currency.value],d.parameters.amount.el.closest(".inputWrapper").html(d.parameters.amount.input()),d.parameters.currencyAmount.el.closest(".inputWrapper").html(d.parameters.currencyAmount.input()),ParametersLive([d.parameters.amount,d.parameters.currencyAmount],a.el)},d.parameters.currency._onChange=function(e){g.app.platform.sdk.exchanges.rates(function(e){n=e,h.crowdRate(a.el,n,d.parameters.currency.value),h.crowdCurrencyLabel(a.el,d.parameters.currency.value)})},d.parameters.currencyAmount._onChange=function(e){d.parameters.currencyAmount.value<0&&(d.parameters.currencyAmount.value=0),d.parameters.currencyAmount.value/n[d.parameters.currency.value]>t&&(d.parameters.currencyAmount.value=Number((t*n[d.parameters.currency.value]).toFixed(6))),d.parameters.amount.value=d.parameters.currencyAmount.value/n[d.parameters.currency.value],d.parameters.amount.el.closest(".inputWrapper").html(d.parameters.amount.input()),d.parameters.currencyAmount.el.closest(".inputWrapper").html(d.parameters.currencyAmount.input()),ParametersLive([d.parameters.amount,d.parameters.currencyAmount],a.el)},a.el.find(".listcountWrapper").on("click",function(){m.showCrInStep("showListcount",2,"List of deals")}),a.el.find(".newdeal").on("click",function(){0<d.parameters.amount.value?(m.showCrInStep("newdeal",2,"Deal"),a.el.find(".required").addClass("hidden")):a.el.find(".required").removeClass("hidden")}),e&&e(a.el)})},"PFF7PevK753eYTwWBScdEAbWQrgu36AdUA",!0,!0)})},qrResultForDeposit:function(e,a,t){g.shell({name:"depositqrresult",el:a,data:{address:e,d:r}},function(e){})},linkResultForDeposit:function(e,a,t){g.shell({name:"depositlinkresult",el:a,data:{address:e,d:r}},function(e){e.el.find(".copylink").on("click",function(){copyText(e.el.find(".linkInTextArea")),sitemessage(g.app.localization.e("waddresswascop"))})})},linkMakerForDeposit:function(e,a,t){g.shell({name:"depositlinkmaker",el:a,data:{address:e,d:r}},function(e){var a=e.el.find(".getlink"),t=[r.parameters.depositamount,r.parameters.message,r.parameters.label];ParametersLive(t,e.el),_.each(t,function(e){e._onChange=function(){m.linkValidation()?a.removeClass("disabled"):a.addClass("disabled")}}),m.linkValidation()&&a.removeClass("disabled"),a.on("click",function(){m.linkValidation()&&m.showDepositInStep("showLinkResult",3,g.app.localization.e("linkCreated"))})})},qrMakerForDeposit:function(e,a,t){g.shell({name:"depositqrmaker",el:a,data:{address:e,d:r}},function(e){var a=e.el.find(".getlink"),t=[r.parameters.depositamount,r.parameters.message,r.parameters.label];ParametersLive(t,e.el),_.each(t,function(e){e._onChange=function(){m.linkValidationQr()?a.removeClass("disabled"):a.addClass("disabled")}}),m.linkValidationQr()&&a.removeClass("disabled"),a.on("click",function(){m.linkValidationQr()&&m.showDepositInStep("showQrResult",3,g.app.localization.e("wqrcodecreated"))})})},addressForDeposit:function(e,a,t){g.shell({name:"depositaddress",el:a,data:{address:e,d:r}},function(e){e.el.find(".getlink").on("click",function(){m.showDepositInStep("showLinkMaker",2,g.app.localization.e("wlinkcreating"))}),e.el.find(".qrcode").on("click",function(){m.showDepositInStep("showQrMaker",2,g.app.localization.e("wqrcodecreating"))}),e.el.find(".copyaddress").on("click",function(){copyText(e.el.find(".adr")),sitemessage(g.app.localization.e("waddresswascop"))})})},deposit:function(e,a){g.shell({name:"deposit",el:a||i.deposit,data:{d:r}},function(t){ParametersLive([r.parameters.deposit],t.el),r.parameters.deposit._onChange=function(e){g.app.settings.set(g.map.uri,"deposit",e);var a=r.parameters.deposit.labelByValue(e);t.el.find(".type").html(a),m.showDepositInStep("showDeposit",1,g.app.localization.e("wdoptions"))},t.el.find(".recieveaddress").on("click",function(){m.showDepositInStep("showDeposit",1,g.app.localization.e("wdoptions"))}),t.el.on("click",".closeAdditional",v),e&&e(t.el)})},sendFees:function(s,e,a){if(m.validSend()){var r=e.feerate||1e-6;m.prepareTransaction(r,function(e,a,t,n){g.shell({name:"sendfees",el:s,data:{fees:t,d:o}},function(e){ParametersLive([o.parameters.fees],e.el),o.parameters.fees._onChange=function(e){g.app.settings.set(g.map.uri,"feesMode",e)},e.el.find(".sendtransaction").on("click",function(){m.prepareTransaction(r,function(e,a,t,n){g.app.platform.sdk.wallet.txbase(e,_.clone(a),t,n,function(e,n,a){if(e)sitemessage(e);else{var t=g.app.platform.sdk.node.transactions.create.wallet(n,a);_.each(n,function(e){e.cantspend=!0}),console.log(n),g.app.platform.sdk.node.transactions.send(t,function(e,a){if(a)g.app.platform.sdk.node.transactions.releaseCS(n),sitemessage(a);else{var t=_.map(n,function(e){return e.txid});g.app.platform.sdk.node.transactions.clearUnspents(t),u=0,h.mainWithClear(),sitemessage(g.app.localization.e("wssuccessfully"))}})}})})})})})}},send:function(a,e){m.sendParameters(),g.shell({name:"send",el:e||i.send,data:{d:o}},function(t){ParametersLive(_.toArray(o.parameters),t.el);var e=t.el.find(".change"),n=function(){m.canChangeSend()?e.removeClass("hidden"):e.addClass("hidden")};o.parameters.amount._onChange=function(e){var a=m.sendAddresses();g.app.platform.sdk.node.transactions.get.balance(function(e){o.parameters.amount.value<0&&(o.parameters.amount.value=0),o.parameters.amount.value>e&&(o.parameters.amount.value=e),o.parameters.amount.el.closest(".inputWrapper").html(o.parameters.amount.input()),ParametersLive([o.parameters.amount],t.el),1==u&&m.showSendInStep("calculateFee",1,g.app.localization.e("wscalculatefees"))},a,null,!0)},o.parameters.source._onChange=function(e){m.sendParameters(),o.parameters.reciever.el.closest(".inputWrapper").html(o.parameters.reciever.input()),o.parameters.amount.el.closest(".inputWrapper").html(o.parameters.amount.input()),ParametersLive([o.parameters.reciever,o.parameters.amount],t.el),n(),1==u&&m.showSendInStep("calculateFee",1,g.app.localization.e("wscalculatefees"))},o.parameters.reciever._onChange=function(e){if(n(),!m.canChangeSend()&&e){var a=!0;try{bitcoin.address.fromBase58Check(e)}catch(e){a=!1}if(!a)return void t.el.find(".notvalidaddress").html(g.app.localization.e("wsaddressnotv"));t.el.find(".notvalidaddress").html(""),e[0]}else t.el.find(".notvalidaddress").html("")},e.on("click",function(){var e=m.canChangeSend();e&&(o.parameters.source.value=e,o.parameters.source._onChange(),o.parameters.source.el.closest(".inputWrapper").html(o.parameters.source.input()),ParametersLive([o.parameters.source],t.el))}),t.el.find(".calculateFee").on("click",function(){m.validSend()?(m.showSendInStep("calculateFee",1,g.app.localization.e("wscalculatefees")),t.el.find(".required").addClass("hidden")):t.el.find(".required").removeClass("hidden")}),n(),a&&a(t.el)})},addresses:function(s){var r=l.total.addresses(),o={};g.app.platform.sdk.node.transactions.get.unspents(function(n){g.app.platform.sdk.node.transactions.get.balance(function(e){_.each(n,function(e,a){o[a]=_.reduce(e,function(e,a){return e+Number(a.amount)},0)});var a=[l.pnetwallet,l.wallet],t=_.map(a,function(e){var a=_.map(e.addresses(),function(e){return{balance:o[e],address:e}});return{caption:e.caption,details:a,label:e.alabel}},r);g.shell({name:"addresses",el:i.addresses,data:{addressesGroup:t,total:e}},function(e){e.el.find(".addaddress").on("click",f),s&&s()})},r)},r)},updateTotal:function(e,a){h.datasets(e,s[e.id].data.datasets),s[e.id].update(),i.total.find('.totalItem[item="'+e.id+'"] .balanceWrapper').html(g.app.platform.mp.coinwithsmall(e.balance)),a&&a()},datasets:function(e,a){var t=[],n=_.map(e.move,function(e){return t.push(e.color),Number(e.summary||0)}),s=[],r=[],o=[],i=[],l="#F1F1F1";_.each(e.move,function(e){_.each(e.items,function(e){s.push(Number(e.value)),r.push(e.color),o.push(l),i.push(8)})});var d=[{data:n,backgroundColor:t,borderColor:[l,l],borderWidth:[8,8]},{data:s,backgroundColor:r,borderColor:o,borderWidth:i}];return _.each(a,function(e,a){e.data=d[a].data}),d},total:function(t,n){t.update?h.updateTotal(t,n):g.shell({name:"total",el:i.total,inner:append,data:{item:t}},function(e){var a=e.el.find("#chart"+t.id)[0].getContext("2d");s[t.id]=new Chart(a,{type:"doughnut",data:{datasets:h.datasets(t)},options:{rotation:.5*Math.PI,cutoutPercentage:85}}),n&&n()})}},t=function(){},w=function(e,d){lazyEach({array:_.toArray(l),sync:!0,action:function(i){var l=i.item,e=l.addresses();g.app.platform.sdk.node.transactions.get.balance(function(o){g.app.platform.sdk.node.transactions.get.canSpend(e,function(e,a){var t="#414244",n=100,s=g.app.platform.sdk.node.transactions.tempBalance();a&&("pnetwallet"!=l.id&&"total"!=l.id||(a=s+a),n=100*e/a,t="#0F8623");var r={positive:{summary:n,color:t}};e<a&&(r.neutral={summary:100-n,color:"#414244"}),"pnetwallet"==l.id&&(o=s+o),h.total({label:l.label,id:l.id,balance:o,move:r,update:d},i.success)})},e)},all:{success:function(){e&&e()}}})},b=function(e){i.total.html(""),w(function(){lazyActions([h.send,h.deposit,h.addresses],e),g.app.platform.sdk.node.transactions.clbks.circles=function(){w(null,!0)},g.app.platform.sdk.node.transactions.clbks.walletaddresses=function(){h.addresses()}})};return{primary:a,getdata:function(e){var a={};a.p2pkh=g.app.platform.sdk.address.pnet(),r.parameters.deposit.value=g.app.settings.get(g.map.uri,"deposit")||r.parameters.deposit.defaultValue,o.parameters.source.value=g.app.settings.get(g.map.uri,"source")||o.parameters.source.defaultValue,o.parameters.reciever.value="",o.parameters.fees.value=g.app.settings.get(g.map.uri,"feesMode")||o.parameters.fees.defaultValue,r.active=!1,u=0,c=[],p=[],e(a)},destroy:function(){delete g.app.platform.sdk.node.transactions.clbks.circles,delete g.app.platform.sdk.node.transactions.clbks.walletaddresses,i={}},init:function(a){s={},t(),(i={}).c=a.el.find("#"+g.map.id),i.step=i.c.find(".actionstep"),i.main=i.c.find(".mainstep"),i.c.on("click","._stepclose",function(){u=0,h.mainWithClear()}),i.c.on("click","._stepback",function(){1<u?h.step(c[u-1],u-1,p[u-1]):(u=0,h.mainWithClear())}),h.main(function(){b(function(){var e=parameters();e.action&&"send"==e.action&&(o.parameters.amount.value=Number(e.amount.replace(/,/g,"")),o.parameters.reciever.value=e.address,o.parameters.amount._onChange(),m.showSendInStep("calculateFee",1,g.app.localization.e("wscalculatefees"))),a.clbk(null,a)})})}}};return g.run=function(e){var a=g.addEssense(t,n,e);g.init(a,e)},g.stop=function(){_.each(t,function(e){e.destroy()})},g}();"undefined"!=typeof module?module.exports=wallet:(app.modules.wallet={},app.modules.wallet.module=wallet);
 /*_____*/ 
var lenta=function(){var ee=new nModule,n={},a=function(e){var d,c,l,o,r,t,n,a=deep(e,"history"),s=e.mid,i=[],p={},f={},u={},h=!1,m=!1,v={},g=[],b=!1,k=0,w=null,x=0,y=0,C=null,T=!1,E={clear:function(){i=[],f={},m=h=!(u={}),v={},k=y=0,C=w=t=null,m=T=b=!(g=[]),loaded=!1,x=0},loadmore:function(){R.shares(function(e,t){e&&Q.shares(e,function(){p={},Q.sharesInview(e,function(){})},{index:g.length})})},removeAdditionalByScroll:function(){if(w){var e=$(window).scrollTop();150<Math.abs(e-k)&&E.additional(w,!1)}},additional:function(e,t){t?(e.addClass("showAdditional"),e.find(".subscribeWrapper").fadeIn(),k=$(window).scrollTop(),w=e,window.addEventListener("scroll",E.removeAdditionalByScroll)):(e.removeClass("showAdditional"),e.find(".subscribeWrapper").fadeOut(),window.removeEventListener("scroll",E.removeAdditionalByScroll))},applyheight:function(e,t,n){},applyheightEl:function(e,t,n){if(d&&d.shares&&e&&t.length){var a=t.height();return t.length&&c.scrollTop()>t.offset().top?(E.applyheight(e,a,n),d.shares.css("height","auto")):d.shares&&d.shares.css("height","auto"),a}},stateAction:function(t,n){ee.app.user.isState(function(e){e?n():ee.nav.api.load({open:!0,id:"authorization",inWnd:!0,essenseData:{loginText:ee.app.localization.e("llogin"),successHref:t,signInClbk:function(){n&&n()}}})})},initVideo:function(e,t){if(!ee.app.platform.sdk.usersettings.meta.embedvideo||ee.app.platform.sdk.usersettings.meta.embedvideo.value){var n=e.find(".js-player"),a=e.find(".videoWrapper");if(n.length){var s=e.height(),i={muted:!0,resetOnEnd:!0};"a"==t.settings.v&&(i.muted=!1,i.autoplay=!1);var o=new Plyr(n[0],i);v[t.txid]||(v[t.txid]={}),v[t.txid].p=o,v[t.txid].initing=!0,v[t.txid].el=a,v[t.txid].id=a.attr("pid"),o.on("ready",function(){n.find("iframe").attr("disable-x-frame-options","disable-x-frame-options"),v[t.txid].inited=!0,v[t.txid].inited=!0,s=E.applyheightEl(s,e,"video")})}}},openPost:function(e,t){ee.nav.api.load({open:!0,href:"post?s="+e,inWnd:!0,history:!0,clbk:function(){t&&t()},essenseData:{share:e,hr:l.hr,like:function(e){Q.stars(e)}}})},sharesocial:function(e,t){var n=ee.app.platform.sdk.node.shares.storage.trx[e];if(n){var a="https://pocketnet.app/"+l.hr+"s="+e+"&mpost=true&ref="+ee.app.platform.sdk.address.pnet().address+"&address="+(parameters().address||""),s=n.caption||n.message,i=trimHtml(s,20),o=n.images[0];if(!o&&n.url){var r=videoImage(n.url);r&&(o=r)}ee.nav.api.load({open:!0,href:"socialshare",history:!0,inWnd:!0,essenseData:{url:a,caption:"Share publication in social",image:o,title:i}})}},donate:function(e,t){var n=ee.app.platform.sdk.node.shares.storage.trx[e];if(n){var a=deep(app,"platform.sdk.usersl.storage."+n.address)||{address:n.address,addresses:[]},s="send?address="+n.address+"&amount=1&message="+hexEncode(ee.app.localization.e("postlabel")+" &mdash; "+(n.caption||n.message).substr(0,20)+"...")+"&label="+(a.name||a.address)+"&setammount=true";ee.fastTemplate("donation",function(e){dialog({html:e,class:"one donation",btn1text:ee.app.localization.e("dcancel"),clbk:function(e,t){e.find(".pnetdnt").on("click",function(){ee.nav.api.load({open:!0,href:s,history:!0}),t.destroy()}),e.find(".copy").on("click",function(){var e=$(this).closest(".address").find(".addr");copyText(e),sitemessage(ee.app.localization.e("successfullycopiedaddress"))})}})},{userinfo:a})}},videoPosition:function(e){var t=e.find(".work");if(e.hasClass("fullScreenVideo")){var n=($(window).height()-(e.find(".videoWrapper").height()+100))/2;0<n?t.css("margin-top",n+"px"):t.css("margin-top","0px")}else t.css("margin-top","0px")},fullScreenVideo:function(e,t){if(v[e]){var n=d.c.find("#"+e);n.addClass("fullScreenVideo"),E.videoPosition(n),ee.app.nav.api.history.addParameters({v:e});var a=v[e];a.p.playing||a.p.play(),a.p.muted=!1,ee.app.actions.offScroll(),p[e]&&p[e].changein(d.c.find("#"+e),0),Q.comments(e,!1,!0),t&&t()}},exitFullScreenVideo:function(e){var t=d.c.find("#"+e);t.removeClass("fullScreenVideo"),E.videoPosition(t),v[e].p.muted=!0,ee.app.nav.api.history.removeParameters(["v"]),ee.app.actions.onScroll(),p[e]&&(p[e].changein(null),p[e].hideall(!0))},like:function(n,e,a){var s=n.upvote(e);if(!s)return ee.app.platform.errorHandler("4",!0),void(a&&a(!1));ee.sdk.node.transactions.create.commonFromUnspent(s,function(e,t){topPreloader(100),e?a&&a(!0):(s.myVal=null,n.myVal=0,ee.app.platform.errorHandler(t,!0),a&&a(!1))})},complain:function(e,n){var t=e.complain();ee.sdk.node.transactions.create.commonFromUnspent(t,function(e,t){topPreloader(100),e?n&&n(!0):(d.postWrapper.addClass("showError"),ee.app.platform.errorHandler(t,!0),n&&n())})},openGallery:function(e,t,n){var a=_.map(e.images,function(e){return{src:e}}),s=findIndex(a,function(e){if(e.src==t)return!0});ee.app.nav.api.load({open:!0,href:"imagegallery?i="+e.txid+"&num="+(s||0),inWnd:!0,history:!0,essenseData:{initialValue:t,idName:"src",images:a,gid:e.txid},clbk:function(){n&&n()}})},videosInview:function(e,i,o){if(!ee.app.platform.sdk.usersettings.meta.videoautoplay||ee.app.platform.sdk.usersettings.meta.videoautoplay.value){var r=_.filter(e,function(e){if(e.inited&&!e.playing&&!e.stopped&&e.el)return!0});r.length&&(t=slowMade(function(){r=_.filter(r,function(e){return e.el});_.map(r,function(e){return e.el[0]});var e=inView(d.c.find(".videoWrapper"),{offset:$(window).height()/10,mode:"all"}),t=null;if(0<e.length){var n=$(e[0]);t=n.attr("pid");var a=_.find(r,function(e){return e.id==t});if(!t||!a)return;a&&setTimeout(function(){inView(n,{offset:-100,mode:"all"}).length&&i(a,n)},320)}var s=_.filter(r,function(e){return e.id!=t});s.length&&o(s)},t,30))}},scrollToPost:function(e){_scrollTo($("#"+e))},sharesInview:function(o,r,l){c.scrollTop();o.length&&!b&&(n=slowMade(function(){var e=d.c.find(".share"),t=c,n=$(window).height()/4,a=inView(e,{inel:t,offsetTop:n,offsetBottom:n,mode:"line"});if(0<a.length){var s={},i=_.map(a,function(e){var t=$(e).attr("id");return _.find(o,function(e){return e.txid==t})});i=_.filter(i,function(e){if(e&&!e.temp)return!0}),!0,r(i,a,function(){if(!1,l){var e=_.filter(o,function(e){if(!s[e.txid])return!0});l(e)}})}},n,30))},complain:function(e){ee.nav.api.load({open:!0,id:"complain",inWnd:!0,essenseData:{item:"post",obj:ee.app.platform.sdk.node.shares.storage.trx[e],success:function(){}},clbk:function(){}})}},S=function(){$(this).closest(".authorgroup").find(".share").removeClass("hidden"),$(this).remove(),Q.sharesInview(g,function(){})},A=function(){var n=$(this),a=$(this).closest(".share").attr("id"),s=$(this).closest(".shareTable").attr("address"),i={};i.share=ee.app.platform.sdk.node.shares.storage.trx[a],ee.fastTemplate("metmenu",function(e,t){ee.app.platform.api.tooltip(n,function(){return i.share=ee.app.platform.sdk.node.shares.storage.trx[a],i.mestate=r,t(i)},function(e){e.find(".socialshare").on("click",function(){E.sharesocial(a),n.tooltipster("hide")}),e.find(".subscribe").on("click",function(){ee.app.platform.api.actions.subscribe(s,function(e,t){e||ee.app.platform.errorHandler(t,!0)}),n.tooltipster("hide")}),e.find(".unsubscribe").on("click",function(){ee.app.platform.api.actions.unsubscribe(s,function(e,t){e||ee.app.platform.errorHandler(t,!0)}),n.tooltipster("hide")}),e.find(".complain").on("click",function(){E.complain(a),n.tooltipster("hide")}),e.find(".donate").on("click",function(){E.donate(a),n.tooltipster("hide")})})},i)},V=function(){var e=d.c.find(".fullScreenVideo");0<e.length&&E.videoPosition(e)},I=function(){$(window).scrollTop()+$(window).height()>$(document).height()-400&&!h&&!m&&"recommended"!=o&&E.loadmore()},L=function(e){E.sharesInview(g,function(e,t,n){},function(e){})},P=function(e){E.videosInview(v,function(e,t,n){t.closest(".share").hasClass("showAdditional")||e.p.play()},function(e){_.each(e,function(e){e.p.muted=!0,e.p.playing&&e.p.stop()})})},W=function(){var e=$(this).closest(".share").attr("id");console.log("ID",e),Q.comments(e,!0)},H=function(){var e=$(this).closest(".share").attr("id");ee.app.platform.sdk.node.transactions.get.tx(e)},M=function(){if(l.authAction)l.authAction("like");else{var n=$(this).closest(".stars");if(!n.attr("value")){var e=$(this).closest(".share").attr("id"),a=$(this).attr("value"),s=ee.app.platform.sdk.node.shares.storage.trx[e];n.attr("value",a),n.addClass("liked"),E.stateAction("_this",function(){E.like(s,a,function(e){if(e){s.scnt||(s.scnt=0),s.score||(s.score=0),s.scnt++,s.score=Number(s.score||0)+Number(a);var t=Number(s.score)/Number(s.scnt);n.find(".tstarsov").css("width",t/5*100+"%"),n.closest(".itemwr").find(".count span.v").html(t.toFixed(1)),Q.stars(s)}else n.removeAttr("value"),n.removeClass("liked")})})}}},z=function(){var e=$(this).closest(".share").attr("id");E.complain(e)},D=function(){var e=$(this).closest(".share");E.additional(e,!e.hasClass("showAdditional"))},N=function(){var t=$(this).closest(".share").attr("id"),e=$(this).attr("i"),n=ee.app.platform.sdk.node.shares.storage.trx[t];if(!n){var a=_.find(ee.sdk.node.transactions.temp.share,function(e){return e.txid==t});(n=new pShare)._import(a),n.temp=!0,n.address=ee.app.platform.sdk.address.pnet().address}E.openGallery(n,e)},F=function(){var e=$(this).closest(".shareTable").attr("address");$(this).closest(".share");ee.app.platform.api.actions.subscribe(e,function(e,t){e||ee.app.platform.errorHandler(t,!0)})},B=function(){var e=$(this).closest(".shareTable").attr("address"),n=$(this).closest(".share");ee.app.platform.api.actions.unsubscribe(e,function(e,t){e?n.find(".shareTable").removeClass("subscribed"):ee.app.platform.errorHandler(t,!0)})},O=function(){var e=$(this).closest(".share").attr("id");E.exitFullScreenVideo(e)},G=function(){var e=$(this).closest(".share").attr("id");E.fullScreenVideo(e)},U=function(){if(l.authAction)l.authAction("like");else{var e=$(this).closest(".share").attr("id");E.openPost(e)}},j=function(){var e=$(this).closest(".share").attr("id");E.sharesocial(e)},Z=function(){if(l.authAction)l.authAction("donate");else{var e=$(this).closest(".share").attr("id");E.donate(e)}},q=function(){if(l.authAction)l.authAction("discussion");else{var e=$(this).closest(".share").attr("id"),t=ee.app.platform.sdk.node.shares.getWithTemp(e);isMobile()?ee.nav.api.load({open:!0,id:"discussions",history:!0,clbk:function(){ee.app.platform.sdk.chats.add(e+"_"+t.address,"share")}}):ee.app.platform.sdk.chats.add(e+"_"+t.address,"share")}},J=function(){E.loadmore()},K=function(){d.c.find(".shares").html('<div class="bspacer"></div>'),d.c.removeClass("showprev"),d.c.removeClass("loading"),d.c.removeClass("sharesEnded"),d.c.removeClass("sharesZero"),E.clear(),Y()},Q={comments:function(n,t,a,s){if(!p[n]){var i=d.c.find("#"+n+" .commentsWrapper"),o=deep(ee.app.platform,"sdk.node.shares.storage.trx."+n);ee.fastTemplate("commentspreview",function(e){ee.nav.api.load({open:!0,id:"comments",el:i,eid:n+"lenta",essenseData:{close:function(){console.log("initedcommentes[txid]",p[n],n),p[n]&&p[n].hideall(!0),_scrollToTop(i,0,0,-65)},totop:d.c.find("#"+n),caption:e,send:function(){var e=d.c.find("#"+n+" .commentsAction .count span");e.html(Number(e.html()||"0")+1)},txid:n,init:t,showall:a,preview:s,lastComment:o.lastComment,count:o.comments},clbk:function(e,t){(e=d.c.find("#"+n)).hasClass("fullScreenVideo")&&t.changein(e,0),t&&(p[n]=t)}})},{share:o})}},roomsinfo:function(e){_.each(e,function(e){var t,n=deep(ee.app.platform,"rtc.storage.info."+e+".d.users_count"),a=e.split("_")[0];void 0!==n&&d.c&&d.c.find("#"+a+" .discussion .count").html((t=n)?"<b>"+t+"</b>":"")})},shareSpacers:function(e){_.each(e,function(e){Q.shareSpacer(e)})},shareSpacer:function(e){if(f[e.txid]&&!u[e.txid]){var t=d.shares.find("#"+e.txid),n=t.height(),a=t.find(".work").outerHeight();v[e.txid]&&v[e.txid].inited&&(v[e.txid].p.destroy(),v[e.txid].el=null,v[e.txid].inited=!1),f[e.txid]=!1,d.shares.css("height",d.shares.outerHeight()),t.html('<div class="shareSpacer added"></div>'),t.find(".shareSpacer").outerHeight(a),n=E.applyheightEl(n,t,"space")}},share:function(t,n){var a=d.shares.find("#"+t.txid);a.height(),a.find(".added");u[t.txid]=!0,ee.shell({name:"share",el:a,data:{share:t,ed:l,mestate:r}},function(e){a.find(".work");f[t.txid]=!0,Q.stars(t),Q.comments(t.txid,!1,!1,!0),Q.url(e.el.find(".url"),t.url,t,function(){Q.urlContent(t,function(){E.initVideo(e.el,t),u[t.txid]=!1,n&&n()})}),Q.images(t,function(){})})},stars:function(e,t){if(d.shares){var n=d.shares.find("#"+e.txid);n.length&&ee.shell({name:"stars",el:n.find(".forstars"),data:{share:e}},function(e){fastars(e.el.find(".stars")),t&&t()})}},sharesInview:function(e,t){e=_.filter(e,function(e){return!$("#"+e.txid).hasClass("hidden")}),lazyEach({array:e,action:function(e){var t=e.item;f[t.txid]?e.success():(f[t.txid]=!0,Q.share(t,e.success))},all:{success:function(){t()}}})},shares:function(t,n,e){e||(e={}),e.inner||(e.inner=append);var a="groupshares";(l.author||o||l.txids)&&(a="shares"),"recommended"==o&&(t=_.sortBy(t,function(e){return-e.time})),ee.shell({name:a,inner:e.inner,el:d.shares,data:{shares:t||[],index:e.index||0},animation:!1},function(e){g=e.inner==append?g.concat(t):t.concat(g),n&&n()})},videoPreview:function(e,t){var n=d.c.find("#"+e.txid);if("a"==e.settings.v){var a=n.find(".plyrvideo"),s=[];$.each(a,function(){var e=$(this),t={type:e.attr("provider"),id:e.attr("eid")};s.push(videoImage(t))})}else t&&t()},images:function(t,n){if(d.c){var a=d.c.find("#"+t.txid),s=a.find(".image"),l=a.find(".images");if(!l.hasClass("active")&&s.length&&l.length){var c=a.height();s.imagesLoaded({background:!0},function(r){"a"!=t.settings.v&&_.each(r.images,function(e,t){var n=e.img,a=$(r.elements[t]).closest(".imagesWrapper"),s="",i=a.width();a.height();if(n.width>1.2*n.height&&!isMobile()){s="w2";var o=i*(n.width/n.height);o>l.width()&&(o=l.width(),c=o*(n.height/n.width),a.height(c)),a.width(o)}(n.height>1.2*n.width||isMobile())&&(s="h2",a.height(i*(n.height/n.width))),s&&a.addClass(s)}),c=E.applyheightEl(c,a);var e=function(){l.addClass("active"),s.addClass("active"),c=E.applyheightEl(c,a),n&&n()};!isMobile()&&"a"!=t.settings.v&&1<r.images.length?(l.isotope({layoutMode:"packery",itemSelector:".imagesWrapper",packery:{gutter:20},initLayout:!1}),l.on("arrangeComplete",function(){e()}),l.isotope()):e()})}else n&&n()}},url:function(e,t,n,s){if(l.nourlload)s&&s();else{var a=ee.app.platform.sdk.remote.storage[t],i=e.closest(".share"),o=i.height();ee.shell({turi:"share",name:"url",el:e,data:{url:t,og:a,share:n}},function(n){o=E.applyheightEl(o,i,"url");var a=n.el.find("img");n.el.find("img").imagesLoaded({background:!0},function(e){_.each(e.images,function(e,t){e.isLoaded?($(a[t]).addClass("active"),500<e.img.naturalWidth&&n.el.addClass("bigimageinlink")):$(a[t]).closest(".image").css("display","none")}),o=E.applyheightEl(o,i,"url"),s&&s()})})}},urlContent:function(t,n){if(d.c){var a=t.url;if(a){var s=d.c.find("#"+t.txid+" .url"),e=ee.app.platform.parseUrl(a),i=ee.app.platform.sdk.remote.storage[a];a&&!i?"youtube"==e.type||"vimeo"==e.type?n&&n():ee.app.platform.sdk.remote.get(a,function(e){e?Q.url(s,a,t,n):n&&n()}):n&&n()}else n&&n()}},urlsContent:function(e){_.each(e,function(e){Q.urlContent(e)})},urls:function(e,t){lazyEach({array:e,sync:!0,action:function(e){Q.url(e.item.el,e.item.url,e.item.share,e.success)},all:{success:function(){t&&t()}}})}},R={recomended:function(t,n){d.loader.fadeIn(),d.c.addClass("loading"),i=[],l.author||C?t&&t(i):ee.app.platform.sdk.node.shares.recomended({},function(e){i=_.filter(e,function(t){if(!_.find(n,function(e){if(e.txid==t)return!0}))return!0}),ee.app.platform.sdk.node.shares.users(e,function(){t&&t(i)})})},txids:function(e,t){T?t([]):ee.app.platform.sdk.node.shares.getbyid(e,function(e){T=!0,t(e)})},begin:function(t){!C||T||o&&"sub"!=o?t([]):ee.app.platform.sdk.node.shares.getbyid(C,function(e){T=!0,t(e)})},shares:function(i,t){h||m||(d.loader.fadeIn(),d.c.addClass("loading"),h=!0,R.begin(function(a){var s=l.author,e="common";o&&("recommended"==o?e="recommended":(e="common",s="1")),l.txids&&(e="txids"),ee.app.platform.sdk.node.shares[e]({author:s,begin:C||"",txids:l.txids},function(t,e,n){_.each(a,function(e){e&&t.unshift(e)}),l.filter&&(t=_.filter(t,l.filter)),ee.app.platform.sdk.node.shares.users(t,function(){y+=t.length,h=!1,d.c&&((!t||!t.length||t.length<n.count)&&(C||y?t.length<n.count&&(o||s)&&d.c.addClass("sharesEnded"):d.c.addClass("sharesZero"),t.length<n.count&&(o||s)&&(m=!0)),d.loader.fadeOut(),i&&i(t,e))})},t)}))}},X=function(){},Y=function(){R.shares(function(e,t){e&&(C&&!o&&d.c.addClass("showprev"),Q.shares(e,function(){Q.sharesInview(e,function(){L();var e=parameters();if(e.s&&E.openPost(e.s,function(){E.scrollToPost(e.p)}),e.i){var t=deep(ee.app.platform,"sdk.node.shares.storage.trx."+e.i),n=null;t&&(e.num&&(n=deep(t,"images."+e.num)),E.openGallery(t,n))}e.v&&(E.scrollToPost(e.v),E.fullScreenVideo(e.v,function(){}))})}))},"clear")};return{id:s,primary:a,getdata:function(n,t){x=0,p={},l=t.settings.essenseData||{},E.clear();var e=parameters();C=e.s||e.i||e.v||null,o=!!e.r&&e.r,l.txids&&(o=!1),t.state||o||l.author||l.txids?ee.app.platform.sdk.ustate.me(function(e){r=e||{};var t={beginmaterial:C,author:l.author,recommended:o};ee.loadTemplate({name:"share"},function(){ee.loadTemplate({turi:"share",name:"url"},function(){ee.loadTemplate({name:"stars"},function(){n(t)})})})}):C?R.begin(function(e){ee.app.platform.sdk.node.shares.users(e,function(){t.settings.el.closest("#main").addClass("onepost"),ee.nav.api.load({open:!0,href:"post",primary:!0,el:t.settings.el,essenseData:{share:C},clbk:function(){}})})}):"undefined"!=typeof _Electron||window.cordova?ee.nav.api.load({open:!0,href:"authorization",history:!0}):ee.nav.api.load({open:!0,href:"video",history:!0})},destroy:function(){_.each(p,function(e){e.destroy()}),delete ee.app.platform.ws.messages.comment.clbks.lenta,delete ee.app.platform.sdk.node.shares.clbks.added.lenta,delete ee.app.platform.ws.messages.transaction.clbks.temp,delete ee.app.platform.ws.messages.event.clbks.lenta,delete ee.app.platform.ws.messages["new block"].clbks.newsharesLenta,delete ee.app.platform.clbks.api.actions.subscribe.lenta,delete ee.app.platform.clbks.api.actions.unsubscribe.lenta,ee.app.platform.sdk.chats.removeTemp(),window.removeEventListener("scroll",P),window.removeEventListener("scroll",L),window.removeEventListener("scroll",I),window.removeEventListener("resize",V),d={}},init:function(e){c=$(window),X(),(d={}).c=e.el.find("#"+ee.map.id),d.shares=d.c.find(".shares"),d.loader=d.c.find(".loader"),function(){window.addEventListener("scroll",L),window.addEventListener("scroll",P),window.addEventListener("resize",V),l.notscrollloading||window.addEventListener("scroll",I),d.c.on("click",".stars i",M),d.c.on("click",".complain",z),d.c.on("click",".imageOpen",N),d.c.on("click",".txid",H),isMobile()||(d.c.on("click",".sharecaption",U),d.c.on("click",".message",U)),d.c.on("click",".showMore",U),d.c.on("click",".videoTips",G),d.c.on("click",".exitFull",O),d.c.on("click",".additional",D),d.c.on("click",".asubscribe",F),d.c.on("click",".aunsubscribe",B),d.c.on("click",".donate",Z),d.c.on("click",".sharesocial",j),d.c.on("click",".discussion",q),d.c.on("click",".metmenu",A),d.c.find(".loadmore button").on("click",J),d.c.find(".loadprev button").on("click",K),d.c.on("click",".showmorebyauthor",S),d.c.on("click",".commentsAction",W),l.txids||(ee.app.platform.sdk.node.shares.clbks.added.lenta=function(e){Q.shares([e],function(){Q.sharesInview([e],function(){})},{inner:prepend})},ee.app.platform.ws.messages.transaction.clbks.temp=function(t){if(t.temp){var e=_.find(g,function(e){if(e.txid==t.temp.txid)return!0});e&&(e.temp=!1,e.scnt="0",e.score="0",e.myVal=0,f[e.txid]=!1,Q.sharesInview([e],function(){}))}},ee.app.platform.ws.messages.event.clbks.lenta=function(t){if("upvoteShare"==t.mesType&&t.share){var e=_.find(g,function(e){if(e.txid==t.share.txid)return!0});e&&Q.stars(e,function(){})}});var t=function(e){if(!C&&"recommended"!=o&&!l.author){var t=_.toArray(ee.sdk.node.transactions.temp.share||{}),n=0;t.length&&!o&&(n-=t.length),0<(e||0)+n&&(x=x+(e||0)+n,d.c.addClass("showprev"),d.c.find(".countnew").html("("+x+")"))}};ee.app.platform.ws.messages.newblocks.clbks.newsharesLenta=function(e){t("sub"==o?e.cntsubscr:e.cntposts)},ee.app.platform.ws.messages["new block"].clbks.newsharesLenta=function(e){t("sub"==o?e.sharesSubscr:e.shares)},ee.app.platform.ws.messages.comment.clbks.lenta=function(e){if(f[e.posttxid]){var t=d.c.find("#"+e.posttxid+" .commentsAction .count span");t.html(Number(t.html()||"0")+1)}},ee.app.platform.clbks.api.actions.subscribe.lenta=function(e){d.c.find('.shareTable[address="'+e+'"]').addClass("subscribed")},ee.app.platform.clbks.api.actions.unsubscribe.lenta=function(e){d.c.find('.shareTable[address="'+e+'"]').removeClass("subscribed")}}(),Y(),e.clbk(null,e)}}};return ee.run=function(e){var t=ee.addEssense(n,a,e);ee.init(t,e)},ee.stop=function(){_.each(n,function(e){e.destroy()})},ee}();"undefined"!=typeof module?module.exports=lenta:(app.modules.lenta={},app.modules.lenta.module=lenta);