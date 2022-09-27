(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
  // shim for using process in browser
  var process = module.exports = {};
  
  // cached from whatever global is present so that test runners that stub it
  // don't break things.  But we need to wrap it in a try catch in case it is
  // wrapped in strict mode code which doesn't define any globals.  It's inside a
  // function because try/catches deoptimize in certain engines.
  
  var cachedSetTimeout;
  var cachedClearTimeout;
  
  function defaultSetTimout() {
      throw new Error('setTimeout has not been defined');
  }
  function defaultClearTimeout () {
      throw new Error('clearTimeout has not been defined');
  }
  (function () {
      try {
          if (typeof setTimeout === 'function') {
              cachedSetTimeout = setTimeout;
          } else {
              cachedSetTimeout = defaultSetTimout;
          }
      } catch (e) {
          cachedSetTimeout = defaultSetTimout;
      }
      try {
          if (typeof clearTimeout === 'function') {
              cachedClearTimeout = clearTimeout;
          } else {
              cachedClearTimeout = defaultClearTimeout;
          }
      } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
      }
  } ())
  function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
      }
      // if setTimeout wasn't available but was latter defined
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
      } catch(e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
              return cachedSetTimeout.call(null, fun, 0);
          } catch(e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
              return cachedSetTimeout.call(this, fun, 0);
          }
      }
  
  
  }
  function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
      }
      // if clearTimeout wasn't available but was latter defined
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
      } catch (e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
              return cachedClearTimeout.call(null, marker);
          } catch (e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
              // Some versions of I.E. have different rules for clearTimeout vs setTimeout
              return cachedClearTimeout.call(this, marker);
          }
      }
  
  
  
  }
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  
  function cleanUpNextTick() {
      if (!draining || !currentQueue) {
          return;
      }
      draining = false;
      if (currentQueue.length) {
          queue = currentQueue.concat(queue);
      } else {
          queueIndex = -1;
      }
      if (queue.length) {
          drainQueue();
      }
  }
  
  function drainQueue() {
      if (draining) {
          return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
  
      var len = queue.length;
      while(len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
              if (currentQueue) {
                  currentQueue[queueIndex].run();
              }
          }
          queueIndex = -1;
          len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
  }
  
  process.nextTick = function (fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
          }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
      }
  };
  
  // v8 likes predictible objects
  function Item(fun, array) {
      this.fun = fun;
      this.array = array;
  }
  Item.prototype.run = function () {
      this.fun.apply(null, this.array);
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = ''; // empty string to avoid regexp issues
  process.versions = {};
  
  function noop() {}
  
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.prependListener = noop;
  process.prependOnceListener = noop;
  
  process.listeners = function (name) { return [] }
  
  process.binding = function (name) {
      throw new Error('process.binding is not supported');
  };
  
  process.cwd = function () { return '/' };
  process.chdir = function (dir) {
      throw new Error('process.chdir is not supported');
  };
  process.umask = function() { return 0; };
  
  },{}],2:[function(require,module,exports){
  module.exports=[
    "2g1c",
    "acrotomophilia",
    "anal",
    "anilingus",
    "anus",
    "apeshit",
    "arsehole",
    "ass",
    "asshole",
    "assmunch",
    "autoerotic",
    "babeland",
    "bangbros",
    "bareback",
    "barenaked",
    "bastard",
    "bastardo",
    "bastinado",
    "bbw",
    "bdsm",
    "beaner",
    "beaners",
    "bestiality",
    "bimbos",
    "birdlock",
    "bitch",
    "bitches",
    "blowjob",
    "blumpkin",
    "bollocks",
    "bondage",
    "boner",
    "boob",
    "boobs",
    "bukkake",
    "bulldyke",
    "bullshit",
    "bunghole",
    "busty",
    "butt",
    "buttcheeks",
    "butthole",
    "camgirl",
    "camslut",
    "camwhore",
    "carpetmuncher",
    "circlejerk",
    "clit",
    "clitoris",
    "clusterfuck",
    "cock",
    "cocks",
    "coprolagnia",
    "coprophilia",
    "cornhole",
    "coon",
    "coons",
    "creampie",
    "cum",
    "cumming",
    "cunnilingus",
    "cunt",
    "darkie",
    "daterape",
    "deepthroat",
    "dendrophilia",
    "dick",
    "dildo",
    "dingleberry",
    "dingleberries",
    "doggiestyle",
    "doggystyle",
    "dolcett",
    "domination",
    "dominatrix",
    "dommes",
    "dvda",
    "ecchi",
    "ejaculation",
    "erotic",
    "erotism",
    "escort",
    "eunuch",
    "faggot",
    "fecal",
    "felch",
    "fellatio",
    "feltch",
    "femdom",
    "figging",
    "fingerbang",
    "fingering",
    "fisting",
    "footjob",
    "frotting",
    "fuck",
    "fuckin",
    "fucking",
    "fucktards",
    "fudgepacker",
    "futanari",
    "genitals",
    "goatcx",
    "goatse",
    "gokkun",
    "goodpoop",
    "goregasm",
    "grope",
    "g-spot",
    "guro",
    "handjob",
    "hardcore",
    "hentai",
    "homoerotic",
    "honkey",
    "hooker",
    "humping",
    "incest",
    "intercourse",
    "jailbait",
    "jigaboo",
    "jiggaboo",
    "jiggerboo",
    "jizz",
    "juggs",
    "kike",
    "kinbaku",
    "kinkster",
    "kinky",
    "knobbing",
    "lolita",
    "lovemaking",
    "masturbate",
    "milf",
    "motherfucker",
    "muffdiving",
    "nambla",
    "nawashi",
    "negro",
    "neonazi",
    "nigga",
    "nigger",
    "nimphomania",
    "nipple",
    "nipples",
    "nude",
    "nudity",
    "nympho",
    "nymphomania",
    "octopussy",
    "omorashi",
    "orgasm",
    "orgy",
    "paedophile",
    "paki",
    "panties",
    "panty",
    "pedobear",
    "pedophile",
    "pegging",
    "penis",
    "pissing",
    "pisspig",
    "playboy",
    "ponyplay",
    "poof",
    "poon",
    "poontang",
    "punany",
    "poopchute",
    "porn",
    "porno",
    "pornography",
    "pthc",
    "pubes",
    "pussy",
    "queaf",
    "queef",
    "quim",
    "raghead",
    "rape",
    "raping",
    "rapist",
    "rectum",
    "rimjob",
    "rimming",
    "sadism",
    "santorum",
    "scat",
    "schlong",
    "scissoring",
    "semen",
    "sex",
    "sexo",
    "sexy",
    "shemale",
    "shibari",
    "shit",
    "shitblimp",
    "shitty",
    "shota",
    "shrimping",
    "skeet",
    "slanteye",
    "slut",
    "s&m",
    "smut",
    "snatch",
    "snowballing",
    "sodomize",
    "sodomy",
    "spic",
    "splooge",
    "spooge",
    "spunk",
    "strapon",
    "strappado",
    "suck",
    "sucks",
    "swastika",
    "swinger",
    "threesome",
    "throating",
    "tit",
    "tits",
    "titties",
    "titty",
    "topless",
    "tosser",
    "towelhead",
    "tranny",
    "tribadism",
    "tubgirl",
    "tushy",
    "twat",
    "twink",
    "twinkie",
    "undressing",
    "upskirt",
    "urophilia",
    "vagina",
    "vibrator",
    "vorarephilia",
    "voyeur",
    "vulva",
    "wank",
    "wetback",
    "xx",
    "xxx",
    "yaoi",
    "yiffy",
    "zoophilia"
  ]
  
  },{}],3:[function(require,module,exports){
  module.exports=["!mb3c!l3","!mbec!l3","!mbéc!l3","!mbec!le","!mbéc!le","@brut!","@brut1","@bruti","@nd0u!ll3","@nd0u!lle","@nd0u1ll3","@nd0u1lle","@nd0uill3","@nd0uille","@ndou!ll3","@ndou!lle","@ndou1ll3","@ndou1lle","@ndouill3","@ndouille","@v0rt0n","@vorton","1mb3c1l3","1mbec1l3","1mbéc1l3","1mbec1le","1mbéc1le","35p!ng0!n","35p!ngo!n","35p1ng01n","35p1ngo1n","35ping0in","35pingoin","3mm@nch3","3mm@nche","3mm@nché","3mm3rd3r","3mm3rd3u53","3mm3rd3ur","3mm3rd3us3","3mmanch3","3mmanche","3mmanché","3mp@f3","3mp@fe","3mp@fé","3mp@p@0ut3","3mp@p@0ute","3mp@p@0uté","3mp@p@out3","3mp@p@oute","3mp@p@outé","3mpaf3","3mpafe","3mpafé","3mpapa0ut3","3mpapa0ute","3mpapa0uté","3mpapaout3","3mpapaoute","3mpapaouté","3ncul3","3ncul3r","3ncul3ur","3ncule","3nculé","3nf0!r3","3nf0!re","3nf0!ré","3nf01r3","3nf01re","3nf01ré","3nf0ir3","3nf0ire","3nf0iré","3nflur3","3nfo!r3","3nfo!re","3nfo!ré","3nfo1r3","3nfo1re","3nfo1ré","3nfoir3","3nfoire","3nfoiré","3nv@53l!n3ur","3nv@53l1n3ur","3nv@53lin3ur","3nv@s3l!n3ur","3nv@s3l1n3ur","3nv@s3lin3ur","3nva53l!n3ur","3nva53l1n3ur","3nva53lin3ur","3nvas3l!n3ur","3nvas3l1n3ur","3nvas3lin3ur","3p@!5","3p@!s","3p@15","3p@1s","3p@i5","3p@is","3pa!5","3pa!s","3pa15","3pa1s","3pai5","3pais","3sp!ng0!n","3sp!ngo!n","3sp1ng01n","3sp1ngo1n","3sping0in","3spingoin","3tr0n","3tron","5@g0u!n","5@g0u1n","5@g0uin","5@gou!n","5@gou1n","5@gouin","5@l@ud","5@l0p","5@l0p@rd","5@l0p3","5@l0pe","5@l3","5@le","5@lop","5@lop@rd","5@lop3","5@lope","5@tr0u!ll3","5@tr0u!lle","5@tr0u1ll3","5@tr0u1lle","5@tr0uill3","5@tr0uille","5@trou!ll3","5@trou!lle","5@trou1ll3","5@trou1lle","5@trouill3","5@trouille","50tt!53ux","50tt!5eux","50tt153ux","50tt15eux","50tti53ux","50tti5eux","50u5-m3rd3","50u5-merde","53nt-l@-p!553","53nt-l@-p1553","53nt-l@-pi553","53nt-la-p!553","53nt-la-p1553","53nt-la-pi553","5ag0u!n","5ag0u1n","5ag0uin","5agou!n","5agou1n","5agouin","5al0p","5al0p3","5al0pard","5al0pe","5al3","5alaud","5ale","5alop","5alop3","5alopard","5alope","5atr0u!ll3","5atr0u!lle","5atr0u1ll3","5atr0u1lle","5atr0uill3","5atr0uille","5atrou!ll3","5atrou!lle","5atrou1ll3","5atrou1lle","5atrouill3","5atrouille","5chb3b","5chbeb","5chl3u","5chleu","5chn0c","5chn0ck","5chn0qu3","5chn0que","5chnoc","5chnock","5chnoqu3","5chnoque","5ent-l@-p!55e","5ent-l@-p155e","5ent-l@-pi55e","5ent-la-p!55e","5ent-la-p155e","5ent-la-pi55e","5ott!53ux","5ott!5eux","5ott153ux","5ott15eux","5otti53ux","5otti5eux","5ou5-m3rd3","5ou5-merde","5t3@r!qu3","5t3@r1qu3","5t3@riqu3","5t3ar!qu3","5t3ar1qu3","5t3ariqu3","5té@r!qu3","5te@r!que","5té@r!que","5te@r1qu3","5té@r1qu3","5te@r1que","5té@r1que","5te@riqu3","5té@riqu3","5te@rique","5té@rique","5tear!qu3","5téar!qu3","5tear!que","5téar!que","5tear1qu3","5téar1qu3","5tear1que","5téar1que","5teariqu3","5téariqu3","5tearique","5téarique","abrut!","abrut1","abruti","and0u!ll3","and0u!lle","and0u1ll3","and0u1lle","and0uill3","and0uille","andou!ll3","andou!lle","andou1ll3","andou1lle","andouill3","andouille","av0rt0n","avorton","b!@tch","b!atch","b!c0t","b!cot","b!t3","b!t3mb0!5","b!t3mb0!s","b!t3mbo!5","b!t3mbo!s","b!te","b!temb0!5","b!temb0!s","b!tembo!5","b!tembo!s","b@t@rd","b0rd3l","b0rdel","b0uff0n","b0ugn0ul","B0ugn0ul!3","b0ugn0ul!5@t!0n","b0ugn0ul!53r","b0ugn0ul!5at!0n","b0ugn0ul!5er","B0ugn0ul!e","b0ugn0ul!s@t!0n","b0ugn0ul!s3r","b0ugn0ul!sat!0n","b0ugn0ul!ser","B0ugn0ul13","b0ugn0ul15@t10n","b0ugn0ul153r","b0ugn0ul15at10n","b0ugn0ul15er","B0ugn0ul1e","b0ugn0ul1s@t10n","b0ugn0ul1s3r","b0ugn0ul1sat10n","b0ugn0ul1ser","b0ugn0ul3","b0ugn0ule","B0ugn0uli3","b0ugn0uli5@ti0n","b0ugn0uli53r","b0ugn0uli5ati0n","b0ugn0uli5er","B0ugn0ulie","b0ugn0ulis@ti0n","b0ugn0ulis3r","b0ugn0ulisati0n","b0ugn0uliser","b0ugr3","b0ugre","b0uk@k","b0ukak","b0un!0ul","b0un10ul","b0uni0ul","b0urd!ll3","b0urd!lle","b0urd1ll3","b0urd1lle","b0urdill3","b0urdille","b0us3ux","b0useux","b1@tch","b1atch","b1c0t","b1cot","b1t3","b1t3mb015","b1t3mb01s","b1t3mbo15","b1t3mbo1s","b1te","b1temb015","b1temb01s","b1tembo15","b1tembo1s","b3@uf","b3auf","bât@rd","batard","bâtard","be@uf","beauf","bi@tch","biatch","bic0t","bicot","bit3","bit3mb0i5","bit3mb0is","bit3mboi5","bit3mbois","bite","bitemb0i5","bitemb0is","bitemboi5","bitembois","bord3l","bordel","bouffon","bougnoul","Bougnoul!3","bougnoul!5@t!on","bougnoul!53r","bougnoul!5at!on","bougnoul!5er","Bougnoul!e","bougnoul!s@t!on","bougnoul!s3r","bougnoul!sat!on","bougnoul!ser","Bougnoul13","bougnoul15@t1on","bougnoul153r","bougnoul15at1on","bougnoul15er","Bougnoul1e","bougnoul1s@t1on","bougnoul1s3r","bougnoul1sat1on","bougnoul1ser","bougnoul3","bougnoule","Bougnouli3","bougnouli5@tion","bougnouli53r","bougnouli5ation","bougnouli5er","Bougnoulie","bougnoulis@tion","bougnoulis3r","bougnoulisation","bougnouliser","bougr3","bougre","bouk@k","boukak","boun!oul","boun1oul","bounioul","bourd!ll3","bourd!lle","bourd1ll3","bourd1lle","bourdill3","bourdille","bous3ux","bouseux","br!53-burn35","br!5e-burne5","br!s3-burn3s","br!se-burnes","br@nl3r","br@nl3ur","br@nler","br@nleur","br@nqu3","br@nque","br153-burn35","br15e-burne5","br1s3-burn3s","br1se-burnes","branl3r","branl3ur","branler","branleur","branqu3","branque","bri53-burn35","bri5e-burne5","bris3-burn3s","brise-burnes","c@553-b0nb0n","c@553-bonbon","c@553-c0u!ll3","c@553-c0u!ll35","c@553-c0u1ll3","c@553-c0u1ll35","c@553-c0uill3","c@553-c0uill35","c@553-cou!ll3","c@553-cou!ll35","c@553-cou1ll3","c@553-cou1ll35","c@553-couill3","c@553-couill35","c@55e-b0nb0n","c@55e-bonbon","c@55e-c0u!lle","c@55e-c0u!lle5","c@55e-c0u1lle","c@55e-c0u1lle5","c@55e-c0uille","c@55e-c0uille5","c@55e-cou!lle","c@55e-cou!lle5","c@55e-cou1lle","c@55e-cou1lle5","c@55e-couille","c@55e-couille5","c@c0u","c@cou","c@fr3","c@fre","c@ld0ch3","c@ld0che","c@ldoch3","c@ldoche","c@ss3-b0nb0n","c@ss3-bonbon","c@ss3-c0u!ll3","c@ss3-c0u!ll3s","c@ss3-c0u1ll3","c@ss3-c0u1ll3s","c@ss3-c0uill3","c@ss3-c0uill3s","c@ss3-cou!ll3","c@ss3-cou!ll3s","c@ss3-cou1ll3","c@ss3-cou1ll3s","c@ss3-couill3","c@ss3-couill3s","c@sse-b0nb0n","c@sse-bonbon","c@sse-c0u!lle","c@sse-c0u!lles","c@sse-c0u1lle","c@sse-c0u1lles","c@sse-c0uille","c@sse-c0uilles","c@sse-cou!lle","c@sse-cou!lles","c@sse-cou1lle","c@sse-cou1lles","c@sse-couille","c@sse-couilles","c0ch3","c0che","c0n","c0n@553","c0n@55e","c0n@rd","c0n@ss3","c0n@sse","c0n5","c0na553","c0na55e","c0nard","c0nass3","c0nasse","c0nch!3r","c0nch!er","c0nch13r","c0nch1er","c0nchi3r","c0nchier","c0nn@553","c0nn@55e","c0nn@rd","c0nn@rd3","c0nn@rde","c0nn@ss3","c0nn@sse","c0nn3","c0nna553","c0nna55e","c0nnard","c0nnard3","c0nnarde","c0nnass3","c0nnasse","c0nne","c0ns","c0u1ll0n","c0u1ll0nn3r","c0u1ll3","c0u1ll3s","c0uill0n","c0uill0nn3r","c0uill0nner","c0uill3","c0uill3s","c0uille","c0uilles","c0un!fl3","c0un!fle","c0un1fl3","c0un1fle","c0unifl3","c0unifle","c0urt@ud","c0urtaud","ca553-b0nb0n","ca553-bonbon","ca553-c0u!ll3","ca553-c0u!ll35","ca553-c0u1ll3","ca553-c0u1ll35","ca553-c0uill3","ca553-c0uill35","ca553-cou!ll3","ca553-cou!ll35","ca553-cou1ll3","ca553-cou1ll35","ca553-couill3","ca553-couill35","ca55e-b0nb0n","ca55e-bonbon","ca55e-c0u!lle","ca55e-c0u!lle5","ca55e-c0u1lle","ca55e-c0u1lle5","ca55e-c0uille","ca55e-c0uille5","ca55e-cou!lle","ca55e-cou!lle5","ca55e-cou1lle","ca55e-cou1lle5","ca55e-couille","ca55e-couille5","cac0u","cacou","cafr3","cafre","cald0ch3","cald0che","caldoch3","caldoche","cass3-b0nb0n","cass3-bonbon","cass3-c0u!ll3","cass3-c0u!ll3s","cass3-c0u1ll3","cass3-c0u1ll3s","cass3-c0uill3","cass3-c0uill3s","cass3-cou!ll3","cass3-cou!ll3s","cass3-cou1ll3","cass3-cou1ll3s","cass3-couill3","cass3-couill3s","casse-b0nb0n","casse-bonbon","casse-c0u!lle","casse-c0u!lles","casse-c0u1lle","casse-c0u1lles","casse-c0uille","casse-c0uilles","casse-cou!lle","casse-cou!lles","casse-cou1lle","casse-cou1lles","casse-couille","casse-couilles","ch!3nn@553","ch!3nn@ss3","ch!3nna553","ch!3nnass3","ch!3r","ch!enn@55e","ch!enn@sse","ch!enna55e","ch!ennasse","ch!er","ch!n3t0c","ch!n3t0qu3","ch!n3toc","ch!n3toqu3","ch!net0c","ch!net0que","ch!netoc","ch!netoque","ch!nt0k","ch!ntok","ch@ch@r","ch@g@553","ch@g@55e","ch@g@ss3","ch@g@sse","ch@uff@rd","ch13nn@553","ch13nn@ss3","ch13nna553","ch13nnass3","ch13r","ch13ur","ch13urs","ch1enn@55e","ch1enn@sse","ch1enna55e","ch1ennasse","ch1er","ch1eur","ch1eurs","ch1n3t0c","ch1n3t0qu3","ch1n3toc","ch1n3toqu3","ch1net0c","ch1net0que","ch1netoc","ch1netoque","ch1nt0k","ch1ntok","chachar","chaga553","chaga55e","chagass3","chagasse","chauffard","chi3nn@553","chi3nn@ss3","chi3nna553","chi3nnass3","chi3r","chi3ur","chi3urs","chienn@55e","chienn@sse","chienna55e","chiennasse","chier","chieur","chieurs","chin3t0c","chin3t0qu3","chin3toc","chin3toqu3","chinet0c","chinet0que","chinetoc","chinetoque","chint0k","chintok","chl3uh","chleuh","chn0qu3","chn0que","chnoqu3","chnoque","coch3","coche","con","con@553","con@55e","con@rd","con@ss3","con@sse","con5","cona553","cona55e","conard","conass3","conasse","conch!3r","conch!er","conch13r","conch1er","conchi3r","conchier","conn@553","conn@55e","conn@rd","conn@rd3","conn@rde","conn@ss3","conn@sse","conn3","conna553","conna55e","connard","connard3","connarde","connass3","connasse","conne","cons","cou1lle","cou1lles","cou1llon","cou1llonner","couill3","couill3s","couille","couilles","couillon","couillonn3r","couillonner","coun!fl3","coun!fle","coun1fl3","coun1fle","counifl3","counifle","court@ud","courtaud","cr!cr!","cr0tt3","cr0tte","cr0tté","cr0u!ll@t","cr0u!ll3","cr0u!llat","cr0u!lle","cr0u1ll@t","cr0u1ll3","cr0u1llat","cr0u1lle","cr0uill@t","cr0uill3","cr0uillat","cr0uille","cr0ût0n","cr1cr1","cr3t!n","cr3t1n","cr3tin","cr3v@rd","cr3vard","cr3vur3","cret!n","crét!n","cret1n","crét1n","cretin","crétin","crev@rd","crevard","crevure","cricri","crott3","crotte","crotté","crou!ll@t","crou!ll3","crou!llat","crou!lle","crou1ll@t","crou1ll3","crou1llat","crou1lle","crouill@t","crouill3","crouillat","crouille","croûton","cul","d3b!l3","d3b1l3","d3bil3","d3gu3l@ss3","d3gu3lass3","d3m3rd3r","deb!l3","déb!l3","deb!le","déb!le","deb1l3","déb1l3","deb1le","déb1le","debil3","débil3","debile","débile","déguel@sse","deguelasse","déguelasse","demerder","démerder","dr0u!ll3","dr0u!lle","dr0u1ll3","dr0u1lle","dr0uill3","dr0uille","drou!ll3","drou!lle","drou1ll3","drou1lle","drouill3","drouille","du schn0c","du schnoc","du5chn0ck","du5chnock","duc0n","duc0nn0t","ducon","duconnot","dug3n0ux","dug3noux","dugen0ux","dugenoux","dugl@nd","dugland","duschn0ck","duschnock","e5p!ng0!n","e5p!ngo!n","e5p1ng01n","e5p1ngo1n","e5ping0in","e5pingoin","emm@nche","emm@nché","emmanche","emmanché","emmerder","emmerdeu5e","emmerdeur","emmerdeuse","emp@fe","emp@fé","emp@p@0ute","emp@p@0uté","emp@p@oute","emp@p@outé","empafe","empafé","empapa0ute","empapa0uté","empapaoute","empapaouté","encule","enculé","enculer","enculeur","enf0!re","enf0!ré","enf01re","enf01ré","enf0ire","enf0iré","enflure","enfo!re","enfo!ré","enfo1re","enfo1ré","enfoire","enfoiré","env@5el!neur","env@5el1neur","env@5elineur","env@sel!neur","env@sel1neur","env@selineur","enva5el!neur","enva5el1neur","enva5elineur","envasel!neur","envasel1neur","envaselineur","ep@!5","ép@!5","ep@!s","ép@!s","ep@15","ép@15","ep@1s","ép@1s","ep@i5","ép@i5","ep@is","ép@is","epa!5","épa!5","epa!s","épa!s","epa15","épa15","epa1s","épa1s","epai5","épai5","epais","épais","esp!ng0!n","esp!ngo!n","esp1ng01n","esp1ngo1n","esping0in","espingoin","etr0n","étr0n","etron","étron","f!0tt3","f!0tte","f!ott3","f!otte","f0ut3ur","f0uteur","f0utr3","f0utre","f10tt3","f10tte","f1ott3","f1otte","f31gn@ss3","f3ign@ss3","f3ignass3","FDP","fe1gnasse","feign@sse","feignasse","fi0tt3","fi0tte","fiott3","fiotte","fout3ur","fouteur","foutr3","foutre","fr!tz","fr1tz","fritz","fum!3r","fum!er","fum13r","fum1er","fumi3r","fumier","g@rc3","g@rce","g@up3","g@upe","G0d0n","g0g0l","g0ï","g0u!ll@nd","g0u!lland","g0u!n3","g0u!ne","g0u1ll@nd","g0u1lland","g0u1n3","g0u1ne","g0uill@nd","g0uilland","g0uin3","g0uine","g0urd3","g0urde","g0urg@nd!n3","g0urg@nd!ne","g0urg@nd1n3","g0urg@nd1ne","g0urg@ndin3","g0urg@ndine","g0urgand!n3","g0urgand!ne","g0urgand1n3","g0urgand1ne","g0urgandin3","g0urgandine","garc3","garce","gaup3","gaupe","GDM","gl@nd","gl@nd0u!ll0u","gl@nd0u1ll0u","gl@nd0uill0u","gl@nd3u53","gl@nd3ur","gl@nd3us3","gl@ndeu5e","gl@ndeur","gl@ndeuse","gl@ndou!llou","gl@ndou1llou","gl@ndouillou","gl@ndu","gland","gland0u!ll0u","gland0u1ll0u","gland0uill0u","gland3u53","gland3ur","gland3us3","glandeu5e","glandeur","glandeuse","glandou!llou","glandou1llou","glandouillou","glandu","gn0ul","gn0ul3","gn0ule","gnoul","gnoul3","gnoule","Godon","gogol","goï","gou!ll@nd","gou!lland","gou!n3","gou!ne","gou1ll@nd","gou1lland","gou1n3","gou1ne","gouill@nd","gouilland","gouin3","gouine","gourd3","gourde","gourg@nd!n3","gourg@nd!ne","gourg@nd1n3","gourg@nd1ne","gourg@ndin3","gourg@ndine","gourgand!n3","gourgand!ne","gourgand1n3","gourgand1ne","gourgandin3","gourgandine","gr0gn@553","gr0gn@55e","gr0gn@ss3","gr0gn@sse","gr0gna553","gr0gna55e","gr0gnass3","gr0gnasse","grogn@553","grogn@55e","grogn@ss3","grogn@sse","grogna553","grogna55e","grognass3","grognasse","gu!nd0ul3","gu!nd0ule","gu!ndoul3","gu!ndoule","gu1nd0ul3","gu1nd0ule","gu1ndoul3","gu1ndoule","gu3n!ch3","gu3n1ch3","gu3nich3","guen!che","guen1che","gueniche","guind0ul3","guind0ule","guindoul3","guindoule","imb3cil3","imbecil3","imbécil3","imbecile","imbécile","j3@n-f0utr3","j3@n-foutr3","j3an-f0utr3","j3an-foutr3","je@n-f0utre","je@n-foutre","jean-f0utre","jean-foutre","k!k00","k!k0u","k!koo","k!kou","k1k00","k1k0u","k1koo","k1kou","kik00","kik0u","kikoo","kikou","Kr@ut","Kraut","l@ch3ux","l@cheux","l@v3tt3","l@vette","l0p3tt3","l0pette","lach3ux","lâch3ux","lacheux","lâcheux","lav3tt3","lavette","lop3tt3","lopette","m!53r@bl3","m!53rabl3","m!5ér@bl3","m!5er@ble","m!5ér@ble","m!5erabl3","m!5érabl3","m!5erable","m!5érable","m!cht0","m!chto","m!n@bl3","m!n@ble","m!nabl3","m!nable","m!nu5","m!nus","m!s3r@bl3","m!s3rabl3","m!ser@bl3","m!sér@bl3","m!ser@ble","m!sér@ble","m!serabl3","m!sérabl3","m!serable","m!sérable","m@g0t","m@got","m@k0um3","m@k0ume","m@k0umé","m@koum3","m@koume","m@koumé","m@nch3","m@nche","m@ng3-m3rd3","m@nge-merde","m@rch@nd0t","m@rch@ndot","m@rg0u!ll!5t3","m@rg0u!ll!5te","m@rg0u!ll!st3","m@rg0u!ll!ste","m@rg0u1ll15t3","m@rg0u1ll15te","m@rg0u1ll1st3","m@rg0u1ll1ste","m@rg0uilli5t3","m@rg0uilli5te","m@rg0uillist3","m@rg0uilliste","m@rgou!ll!5t3","m@rgou!ll!5te","m@rgou!ll!st3","m@rgou!ll!ste","m@rgou1ll15t3","m@rgou1ll15te","m@rgou1ll1st3","m@rgou1ll1ste","m@rgouilli5t3","m@rgouilli5te","m@rgouillist3","m@rgouilliste","m@uv!3tt3","m@uv!ette","m@uv13tt3","m@uv1ette","m@uvi3tt3","m@uviette","m0!n@!ll3","m0!n@!lle","m0!n5-qu3-r!3n","m0!n5-que-r!en","m0!na!ll3","m0!na!lle","m0!ns-qu3-r!3n","m0!ns-que-r!en","m01n@1ll3","m01n@1lle","m01n5-qu3-r13n","m01n5-que-r1en","m01na1ll3","m01na1lle","m01ns-qu3-r13n","m01ns-que-r1en","m0in@ill3","m0in@ille","m0in5-qu3-ri3n","m0in5-que-rien","m0inaill3","m0inaille","m0ins-qu3-ri3n","m0ins-que-rien","m0n@c@!ll3","m0n@c@!lle","m0n@c@1ll3","m0n@c@1lle","m0n@c@ill3","m0n@c@ille","m0naca!ll3","m0naca!lle","m0naca1ll3","m0naca1lle","m0nacaill3","m0nacaille","m0r!c@ud","m0r!caud","m0r1c@ud","m0r1caud","m0ric@ud","m0ricaud","m153r@bl3","m153rabl3","m15er@bl3","m15ér@bl3","m15er@ble","m15ér@ble","m15erabl3","m15érabl3","m15erable","m15érable","m1cht0","m1chto","m1n@bl3","m1n@ble","m1nabl3","m1nable","m1nu5","m1nus","m1s3r@bl3","m1s3rabl3","m1ser@bl3","m1sér@bl3","m1ser@ble","m1sér@ble","m1serabl3","m1sérabl3","m1serable","m1sérable","m3rd@!ll0n","m3rd@!ll3","m3rd@!llon","m3rd@1ll0n","m3rd@1ll3","m3rd@1llon","m3rd@ill0n","m3rd@ill3","m3rd@illon","m3rd0u!ll@rd","m3rd0u!llard","m3rd0u1ll@rd","m3rd0u1llard","m3rd0uill@rd","m3rd0uillard","m3rd3","m3rd3ux","m3rda!ll0n","m3rda!ll3","m3rda!llon","m3rda1ll0n","m3rda1ll3","m3rda1llon","m3rdaill0n","m3rdaill3","m3rdaillon","m3rdou!ll@rd","m3rdou!llard","m3rdou1ll@rd","m3rdou1llard","m3rdouill@rd","m3rdouillard","mag0t","magot","mak0um3","mak0ume","mak0umé","makoum3","makoume","makoumé","manch3","manche","mang3-m3rd3","mange-merde","marchand0t","marchandot","marg0u!ll!5t3","marg0u!ll!5te","marg0u!ll!st3","marg0u!ll!ste","marg0u1ll15t3","marg0u1ll15te","marg0u1ll1st3","marg0u1ll1ste","marg0uilli5t3","marg0uilli5te","marg0uillist3","marg0uilliste","margou!ll!5t3","margou!ll!5te","margou!ll!st3","margou!ll!ste","margou1ll15t3","margou1ll15te","margou1ll1st3","margou1ll1ste","margouilli5t3","margouilli5te","margouillist3","margouilliste","mauv!3tt3","mauv!ette","mauv13tt3","mauv1ette","mauvi3tt3","mauviette","merd@!ll0n","merd@!lle","merd@!llon","merd@1ll0n","merd@1lle","merd@1llon","merd@ill0n","merd@ille","merd@illon","merd0u!ll@rd","merd0u!llard","merd0u1ll@rd","merd0u1llard","merd0uill@rd","merd0uillard","merda!ll0n","merda!lle","merda!llon","merda1ll0n","merda1lle","merda1llon","merdaill0n","merdaille","merdaillon","merde","merdeux","merdou!ll@rd","merdou!llard","merdou1ll@rd","merdou1llard","merdouill@rd","merdouillard","mi53r@bl3","mi53rabl3","mi5er@bl3","mi5ér@bl3","mi5er@ble","mi5ér@ble","mi5erabl3","mi5érabl3","mi5erable","mi5érable","micht0","michto","min@bl3","min@ble","minabl3","minable","minu5","minus","mis3r@bl3","mis3rabl3","miser@bl3","misér@bl3","miser@ble","misér@ble","miserabl3","misérabl3","miserable","misérable","mo!n@!ll3","mo!n@!lle","mo!n5-qu3-r!3n","mo!n5-que-r!en","mo!na!ll3","mo!na!lle","mo!ns-qu3-r!3n","mo!ns-que-r!en","mo1n@1ll3","mo1n@1lle","mo1n5-qu3-r13n","mo1n5-que-r1en","mo1na1ll3","mo1na1lle","mo1ns-qu3-r13n","mo1ns-que-r1en","moin@ill3","moin@ille","moin5-qu3-ri3n","moin5-que-rien","moinaill3","moinaille","moins-qu3-ri3n","moins-que-rien","mon@c@!ll3","mon@c@!lle","mon@c@1ll3","mon@c@1lle","mon@c@ill3","mon@c@ille","monaca!ll3","monaca!lle","monaca1ll3","monaca1lle","monacaill3","monacaille","mor!c@ud","mor!caud","mor1c@ud","mor1caud","moric@ud","moricaud","n!@!53ux","n!@!5eux","n!@!s3ux","n!@!seux","n!@c","n!@k0u3","n!@k0ue","n!@k0ué","n!@kou3","n!@koue","n!@koué","n!a!53ux","n!a!5eux","n!a!s3ux","n!a!seux","n!ac","n!ak0u3","n!ak0ue","n!ak0ué","n!akou3","n!akoue","n!akoué","n!qu3","n!qu3r","n!que","n!quer","n@s3","n@se","n@z3","n@ze","n1@153ux","n1@15eux","n1@1s3ux","n1@1seux","n1@c","n1@k0u3","n1@k0ue","n1@k0ué","n1@kou3","n1@koue","n1@koué","n1a153ux","n1a15eux","n1a1s3ux","n1a1seux","n1ac","n1ak0u3","n1ak0ue","n1ak0ué","n1akou3","n1akoue","n1akoué","n1qu3","n1qu3r","n1que","n1quer","n3gr0","n3gro","nas3","nase","naz3","naze","negr0","négr0","negro","négro","ni@c","ni@i53ux","ni@i5eux","ni@is3ux","ni@iseux","ni@k0u3","ni@k0ue","ni@k0ué","ni@kou3","ni@koue","ni@koué","niac","niai53ux","niai5eux","niais3ux","niaiseux","niak0u3","niak0ue","niak0ué","niakou3","niakoue","niakoué","niqu3","niqu3r","nique","niquer","NTM","p!550u","p!55ou","p!gn0uf","p!gnouf","p!ss0u","p!ssou","p@k05","p@k0s","p@ko5","p@kos","p@n0ufl3","p@n0ufle","p@noufl3","p@noufle","p@t@r!n","p@t@r1n","p@t@rin","p0rc@5","p0rc@553","p0rc@55e","p0rc@s","p0rc@ss3","p0rc@sse","p0rca5","p0rca553","p0rca55e","p0rcas","p0rcass3","p0rcasse","p0uc@v","p0ucav","p0uf","p0uf!@553","p0uf!@55e","p0uf!@ss3","p0uf!@sse","p0uf!a553","p0uf!a55e","p0uf!ass3","p0uf!asse","p0uf1@553","p0uf1@55e","p0uf1@ss3","p0uf1@sse","p0uf1a553","p0uf1a55e","p0uf1ass3","p0uf1asse","p0uff!@553","p0uff!@55e","p0uff!@ss3","p0uff!@sse","p0uff!a553","p0uff!a55e","p0uff!ass3","p0uff!asse","p0uff1@553","p0uff1@55e","p0uff1@ss3","p0uff1@sse","p0uff1a553","p0uff1a55e","p0uff1ass3","p0uff1asse","p0uffi@553","p0uffi@55e","p0uffi@ss3","p0uffi@sse","p0uffia553","p0uffia55e","p0uffiass3","p0uffiasse","p0ufi@553","p0ufi@55e","p0ufi@ss3","p0ufi@sse","p0ufia553","p0ufia55e","p0ufiass3","p0ufiasse","p0und3","p0unde","p0undé","p0urr!tur3","p0urr!ture","p0urr1tur3","p0urr1ture","p0urritur3","p0urriture","p1550u","p155ou","p1gn0uf","p1gnouf","p1mbêch3","p1mbêche","p1ss0u","p1ss3ux","p1sseux","p1ssou","p3cqu3","p3d@l3","p3d0qu3","p3d3","p3dal3","p3doqu3","p3qu3n@ud","p3qu3naud","p3t","p3t@553","p3t@ss3","p3t3ux","p3ta553","p3tass3","pak05","pak0s","pako5","pakos","pan0ufl3","pan0ufle","panoufl3","panoufle","patar!n","patar1n","patarin","PD","pecque","ped@l3","péd@l3","ped@le","péd@le","ped0qu3","péd0qu3","ped0que","péd0que","pedal3","pédal3","pedale","pédale","pede","pédé","pedoqu3","pédoqu3","pedoque","pédoque","pequ3n@ud","péqu3n@ud","pequ3naud","péqu3naud","pequen@ud","péquen@ud","pequenaud","péquenaud","pet","pét@553","pet@55e","pét@55e","pet@ss3","pét@ss3","pet@sse","pét@sse","peta553","péta553","peta55e","péta55e","petass3","pétass3","petasse","pétasse","peteux","péteux","pi550u","pi55ou","pign0uf","pignouf","pimbêch3","pimbêche","piss0u","piss3ux","pisseux","pissou","pl0uc","pl3utr3","pleutre","plouc","porc@5","porc@553","porc@55e","porc@s","porc@ss3","porc@sse","porca5","porca553","porca55e","porcas","porcass3","porcasse","pouc@v","poucav","pouf","pouf!@553","pouf!@55e","pouf!@ss3","pouf!@sse","pouf!a553","pouf!a55e","pouf!ass3","pouf!asse","pouf1@553","pouf1@55e","pouf1@ss3","pouf1@sse","pouf1a553","pouf1a55e","pouf1ass3","pouf1asse","pouff!@553","pouff!@55e","pouff!@ss3","pouff!@sse","pouff!a553","pouff!a55e","pouff!ass3","pouff!asse","pouff1@553","pouff1@55e","pouff1@ss3","pouff1@sse","pouff1a553","pouff1a55e","pouff1ass3","pouff1asse","pouffi@553","pouffi@55e","pouffi@ss3","pouffi@sse","pouffia553","pouffia55e","pouffiass3","pouffiasse","poufi@553","poufi@55e","poufi@ss3","poufi@sse","poufia553","poufia55e","poufiass3","poufiasse","pound3","pounde","poundé","pourr!tur3","pourr!ture","pourr1tur3","pourr1ture","pourritur3","pourriture","pun@!53","pun@!5e","pun@!s3","pun@!se","pun@153","pun@15e","pun@1s3","pun@1se","pun@i53","pun@i5e","pun@is3","pun@ise","puna!53","puna!5e","puna!s3","puna!se","puna153","puna15e","puna1s3","puna1se","punai53","punai5e","punais3","punaise","put!n","put@!n","put@1n","put@in","put1n","put3","puta!n","puta1n","putain","pute","putin","qu3ut@rd","qu3utard","queut@rd","queutard","r!p0p33","r!p0pe3","r!p0pé3","r!p0pee","r!p0pée","r!pop33","r!pope3","r!popé3","r!popee","r!popée","r@clur3","r@clure","r@t0n","r@ton","r05b!f","r05b1f","r05bif","r0b35p!3rr0t","r0b35p13rr0t","r0b35pi3rr0t","r0b3sp!3rr0t","r0b3sp13rr0t","r0b3spi3rr0t","r0be5p!err0t","r0be5p1err0t","r0be5pierr0t","r0besp!err0t","r0besp1err0t","r0bespierr0t","r0sb!f","r0sb1f","r0sbif","r0ulur3","r0ulure","r1p0p33","r1p0pe3","r1p0pé3","r1p0pee","r1p0pée","r1pop33","r1pope3","r1popé3","r1popee","r1popée","raclur3","raclure","rat0n","raton","rip0p33","rip0pe3","rip0pé3","rip0pee","rip0pée","ripop33","ripope3","ripopé3","ripopee","ripopée","ro5b!f","ro5b1f","ro5bif","rob35p!3rrot","rob35p13rrot","rob35pi3rrot","rob3sp!3rrot","rob3sp13rrot","rob3spi3rrot","robe5p!errot","robe5p1errot","robe5pierrot","robesp!errot","robesp1errot","robespierrot","rosb!f","rosb1f","rosbif","roulur3","roulure","s@g0u!n","s@g0u1n","s@g0uin","s@gou!n","s@gou1n","s@gouin","s@l@ud","s@l0p","s@l0p@rd","s@l0p3","s@l0p3r13","s@l0p3ri3","s@l0pe","s@l3","s@le","s@lop","s@lop@rd","s@lop3","s@lop3ri3","s@lope","s@loperie","s@tr0u!ll3","s@tr0u!lle","s@tr0u1ll3","s@tr0u1lle","s@tr0uill3","s@tr0uille","s@trou!ll3","s@trou!lle","s@trou1ll3","s@trou1lle","s@trouill3","s@trouille","s0tt!s3ux","s0tt!seux","s0tt1s3ux","s0tt1seux","s0ttis3ux","s0ttiseux","s0us-m3rd3","s0us-merde","s3nt-l@-p!ss3","s3nt-l@-p1ss3","s3nt-l@-piss3","s3nt-la-p!ss3","s3nt-la-p1ss3","s3nt-la-piss3","sag0u!n","sag0u1n","sag0uin","sagou!n","sagou1n","sagouin","sal0p","sal0p3","sal0pard","sal0pe","sal0perie","sal3","salaud","sale","salop","salop3","salop3ri3","salopard","salope","saloper1e","saloperie","satr0u!ll3","satr0u!lle","satr0u1ll3","satr0u1lle","satr0uill3","satr0uille","satrou!ll3","satrou!lle","satrou1ll3","satrou1lle","satrouill3","satrouille","schb3b","schbeb","schl3u","schleu","schn0c","schn0ck","schn0qu3","schn0que","schnoc","schnock","schnoqu3","schnoque","sent-l@-p!sse","sent-l@-p1sse","sent-l@-pisse","sent-la-p!sse","sent-la-p1sse","sent-la-pisse","sott!s3ux","sott!seux","sott1s3ux","sott1seux","sottis3ux","sottiseux","sous-m3rd3","sous-merde","st3@r!qu3","st3@r1qu3","st3@riqu3","st3ar!qu3","st3ar1qu3","st3ariqu3","ste@r!qu3","sté@r!qu3","ste@r!que","sté@r!que","ste@r1qu3","sté@r1qu3","ste@r1que","sté@r1que","ste@riqu3","sté@riqu3","ste@rique","sté@rique","stear!qu3","stéar!qu3","stear!que","stéar!que","stear1qu3","stéar1qu3","stear1que","stéar1que","steariqu3","stéariqu3","stearique","stéarique","t@f!0l3","t@f!0le","t@f!ol3","t@f!ole","t@f10l3","t@f10le","t@f1ol3","t@f1ole","t@fi0l3","t@fi0le","t@fiol3","t@fiole","t@nt0u53r!3","t@nt0u53r13","t@nt0u53ri3","t@nt0u5er!e","t@nt0u5er1e","t@nt0u5erie","t@nt0us3r!3","t@nt0us3r13","t@nt0us3ri3","t@nt0user!e","t@nt0user1e","t@nt0userie","t@nt0uz3","t@nt0uze","t@ntou53r!3","t@ntou53r13","t@ntou53ri3","t@ntou5er!e","t@ntou5er1e","t@ntou5erie","t@ntous3r!3","t@ntous3r13","t@ntous3ri3","t@ntouser!e","t@ntouser1e","t@ntouserie","t@ntouz3","t@ntouze","t@p3tt3","t@pette","t@rl0uz3","t@rl0uze","t@rlouz3","t@rlouze","t0c@rd","t0card","t3b3","t3be","t3bé","t3t3ux","t3ub3","t3ube","t3ubé","taf!0l3","taf!0le","taf!ol3","taf!ole","taf10l3","taf10le","taf1ol3","taf1ole","tafi0l3","tafi0le","tafiol3","tafiole","tant0u53r!3","tant0u53r13","tant0u53ri3","tant0u5er!e","tant0u5er1e","tant0u5erie","tant0us3r!3","tant0us3r13","tant0us3ri3","tant0user!e","tant0user1e","tant0userie","tant0uz3","tant0uze","tantou53r!3","tantou53r13","tantou53ri3","tantou5er!e","tantou5er1e","tantou5erie","tantous3r!3","tantous3r13","tantous3ri3","tantouser!e","tantouser1e","tantouserie","tantouz3","tantouze","tap3tt3","tapette","tarl0uz3","tarl0uze","tarlouz3","tarlouze","tebe","tebé","tet3ux","tét3ux","teteux","téteux","teube","teubé","toc@rd","tocard","tr@!n33","tr@!nee","tr@1n33","tr@1nee","tr@in33","tr@în33","tr@îne3","tr@îné3","tr@inee","tr@înee","tr@înée","tr0uduc","tra!n33","tra!nee","tra1n33","tra1nee","train33","traîn33","traîne3","traîné3","trainee","traînee","traînée","trouduc","tru!@553","tru!@55e","tru!@ss3","tru!@sse","tru!a553","tru!a55e","tru!ass3","tru!asse","tru1@553","tru1@55e","tru1@ss3","tru1@sse","tru1a553","tru1a55e","tru1ass3","tru1asse","trui@553","trui@55e","trui@ss3","trui@sse","truia553","truia55e","truiass3","truiasse","v!3d@53","v!3d@s3","v!3da53","v!3das3","v!3r","v!d3-c0u!ll35","v!d3-c0u!ll3s","v!d3-cou!ll35","v!d3-cou!ll3s","v!de-c0u!lle5","v!de-c0u!lles","v!de-cou!lle5","v!de-cou!lles","v!éd@53","v!ed@5e","v!éd@5e","v!ed@s3","v!éd@s3","v!ed@se","v!éd@se","v!eda53","v!éda53","v!eda5e","v!éda5e","v!edas3","v!édas3","v!edase","v!édase","v!er","v@ur!3n","v@ur!en","v@ur13n","v@ur1en","v@uri3n","v@urien","v13d@53","v13d@s3","v13da53","v13das3","v13r","v1d3-c0u1ll35","v1d3-c0u1ll3s","v1d3-cou1ll35","v1d3-cou1ll3s","v1de-c0u1lle5","v1de-c0u1lles","v1de-cou1lle5","v1de-cou1lles","v1ed@53","v1éd@53","v1ed@5e","v1éd@5e","v1ed@s3","v1éd@s3","v1ed@se","v1éd@se","v1eda53","v1éda53","v1eda5e","v1éda5e","v1edas3","v1édas3","v1edase","v1édase","v1er","vaur!3n","vaur!en","vaur13n","vaur1en","vauri3n","vaurien","vi3d@53","vi3d@s3","vi3da53","vi3das3","vi3r","vid3-c0uill35","vid3-c0uill3s","vid3-couill35","vid3-couill3s","vide-c0uille5","vide-c0uilles","vide-couille5","vide-couilles","vied@53","viéd@53","vied@5e","viéd@5e","vied@s3","viéd@s3","vied@se","viéd@se","vieda53","viéda53","vieda5e","viéda5e","viedas3","viédas3","viedase","viédase","vier","x3r0p!n3ur","x3r0p1n3ur","x3r0pin3ur","x3rop!n3ur","x3rop1n3ur","x3ropin3ur","xer0p!n3ur","xér0p!n3ur","xer0p!neur","xér0p!neur","xer0p1n3ur","xér0p1n3ur","xer0p1neur","xér0p1neur","xer0pin3ur","xér0pin3ur","xer0pineur","xér0pineur","xerop!n3ur","xérop!n3ur","xerop!neur","xérop!neur","xerop1n3ur","xérop1n3ur","xerop1neur","xérop1neur","xeropin3ur","xéropin3ur","xeropineur","xéropineur","y0ud","y0up!n","y0up!n!5@t!0n","y0up!n!5at!0n","y0up!n!s@t!0n","y0up!n!sat!0n","y0up!n3","y0up!ne","y0up1n","y0up1n15@t10n","y0up1n15at10n","y0up1n1s@t10n","y0up1n1sat10n","y0up1n3","y0up1ne","y0upin","y0upin3","y0upine","y0upini5@ti0n","y0upini5ati0n","y0upinis@ti0n","y0upinisati0n","y0utr3","y0utre","y3ul3","yeule","youd","youp!n","youp!n!5@t!on","youp!n!5at!on","youp!n!s@t!on","youp!n!sat!on","youp!n3","youp!ne","youp1n","youp1n15@t1on","youp1n15at1on","youp1n1s@t1on","youp1n1sat1on","youp1n3","youp1ne","youpin","youpin3","youpine","youpini5@tion","youpini5ation","youpinis@tion","youpinisation","youtr3","youtre","zgu3gu3","zguegu3","zguègu3","zguegue","zguègue"];
  },{}],4:[function(require,module,exports){
  module.exports={object:require("./object"),array:require("./array"),regex:require("./regexp")};
  },{"./array":3,"./object":5,"./regexp":6}],5:[function(require,module,exports){
  module.exports={"!mb3c!l3":1,"!mbec!l3":1,"!mbéc!l3":1,"!mbec!le":1,"!mbéc!le":1,"@brut!":1,"@brut1":1,"@bruti":1,"@nd0u!ll3":1,"@nd0u!lle":1,"@nd0u1ll3":1,"@nd0u1lle":1,"@nd0uill3":1,"@nd0uille":1,"@ndou!ll3":1,"@ndou!lle":1,"@ndou1ll3":1,"@ndou1lle":1,"@ndouill3":1,"@ndouille":1,"@v0rt0n":1,"@vorton":1,"1mb3c1l3":1,"1mbec1l3":1,"1mbéc1l3":1,"1mbec1le":1,"1mbéc1le":1,"35p!ng0!n":1,"35p!ngo!n":1,"35p1ng01n":1,"35p1ngo1n":1,"35ping0in":1,"35pingoin":1,"3mm@nch3":1,"3mm@nche":1,"3mm@nché":1,"3mm3rd3r":1,"3mm3rd3u53":1,"3mm3rd3ur":1,"3mm3rd3us3":1,"3mmanch3":1,"3mmanche":1,"3mmanché":1,"3mp@f3":1,"3mp@fe":1,"3mp@fé":1,"3mp@p@0ut3":1,"3mp@p@0ute":1,"3mp@p@0uté":1,"3mp@p@out3":1,"3mp@p@oute":1,"3mp@p@outé":1,"3mpaf3":1,"3mpafe":1,"3mpafé":1,"3mpapa0ut3":1,"3mpapa0ute":1,"3mpapa0uté":1,"3mpapaout3":1,"3mpapaoute":1,"3mpapaouté":1,"3ncul3":1,"3ncul3r":1,"3ncul3ur":1,"3ncule":1,"3nculé":1,"3nf0!r3":1,"3nf0!re":1,"3nf0!ré":1,"3nf01r3":1,"3nf01re":1,"3nf01ré":1,"3nf0ir3":1,"3nf0ire":1,"3nf0iré":1,"3nflur3":1,"3nfo!r3":1,"3nfo!re":1,"3nfo!ré":1,"3nfo1r3":1,"3nfo1re":1,"3nfo1ré":1,"3nfoir3":1,"3nfoire":1,"3nfoiré":1,"3nv@53l!n3ur":1,"3nv@53l1n3ur":1,"3nv@53lin3ur":1,"3nv@s3l!n3ur":1,"3nv@s3l1n3ur":1,"3nv@s3lin3ur":1,"3nva53l!n3ur":1,"3nva53l1n3ur":1,"3nva53lin3ur":1,"3nvas3l!n3ur":1,"3nvas3l1n3ur":1,"3nvas3lin3ur":1,"3p@!5":1,"3p@!s":1,"3p@15":1,"3p@1s":1,"3p@i5":1,"3p@is":1,"3pa!5":1,"3pa!s":1,"3pa15":1,"3pa1s":1,"3pai5":1,"3pais":1,"3sp!ng0!n":1,"3sp!ngo!n":1,"3sp1ng01n":1,"3sp1ngo1n":1,"3sping0in":1,"3spingoin":1,"3tr0n":1,"3tron":1,"5@g0u!n":1,"5@g0u1n":1,"5@g0uin":1,"5@gou!n":1,"5@gou1n":1,"5@gouin":1,"5@l@ud":1,"5@l0p":1,"5@l0p@rd":1,"5@l0p3":1,"5@l0pe":1,"5@l3":1,"5@le":1,"5@lop":1,"5@lop@rd":1,"5@lop3":1,"5@lope":1,"5@tr0u!ll3":1,"5@tr0u!lle":1,"5@tr0u1ll3":1,"5@tr0u1lle":1,"5@tr0uill3":1,"5@tr0uille":1,"5@trou!ll3":1,"5@trou!lle":1,"5@trou1ll3":1,"5@trou1lle":1,"5@trouill3":1,"5@trouille":1,"50tt!53ux":1,"50tt!5eux":1,"50tt153ux":1,"50tt15eux":1,"50tti53ux":1,"50tti5eux":1,"50u5-m3rd3":1,"50u5-merde":1,"53nt-l@-p!553":1,"53nt-l@-p1553":1,"53nt-l@-pi553":1,"53nt-la-p!553":1,"53nt-la-p1553":1,"53nt-la-pi553":1,"5ag0u!n":1,"5ag0u1n":1,"5ag0uin":1,"5agou!n":1,"5agou1n":1,"5agouin":1,"5al0p":1,"5al0p3":1,"5al0pard":1,"5al0pe":1,"5al3":1,"5alaud":1,"5ale":1,"5alop":1,"5alop3":1,"5alopard":1,"5alope":1,"5atr0u!ll3":1,"5atr0u!lle":1,"5atr0u1ll3":1,"5atr0u1lle":1,"5atr0uill3":1,"5atr0uille":1,"5atrou!ll3":1,"5atrou!lle":1,"5atrou1ll3":1,"5atrou1lle":1,"5atrouill3":1,"5atrouille":1,"5chb3b":1,"5chbeb":1,"5chl3u":1,"5chleu":1,"5chn0c":1,"5chn0ck":1,"5chn0qu3":1,"5chn0que":1,"5chnoc":1,"5chnock":1,"5chnoqu3":1,"5chnoque":1,"5ent-l@-p!55e":1,"5ent-l@-p155e":1,"5ent-l@-pi55e":1,"5ent-la-p!55e":1,"5ent-la-p155e":1,"5ent-la-pi55e":1,"5ott!53ux":1,"5ott!5eux":1,"5ott153ux":1,"5ott15eux":1,"5otti53ux":1,"5otti5eux":1,"5ou5-m3rd3":1,"5ou5-merde":1,"5t3@r!qu3":1,"5t3@r1qu3":1,"5t3@riqu3":1,"5t3ar!qu3":1,"5t3ar1qu3":1,"5t3ariqu3":1,"5té@r!qu3":1,"5te@r!que":1,"5té@r!que":1,"5te@r1qu3":1,"5té@r1qu3":1,"5te@r1que":1,"5té@r1que":1,"5te@riqu3":1,"5té@riqu3":1,"5te@rique":1,"5té@rique":1,"5tear!qu3":1,"5téar!qu3":1,"5tear!que":1,"5téar!que":1,"5tear1qu3":1,"5téar1qu3":1,"5tear1que":1,"5téar1que":1,"5teariqu3":1,"5téariqu3":1,"5tearique":1,"5téarique":1,"abrut!":1,abrut1:1,abruti:1,"and0u!ll3":1,"and0u!lle":1,and0u1ll3:1,and0u1lle:1,and0uill3:1,and0uille:1,"andou!ll3":1,"andou!lle":1,andou1ll3:1,andou1lle:1,andouill3:1,andouille:1,av0rt0n:1,avorton:1,"b!@tch":1,"b!atch":1,"b!c0t":1,"b!cot":1,"b!t3":1,"b!t3mb0!5":1,"b!t3mb0!s":1,"b!t3mbo!5":1,"b!t3mbo!s":1,"b!te":1,"b!temb0!5":1,"b!temb0!s":1,"b!tembo!5":1,"b!tembo!s":1,"b@t@rd":1,b0rd3l:1,b0rdel:1,b0uff0n:1,b0ugn0ul:1,"B0ugn0ul!3":1,"b0ugn0ul!5@t!0n":1,"b0ugn0ul!53r":1,"b0ugn0ul!5at!0n":1,"b0ugn0ul!5er":1,"B0ugn0ul!e":1,"b0ugn0ul!s@t!0n":1,"b0ugn0ul!s3r":1,"b0ugn0ul!sat!0n":1,"b0ugn0ul!ser":1,B0ugn0ul13:1,"b0ugn0ul15@t10n":1,b0ugn0ul153r:1,b0ugn0ul15at10n:1,b0ugn0ul15er:1,B0ugn0ul1e:1,"b0ugn0ul1s@t10n":1,b0ugn0ul1s3r:1,b0ugn0ul1sat10n:1,b0ugn0ul1ser:1,b0ugn0ul3:1,b0ugn0ule:1,B0ugn0uli3:1,"b0ugn0uli5@ti0n":1,b0ugn0uli53r:1,b0ugn0uli5ati0n:1,b0ugn0uli5er:1,B0ugn0ulie:1,"b0ugn0ulis@ti0n":1,b0ugn0ulis3r:1,b0ugn0ulisati0n:1,b0ugn0uliser:1,b0ugr3:1,b0ugre:1,"b0uk@k":1,b0ukak:1,"b0un!0ul":1,b0un10ul:1,b0uni0ul:1,"b0urd!ll3":1,"b0urd!lle":1,b0urd1ll3:1,b0urd1lle:1,b0urdill3:1,b0urdille:1,b0us3ux:1,b0useux:1,"b1@tch":1,b1atch:1,b1c0t:1,b1cot:1,b1t3:1,b1t3mb015:1,b1t3mb01s:1,b1t3mbo15:1,b1t3mbo1s:1,b1te:1,b1temb015:1,b1temb01s:1,b1tembo15:1,b1tembo1s:1,"b3@uf":1,b3auf:1,"bât@rd":1,batard:1,"bâtard":1,"be@uf":1,beauf:1,"bi@tch":1,biatch:1,bic0t:1,bicot:1,bit3:1,bit3mb0i5:1,bit3mb0is:1,bit3mboi5:1,bit3mbois:1,bite:1,bitemb0i5:1,bitemb0is:1,bitemboi5:1,bitembois:1,bord3l:1,bordel:1,bouffon:1,bougnoul:1,"Bougnoul!3":1,"bougnoul!5@t!on":1,"bougnoul!53r":1,"bougnoul!5at!on":1,"bougnoul!5er":1,"Bougnoul!e":1,"bougnoul!s@t!on":1,"bougnoul!s3r":1,"bougnoul!sat!on":1,"bougnoul!ser":1,Bougnoul13:1,"bougnoul15@t1on":1,bougnoul153r:1,bougnoul15at1on:1,bougnoul15er:1,Bougnoul1e:1,"bougnoul1s@t1on":1,bougnoul1s3r:1,bougnoul1sat1on:1,bougnoul1ser:1,bougnoul3:1,bougnoule:1,Bougnouli3:1,"bougnouli5@tion":1,bougnouli53r:1,bougnouli5ation:1,bougnouli5er:1,Bougnoulie:1,"bougnoulis@tion":1,bougnoulis3r:1,bougnoulisation:1,bougnouliser:1,bougr3:1,bougre:1,"bouk@k":1,boukak:1,"boun!oul":1,boun1oul:1,bounioul:1,"bourd!ll3":1,"bourd!lle":1,bourd1ll3:1,bourd1lle:1,bourdill3:1,bourdille:1,bous3ux:1,bouseux:1,"br!53-burn35":1,"br!5e-burne5":1,"br!s3-burn3s":1,"br!se-burnes":1,"br@nl3r":1,"br@nl3ur":1,"br@nler":1,"br@nleur":1,"br@nqu3":1,"br@nque":1,"br153-burn35":1,"br15e-burne5":1,"br1s3-burn3s":1,"br1se-burnes":1,branl3r:1,branl3ur:1,branler:1,branleur:1,branqu3:1,branque:1,"bri53-burn35":1,"bri5e-burne5":1,"bris3-burn3s":1,"brise-burnes":1,"c@553-b0nb0n":1,"c@553-bonbon":1,"c@553-c0u!ll3":1,"c@553-c0u!ll35":1,"c@553-c0u1ll3":1,"c@553-c0u1ll35":1,"c@553-c0uill3":1,"c@553-c0uill35":1,"c@553-cou!ll3":1,"c@553-cou!ll35":1,"c@553-cou1ll3":1,"c@553-cou1ll35":1,"c@553-couill3":1,"c@553-couill35":1,"c@55e-b0nb0n":1,"c@55e-bonbon":1,"c@55e-c0u!lle":1,"c@55e-c0u!lle5":1,"c@55e-c0u1lle":1,"c@55e-c0u1lle5":1,"c@55e-c0uille":1,"c@55e-c0uille5":1,"c@55e-cou!lle":1,"c@55e-cou!lle5":1,"c@55e-cou1lle":1,"c@55e-cou1lle5":1,"c@55e-couille":1,"c@55e-couille5":1,"c@c0u":1,"c@cou":1,"c@fr3":1,"c@fre":1,"c@ld0ch3":1,"c@ld0che":1,"c@ldoch3":1,"c@ldoche":1,"c@ss3-b0nb0n":1,"c@ss3-bonbon":1,"c@ss3-c0u!ll3":1,"c@ss3-c0u!ll3s":1,"c@ss3-c0u1ll3":1,"c@ss3-c0u1ll3s":1,"c@ss3-c0uill3":1,"c@ss3-c0uill3s":1,"c@ss3-cou!ll3":1,"c@ss3-cou!ll3s":1,"c@ss3-cou1ll3":1,"c@ss3-cou1ll3s":1,"c@ss3-couill3":1,"c@ss3-couill3s":1,"c@sse-b0nb0n":1,"c@sse-bonbon":1,"c@sse-c0u!lle":1,"c@sse-c0u!lles":1,"c@sse-c0u1lle":1,"c@sse-c0u1lles":1,"c@sse-c0uille":1,"c@sse-c0uilles":1,"c@sse-cou!lle":1,"c@sse-cou!lles":1,"c@sse-cou1lle":1,"c@sse-cou1lles":1,"c@sse-couille":1,"c@sse-couilles":1,c0ch3:1,c0che:1,c0n:1,"c0n@553":1,"c0n@55e":1,"c0n@rd":1,"c0n@ss3":1,"c0n@sse":1,c0n5:1,c0na553:1,c0na55e:1,c0nard:1,c0nass3:1,c0nasse:1,"c0nch!3r":1,"c0nch!er":1,c0nch13r:1,c0nch1er:1,c0nchi3r:1,c0nchier:1,"c0nn@553":1,"c0nn@55e":1,"c0nn@rd":1,"c0nn@rd3":1,"c0nn@rde":1,"c0nn@ss3":1,"c0nn@sse":1,c0nn3:1,c0nna553:1,c0nna55e:1,c0nnard:1,c0nnard3:1,c0nnarde:1,c0nnass3:1,c0nnasse:1,c0nne:1,c0ns:1,c0u1ll0n:1,c0u1ll0nn3r:1,c0u1ll3:1,c0u1ll3s:1,c0uill0n:1,c0uill0nn3r:1,c0uill0nner:1,c0uill3:1,c0uill3s:1,c0uille:1,c0uilles:1,"c0un!fl3":1,"c0un!fle":1,c0un1fl3:1,c0un1fle:1,c0unifl3:1,c0unifle:1,"c0urt@ud":1,c0urtaud:1,"ca553-b0nb0n":1,"ca553-bonbon":1,"ca553-c0u!ll3":1,"ca553-c0u!ll35":1,"ca553-c0u1ll3":1,"ca553-c0u1ll35":1,"ca553-c0uill3":1,"ca553-c0uill35":1,"ca553-cou!ll3":1,"ca553-cou!ll35":1,"ca553-cou1ll3":1,"ca553-cou1ll35":1,"ca553-couill3":1,"ca553-couill35":1,"ca55e-b0nb0n":1,"ca55e-bonbon":1,"ca55e-c0u!lle":1,"ca55e-c0u!lle5":1,"ca55e-c0u1lle":1,"ca55e-c0u1lle5":1,"ca55e-c0uille":1,"ca55e-c0uille5":1,"ca55e-cou!lle":1,"ca55e-cou!lle5":1,"ca55e-cou1lle":1,"ca55e-cou1lle5":1,"ca55e-couille":1,"ca55e-couille5":1,cac0u:1,cacou:1,cafr3:1,cafre:1,cald0ch3:1,cald0che:1,caldoch3:1,caldoche:1,"cass3-b0nb0n":1,"cass3-bonbon":1,"cass3-c0u!ll3":1,"cass3-c0u!ll3s":1,"cass3-c0u1ll3":1,"cass3-c0u1ll3s":1,"cass3-c0uill3":1,"cass3-c0uill3s":1,"cass3-cou!ll3":1,"cass3-cou!ll3s":1,"cass3-cou1ll3":1,"cass3-cou1ll3s":1,"cass3-couill3":1,"cass3-couill3s":1,"casse-b0nb0n":1,"casse-bonbon":1,"casse-c0u!lle":1,"casse-c0u!lles":1,"casse-c0u1lle":1,"casse-c0u1lles":1,"casse-c0uille":1,"casse-c0uilles":1,"casse-cou!lle":1,"casse-cou!lles":1,"casse-cou1lle":1,"casse-cou1lles":1,"casse-couille":1,"casse-couilles":1,"ch!3nn@553":1,"ch!3nn@ss3":1,"ch!3nna553":1,"ch!3nnass3":1,"ch!3r":1,"ch!enn@55e":1,"ch!enn@sse":1,"ch!enna55e":1,"ch!ennasse":1,"ch!er":1,"ch!n3t0c":1,"ch!n3t0qu3":1,"ch!n3toc":1,"ch!n3toqu3":1,"ch!net0c":1,"ch!net0que":1,"ch!netoc":1,"ch!netoque":1,"ch!nt0k":1,"ch!ntok":1,"ch@ch@r":1,"ch@g@553":1,"ch@g@55e":1,"ch@g@ss3":1,"ch@g@sse":1,"ch@uff@rd":1,"ch13nn@553":1,"ch13nn@ss3":1,ch13nna553:1,ch13nnass3:1,ch13r:1,ch13ur:1,ch13urs:1,"ch1enn@55e":1,"ch1enn@sse":1,ch1enna55e:1,ch1ennasse:1,ch1er:1,ch1eur:1,ch1eurs:1,ch1n3t0c:1,ch1n3t0qu3:1,ch1n3toc:1,ch1n3toqu3:1,ch1net0c:1,ch1net0que:1,ch1netoc:1,ch1netoque:1,ch1nt0k:1,ch1ntok:1,chachar:1,chaga553:1,chaga55e:1,chagass3:1,chagasse:1,chauffard:1,"chi3nn@553":1,"chi3nn@ss3":1,chi3nna553:1,chi3nnass3:1,chi3r:1,chi3ur:1,chi3urs:1,"chienn@55e":1,"chienn@sse":1,chienna55e:1,chiennasse:1,chier:1,chieur:1,chieurs:1,chin3t0c:1,chin3t0qu3:1,chin3toc:1,chin3toqu3:1,chinet0c:1,chinet0que:1,chinetoc:1,chinetoque:1,chint0k:1,chintok:1,chl3uh:1,chleuh:1,chn0qu3:1,chn0que:1,chnoqu3:1,chnoque:1,coch3:1,coche:1,con:1,"con@553":1,"con@55e":1,"con@rd":1,"con@ss3":1,"con@sse":1,con5:1,cona553:1,cona55e:1,conard:1,conass3:1,conasse:1,"conch!3r":1,"conch!er":1,conch13r:1,conch1er:1,conchi3r:1,conchier:1,"conn@553":1,"conn@55e":1,"conn@rd":1,"conn@rd3":1,"conn@rde":1,"conn@ss3":1,"conn@sse":1,conn3:1,conna553:1,conna55e:1,connard:1,connard3:1,connarde:1,connass3:1,connasse:1,conne:1,cons:1,cou1lle:1,cou1lles:1,cou1llon:1,cou1llonner:1,couill3:1,couill3s:1,couille:1,couilles:1,couillon:1,couillonn3r:1,couillonner:1,"coun!fl3":1,"coun!fle":1,coun1fl3:1,coun1fle:1,counifl3:1,counifle:1,"court@ud":1,courtaud:1,"cr!cr!":1,cr0tt3:1,cr0tte:1,"cr0tté":1,"cr0u!ll@t":1,"cr0u!ll3":1,"cr0u!llat":1,"cr0u!lle":1,"cr0u1ll@t":1,cr0u1ll3:1,cr0u1llat:1,cr0u1lle:1,"cr0uill@t":1,cr0uill3:1,cr0uillat:1,cr0uille:1,"cr0ût0n":1,cr1cr1:1,"cr3t!n":1,cr3t1n:1,cr3tin:1,"cr3v@rd":1,cr3vard:1,cr3vur3:1,"cret!n":1,"crét!n":1,cret1n:1,"crét1n":1,cretin:1,"crétin":1,"crev@rd":1,crevard:1,crevure:1,cricri:1,crott3:1,crotte:1,"crotté":1,"crou!ll@t":1,"crou!ll3":1,"crou!llat":1,"crou!lle":1,"crou1ll@t":1,crou1ll3:1,crou1llat:1,crou1lle:1,"crouill@t":1,crouill3:1,crouillat:1,crouille:1,"croûton":1,cul:1,"d3b!l3":1,d3b1l3:1,d3bil3:1,"d3gu3l@ss3":1,d3gu3lass3:1,d3m3rd3r:1,"deb!l3":1,"déb!l3":1,"deb!le":1,"déb!le":1,deb1l3:1,"déb1l3":1,deb1le:1,"déb1le":1,debil3:1,"débil3":1,debile:1,"débile":1,"déguel@sse":1,deguelasse:1,"déguelasse":1,demerder:1,"démerder":1,"dr0u!ll3":1,"dr0u!lle":1,dr0u1ll3:1,dr0u1lle:1,dr0uill3:1,dr0uille:1,"drou!ll3":1,"drou!lle":1,drou1ll3:1,drou1lle:1,drouill3:1,drouille:1,"du schn0c":1,"du schnoc":1,du5chn0ck:1,du5chnock:1,duc0n:1,duc0nn0t:1,ducon:1,duconnot:1,dug3n0ux:1,dug3noux:1,dugen0ux:1,dugenoux:1,"dugl@nd":1,dugland:1,duschn0ck:1,duschnock:1,"e5p!ng0!n":1,"e5p!ngo!n":1,e5p1ng01n:1,e5p1ngo1n:1,e5ping0in:1,e5pingoin:1,"emm@nche":1,"emm@nché":1,emmanche:1,"emmanché":1,emmerder:1,emmerdeu5e:1,emmerdeur:1,emmerdeuse:1,"emp@fe":1,"emp@fé":1,"emp@p@0ute":1,"emp@p@0uté":1,"emp@p@oute":1,"emp@p@outé":1,empafe:1,"empafé":1,empapa0ute:1,"empapa0uté":1,empapaoute:1,"empapaouté":1,encule:1,"enculé":1,enculer:1,enculeur:1,"enf0!re":1,"enf0!ré":1,enf01re:1,"enf01ré":1,enf0ire:1,"enf0iré":1,enflure:1,"enfo!re":1,"enfo!ré":1,enfo1re:1,"enfo1ré":1,enfoire:1,"enfoiré":1,"env@5el!neur":1,"env@5el1neur":1,"env@5elineur":1,"env@sel!neur":1,"env@sel1neur":1,"env@selineur":1,"enva5el!neur":1,enva5el1neur:1,enva5elineur:1,"envasel!neur":1,envasel1neur:1,envaselineur:1,"ep@!5":1,"ép@!5":1,"ep@!s":1,"ép@!s":1,"ep@15":1,"ép@15":1,"ep@1s":1,"ép@1s":1,"ep@i5":1,"ép@i5":1,"ep@is":1,"ép@is":1,"epa!5":1,"épa!5":1,"epa!s":1,"épa!s":1,epa15:1,"épa15":1,epa1s:1,"épa1s":1,epai5:1,"épai5":1,epais:1,"épais":1,"esp!ng0!n":1,"esp!ngo!n":1,esp1ng01n:1,esp1ngo1n:1,esping0in:1,espingoin:1,etr0n:1,"étr0n":1,etron:1,"étron":1,"f!0tt3":1,"f!0tte":1,"f!ott3":1,"f!otte":1,f0ut3ur:1,f0uteur:1,f0utr3:1,f0utre:1,f10tt3:1,f10tte:1,f1ott3:1,f1otte:1,"f31gn@ss3":1,"f3ign@ss3":1,f3ignass3:1,FDP:1,fe1gnasse:1,"feign@sse":1,feignasse:1,fi0tt3:1,fi0tte:1,fiott3:1,fiotte:1,fout3ur:1,fouteur:1,foutr3:1,foutre:1,"fr!tz":1,fr1tz:1,fritz:1,"fum!3r":1,"fum!er":1,fum13r:1,fum1er:1,fumi3r:1,fumier:1,"g@rc3":1,"g@rce":1,"g@up3":1,"g@upe":1,G0d0n:1,g0g0l:1,"g0ï":1,"g0u!ll@nd":1,"g0u!lland":1,"g0u!n3":1,"g0u!ne":1,"g0u1ll@nd":1,g0u1lland:1,g0u1n3:1,g0u1ne:1,"g0uill@nd":1,g0uilland:1,g0uin3:1,g0uine:1,g0urd3:1,g0urde:1,"g0urg@nd!n3":1,"g0urg@nd!ne":1,"g0urg@nd1n3":1,"g0urg@nd1ne":1,"g0urg@ndin3":1,"g0urg@ndine":1,"g0urgand!n3":1,"g0urgand!ne":1,g0urgand1n3:1,g0urgand1ne:1,g0urgandin3:1,g0urgandine:1,garc3:1,garce:1,gaup3:1,gaupe:1,GDM:1,"gl@nd":1,"gl@nd0u!ll0u":1,"gl@nd0u1ll0u":1,"gl@nd0uill0u":1,"gl@nd3u53":1,"gl@nd3ur":1,"gl@nd3us3":1,"gl@ndeu5e":1,"gl@ndeur":1,"gl@ndeuse":1,"gl@ndou!llou":1,"gl@ndou1llou":1,"gl@ndouillou":1,"gl@ndu":1,gland:1,"gland0u!ll0u":1,gland0u1ll0u:1,gland0uill0u:1,gland3u53:1,gland3ur:1,gland3us3:1,glandeu5e:1,glandeur:1,glandeuse:1,"glandou!llou":1,glandou1llou:1,glandouillou:1,glandu:1,gn0ul:1,gn0ul3:1,gn0ule:1,gnoul:1,gnoul3:1,gnoule:1,Godon:1,gogol:1,"goï":1,"gou!ll@nd":1,"gou!lland":1,"gou!n3":1,"gou!ne":1,"gou1ll@nd":1,gou1lland:1,gou1n3:1,gou1ne:1,"gouill@nd":1,gouilland:1,gouin3:1,gouine:1,gourd3:1,gourde:1,"gourg@nd!n3":1,"gourg@nd!ne":1,"gourg@nd1n3":1,"gourg@nd1ne":1,"gourg@ndin3":1,"gourg@ndine":1,"gourgand!n3":1,"gourgand!ne":1,gourgand1n3:1,gourgand1ne:1,gourgandin3:1,gourgandine:1,"gr0gn@553":1,"gr0gn@55e":1,"gr0gn@ss3":1,"gr0gn@sse":1,gr0gna553:1,gr0gna55e:1,gr0gnass3:1,gr0gnasse:1,"grogn@553":1,"grogn@55e":1,"grogn@ss3":1,"grogn@sse":1,grogna553:1,grogna55e:1,grognass3:1,grognasse:1,"gu!nd0ul3":1,"gu!nd0ule":1,"gu!ndoul3":1,"gu!ndoule":1,gu1nd0ul3:1,gu1nd0ule:1,gu1ndoul3:1,gu1ndoule:1,"gu3n!ch3":1,gu3n1ch3:1,gu3nich3:1,"guen!che":1,guen1che:1,gueniche:1,guind0ul3:1,guind0ule:1,guindoul3:1,guindoule:1,imb3cil3:1,imbecil3:1,"imbécil3":1,imbecile:1,"imbécile":1,"j3@n-f0utr3":1,"j3@n-foutr3":1,"j3an-f0utr3":1,"j3an-foutr3":1,"je@n-f0utre":1,"je@n-foutre":1,"jean-f0utre":1,"jean-foutre":1,"k!k00":1,"k!k0u":1,"k!koo":1,"k!kou":1,k1k00:1,k1k0u:1,k1koo:1,k1kou:1,kik00:1,kik0u:1,kikoo:1,kikou:1,"Kr@ut":1,Kraut:1,"l@ch3ux":1,"l@cheux":1,"l@v3tt3":1,"l@vette":1,l0p3tt3:1,l0pette:1,lach3ux:1,"lâch3ux":1,lacheux:1,"lâcheux":1,lav3tt3:1,lavette:1,lop3tt3:1,lopette:1,"m!53r@bl3":1,"m!53rabl3":1,"m!5ér@bl3":1,"m!5er@ble":1,"m!5ér@ble":1,"m!5erabl3":1,"m!5érabl3":1,"m!5erable":1,"m!5érable":1,"m!cht0":1,"m!chto":1,"m!n@bl3":1,"m!n@ble":1,"m!nabl3":1,"m!nable":1,"m!nu5":1,"m!nus":1,"m!s3r@bl3":1,"m!s3rabl3":1,"m!ser@bl3":1,"m!sér@bl3":1,"m!ser@ble":1,"m!sér@ble":1,"m!serabl3":1,"m!sérabl3":1,"m!serable":1,"m!sérable":1,"m@g0t":1,"m@got":1,"m@k0um3":1,"m@k0ume":1,"m@k0umé":1,"m@koum3":1,"m@koume":1,"m@koumé":1,"m@nch3":1,"m@nche":1,"m@ng3-m3rd3":1,"m@nge-merde":1,"m@rch@nd0t":1,"m@rch@ndot":1,"m@rg0u!ll!5t3":1,"m@rg0u!ll!5te":1,"m@rg0u!ll!st3":1,"m@rg0u!ll!ste":1,"m@rg0u1ll15t3":1,"m@rg0u1ll15te":1,"m@rg0u1ll1st3":1,"m@rg0u1ll1ste":1,"m@rg0uilli5t3":1,"m@rg0uilli5te":1,"m@rg0uillist3":1,"m@rg0uilliste":1,"m@rgou!ll!5t3":1,"m@rgou!ll!5te":1,"m@rgou!ll!st3":1,"m@rgou!ll!ste":1,"m@rgou1ll15t3":1,"m@rgou1ll15te":1,"m@rgou1ll1st3":1,"m@rgou1ll1ste":1,"m@rgouilli5t3":1,"m@rgouilli5te":1,"m@rgouillist3":1,"m@rgouilliste":1,"m@uv!3tt3":1,"m@uv!ette":1,"m@uv13tt3":1,"m@uv1ette":1,"m@uvi3tt3":1,"m@uviette":1,"m0!n@!ll3":1,"m0!n@!lle":1,"m0!n5-qu3-r!3n":1,"m0!n5-que-r!en":1,"m0!na!ll3":1,"m0!na!lle":1,"m0!ns-qu3-r!3n":1,"m0!ns-que-r!en":1,"m01n@1ll3":1,"m01n@1lle":1,"m01n5-qu3-r13n":1,"m01n5-que-r1en":1,m01na1ll3:1,m01na1lle:1,"m01ns-qu3-r13n":1,"m01ns-que-r1en":1,"m0in@ill3":1,"m0in@ille":1,"m0in5-qu3-ri3n":1,"m0in5-que-rien":1,m0inaill3:1,m0inaille:1,"m0ins-qu3-ri3n":1,"m0ins-que-rien":1,"m0n@c@!ll3":1,"m0n@c@!lle":1,"m0n@c@1ll3":1,"m0n@c@1lle":1,"m0n@c@ill3":1,"m0n@c@ille":1,"m0naca!ll3":1,"m0naca!lle":1,m0naca1ll3:1,m0naca1lle:1,m0nacaill3:1,m0nacaille:1,"m0r!c@ud":1,"m0r!caud":1,"m0r1c@ud":1,m0r1caud:1,"m0ric@ud":1,m0ricaud:1,"m153r@bl3":1,m153rabl3:1,"m15er@bl3":1,"m15ér@bl3":1,"m15er@ble":1,"m15ér@ble":1,m15erabl3:1,"m15érabl3":1,m15erable:1,"m15érable":1,m1cht0:1,m1chto:1,"m1n@bl3":1,"m1n@ble":1,m1nabl3:1,m1nable:1,m1nu5:1,m1nus:1,"m1s3r@bl3":1,m1s3rabl3:1,"m1ser@bl3":1,"m1sér@bl3":1,"m1ser@ble":1,"m1sér@ble":1,m1serabl3:1,"m1sérabl3":1,m1serable:1,"m1sérable":1,"m3rd@!ll0n":1,"m3rd@!ll3":1,"m3rd@!llon":1,"m3rd@1ll0n":1,"m3rd@1ll3":1,"m3rd@1llon":1,"m3rd@ill0n":1,"m3rd@ill3":1,"m3rd@illon":1,"m3rd0u!ll@rd":1,"m3rd0u!llard":1,"m3rd0u1ll@rd":1,m3rd0u1llard:1,"m3rd0uill@rd":1,m3rd0uillard:1,m3rd3:1,m3rd3ux:1,"m3rda!ll0n":1,"m3rda!ll3":1,"m3rda!llon":1,m3rda1ll0n:1,m3rda1ll3:1,m3rda1llon:1,m3rdaill0n:1,m3rdaill3:1,m3rdaillon:1,"m3rdou!ll@rd":1,"m3rdou!llard":1,"m3rdou1ll@rd":1,m3rdou1llard:1,"m3rdouill@rd":1,m3rdouillard:1,mag0t:1,magot:1,mak0um3:1,mak0ume:1,"mak0umé":1,makoum3:1,makoume:1,"makoumé":1,manch3:1,manche:1,"mang3-m3rd3":1,"mange-merde":1,marchand0t:1,marchandot:1,"marg0u!ll!5t3":1,"marg0u!ll!5te":1,"marg0u!ll!st3":1,"marg0u!ll!ste":1,marg0u1ll15t3:1,marg0u1ll15te:1,marg0u1ll1st3:1,marg0u1ll1ste:1,marg0uilli5t3:1,marg0uilli5te:1,marg0uillist3:1,marg0uilliste:1,"margou!ll!5t3":1,"margou!ll!5te":1,"margou!ll!st3":1,"margou!ll!ste":1,margou1ll15t3:1,margou1ll15te:1,margou1ll1st3:1,margou1ll1ste:1,margouilli5t3:1,margouilli5te:1,margouillist3:1,margouilliste:1,"mauv!3tt3":1,"mauv!ette":1,mauv13tt3:1,mauv1ette:1,mauvi3tt3:1,mauviette:1,"merd@!ll0n":1,"merd@!lle":1,"merd@!llon":1,"merd@1ll0n":1,"merd@1lle":1,"merd@1llon":1,"merd@ill0n":1,"merd@ille":1,"merd@illon":1,"merd0u!ll@rd":1,"merd0u!llard":1,"merd0u1ll@rd":1,merd0u1llard:1,"merd0uill@rd":1,merd0uillard:1,"merda!ll0n":1,"merda!lle":1,"merda!llon":1,merda1ll0n:1,merda1lle:1,merda1llon:1,merdaill0n:1,merdaille:1,merdaillon:1,merde:1,merdeux:1,"merdou!ll@rd":1,"merdou!llard":1,"merdou1ll@rd":1,merdou1llard:1,"merdouill@rd":1,merdouillard:1,"mi53r@bl3":1,mi53rabl3:1,"mi5er@bl3":1,"mi5ér@bl3":1,"mi5er@ble":1,"mi5ér@ble":1,mi5erabl3:1,"mi5érabl3":1,mi5erable:1,"mi5érable":1,micht0:1,michto:1,"min@bl3":1,"min@ble":1,minabl3:1,minable:1,minu5:1,minus:1,"mis3r@bl3":1,mis3rabl3:1,"miser@bl3":1,"misér@bl3":1,"miser@ble":1,"misér@ble":1,miserabl3:1,"misérabl3":1,miserable:1,"misérable":1,"mo!n@!ll3":1,"mo!n@!lle":1,"mo!n5-qu3-r!3n":1,"mo!n5-que-r!en":1,"mo!na!ll3":1,"mo!na!lle":1,"mo!ns-qu3-r!3n":1,"mo!ns-que-r!en":1,"mo1n@1ll3":1,"mo1n@1lle":1,"mo1n5-qu3-r13n":1,"mo1n5-que-r1en":1,mo1na1ll3:1,mo1na1lle:1,"mo1ns-qu3-r13n":1,"mo1ns-que-r1en":1,"moin@ill3":1,"moin@ille":1,"moin5-qu3-ri3n":1,"moin5-que-rien":1,moinaill3:1,moinaille:1,"moins-qu3-ri3n":1,"moins-que-rien":1,"mon@c@!ll3":1,"mon@c@!lle":1,"mon@c@1ll3":1,"mon@c@1lle":1,"mon@c@ill3":1,"mon@c@ille":1,"monaca!ll3":1,"monaca!lle":1,monaca1ll3:1,monaca1lle:1,monacaill3:1,monacaille:1,"mor!c@ud":1,"mor!caud":1,"mor1c@ud":1,mor1caud:1,"moric@ud":1,moricaud:1,"n!@!53ux":1,"n!@!5eux":1,"n!@!s3ux":1,"n!@!seux":1,"n!@c":1,"n!@k0u3":1,"n!@k0ue":1,"n!@k0ué":1,"n!@kou3":1,"n!@koue":1,"n!@koué":1,"n!a!53ux":1,"n!a!5eux":1,"n!a!s3ux":1,"n!a!seux":1,"n!ac":1,"n!ak0u3":1,"n!ak0ue":1,"n!ak0ué":1,"n!akou3":1,"n!akoue":1,"n!akoué":1,"n!qu3":1,"n!qu3r":1,"n!que":1,"n!quer":1,"n@s3":1,"n@se":1,"n@z3":1,"n@ze":1,"n1@153ux":1,"n1@15eux":1,"n1@1s3ux":1,"n1@1seux":1,"n1@c":1,"n1@k0u3":1,"n1@k0ue":1,"n1@k0ué":1,"n1@kou3":1,"n1@koue":1,"n1@koué":1,n1a153ux:1,n1a15eux:1,n1a1s3ux:1,n1a1seux:1,n1ac:1,n1ak0u3:1,n1ak0ue:1,"n1ak0ué":1,n1akou3:1,n1akoue:1,"n1akoué":1,n1qu3:1,n1qu3r:1,n1que:1,n1quer:1,n3gr0:1,n3gro:1,nas3:1,nase:1,naz3:1,naze:1,negr0:1,"négr0":1,negro:1,"négro":1,"ni@c":1,"ni@i53ux":1,"ni@i5eux":1,"ni@is3ux":1,"ni@iseux":1,"ni@k0u3":1,"ni@k0ue":1,"ni@k0ué":1,"ni@kou3":1,"ni@koue":1,"ni@koué":1,niac:1,niai53ux:1,niai5eux:1,niais3ux:1,niaiseux:1,niak0u3:1,niak0ue:1,"niak0ué":1,niakou3:1,niakoue:1,"niakoué":1,niqu3:1,niqu3r:1,nique:1,niquer:1,NTM:1,"p!550u":1,"p!55ou":1,"p!gn0uf":1,"p!gnouf":1,"p!ss0u":1,"p!ssou":1,"p@k05":1,"p@k0s":1,"p@ko5":1,"p@kos":1,"p@n0ufl3":1,"p@n0ufle":1,"p@noufl3":1,"p@noufle":1,"p@t@r!n":1,"p@t@r1n":1,"p@t@rin":1,"p0rc@5":1,"p0rc@553":1,"p0rc@55e":1,"p0rc@s":1,"p0rc@ss3":1,"p0rc@sse":1,p0rca5:1,p0rca553:1,p0rca55e:1,p0rcas:1,p0rcass3:1,p0rcasse:1,"p0uc@v":1,p0ucav:1,p0uf:1,"p0uf!@553":1,"p0uf!@55e":1,"p0uf!@ss3":1,"p0uf!@sse":1,"p0uf!a553":1,"p0uf!a55e":1,"p0uf!ass3":1,"p0uf!asse":1,"p0uf1@553":1,"p0uf1@55e":1,"p0uf1@ss3":1,"p0uf1@sse":1,p0uf1a553:1,p0uf1a55e:1,p0uf1ass3:1,p0uf1asse:1,"p0uff!@553":1,"p0uff!@55e":1,"p0uff!@ss3":1,"p0uff!@sse":1,"p0uff!a553":1,"p0uff!a55e":1,"p0uff!ass3":1,"p0uff!asse":1,"p0uff1@553":1,"p0uff1@55e":1,"p0uff1@ss3":1,"p0uff1@sse":1,p0uff1a553:1,p0uff1a55e:1,p0uff1ass3:1,p0uff1asse:1,"p0uffi@553":1,"p0uffi@55e":1,"p0uffi@ss3":1,"p0uffi@sse":1,p0uffia553:1,p0uffia55e:1,p0uffiass3:1,p0uffiasse:1,"p0ufi@553":1,"p0ufi@55e":1,"p0ufi@ss3":1,"p0ufi@sse":1,p0ufia553:1,p0ufia55e:1,p0ufiass3:1,p0ufiasse:1,p0und3:1,p0unde:1,"p0undé":1,"p0urr!tur3":1,"p0urr!ture":1,p0urr1tur3:1,p0urr1ture:1,p0urritur3:1,p0urriture:1,p1550u:1,p155ou:1,p1gn0uf:1,p1gnouf:1,"p1mbêch3":1,"p1mbêche":1,p1ss0u:1,p1ss3ux:1,p1sseux:1,p1ssou:1,p3cqu3:1,"p3d@l3":1,p3d0qu3:1,p3d3:1,p3dal3:1,p3doqu3:1,"p3qu3n@ud":1,p3qu3naud:1,p3t:1,"p3t@553":1,"p3t@ss3":1,p3t3ux:1,p3ta553:1,p3tass3:1,pak05:1,pak0s:1,pako5:1,pakos:1,pan0ufl3:1,pan0ufle:1,panoufl3:1,panoufle:1,"patar!n":1,patar1n:1,patarin:1,PD:1,pecque:1,"ped@l3":1,"péd@l3":1,"ped@le":1,"péd@le":1,ped0qu3:1,"péd0qu3":1,ped0que:1,"péd0que":1,pedal3:1,"pédal3":1,pedale:1,"pédale":1,pede:1,"pédé":1,pedoqu3:1,"pédoqu3":1,pedoque:1,"pédoque":1,"pequ3n@ud":1,"péqu3n@ud":1,pequ3naud:1,"péqu3naud":1,"pequen@ud":1,"péquen@ud":1,pequenaud:1,"péquenaud":1,pet:1,"pét@553":1,"pet@55e":1,"pét@55e":1,"pet@ss3":1,"pét@ss3":1,"pet@sse":1,"pét@sse":1,peta553:1,"péta553":1,peta55e:1,"péta55e":1,petass3:1,"pétass3":1,petasse:1,"pétasse":1,peteux:1,"péteux":1,pi550u:1,pi55ou:1,pign0uf:1,pignouf:1,"pimbêch3":1,"pimbêche":1,piss0u:1,piss3ux:1,pisseux:1,pissou:1,pl0uc:1,pl3utr3:1,pleutre:1,plouc:1,"porc@5":1,"porc@553":1,"porc@55e":1,"porc@s":1,"porc@ss3":1,"porc@sse":1,porca5:1,porca553:1,porca55e:1,porcas:1,porcass3:1,porcasse:1,"pouc@v":1,poucav:1,pouf:1,"pouf!@553":1,"pouf!@55e":1,"pouf!@ss3":1,"pouf!@sse":1,"pouf!a553":1,"pouf!a55e":1,"pouf!ass3":1,"pouf!asse":1,"pouf1@553":1,"pouf1@55e":1,"pouf1@ss3":1,"pouf1@sse":1,pouf1a553:1,pouf1a55e:1,pouf1ass3:1,pouf1asse:1,"pouff!@553":1,"pouff!@55e":1,"pouff!@ss3":1,"pouff!@sse":1,"pouff!a553":1,"pouff!a55e":1,"pouff!ass3":1,"pouff!asse":1,"pouff1@553":1,"pouff1@55e":1,"pouff1@ss3":1,"pouff1@sse":1,pouff1a553:1,pouff1a55e:1,pouff1ass3:1,pouff1asse:1,"pouffi@553":1,"pouffi@55e":1,"pouffi@ss3":1,"pouffi@sse":1,pouffia553:1,pouffia55e:1,pouffiass3:1,pouffiasse:1,"poufi@553":1,"poufi@55e":1,"poufi@ss3":1,"poufi@sse":1,poufia553:1,poufia55e:1,poufiass3:1,poufiasse:1,pound3:1,pounde:1,"poundé":1,"pourr!tur3":1,"pourr!ture":1,pourr1tur3:1,pourr1ture:1,pourritur3:1,pourriture:1,"pun@!53":1,"pun@!5e":1,"pun@!s3":1,"pun@!se":1,"pun@153":1,"pun@15e":1,"pun@1s3":1,"pun@1se":1,"pun@i53":1,"pun@i5e":1,"pun@is3":1,"pun@ise":1,"puna!53":1,"puna!5e":1,"puna!s3":1,"puna!se":1,puna153:1,puna15e:1,puna1s3:1,puna1se:1,punai53:1,punai5e:1,punais3:1,punaise:1,"put!n":1,"put@!n":1,"put@1n":1,"put@in":1,put1n:1,put3:1,"puta!n":1,puta1n:1,putain:1,pute:1,putin:1,"qu3ut@rd":1,qu3utard:1,"queut@rd":1,queutard:1,"r!p0p33":1,"r!p0pe3":1,"r!p0pé3":1,"r!p0pee":1,"r!p0pée":1,"r!pop33":1,"r!pope3":1,"r!popé3":1,"r!popee":1,"r!popée":1,"r@clur3":1,"r@clure":1,"r@t0n":1,"r@ton":1,"r05b!f":1,r05b1f:1,r05bif:1,"r0b35p!3rr0t":1,r0b35p13rr0t:1,r0b35pi3rr0t:1,"r0b3sp!3rr0t":1,r0b3sp13rr0t:1,r0b3spi3rr0t:1,"r0be5p!err0t":1,r0be5p1err0t:1,r0be5pierr0t:1,"r0besp!err0t":1,r0besp1err0t:1,r0bespierr0t:1,"r0sb!f":1,r0sb1f:1,r0sbif:1,r0ulur3:1,r0ulure:1,r1p0p33:1,r1p0pe3:1,"r1p0pé3":1,r1p0pee:1,"r1p0pée":1,r1pop33:1,r1pope3:1,"r1popé3":1,r1popee:1,"r1popée":1,raclur3:1,raclure:1,rat0n:1,raton:1,rip0p33:1,rip0pe3:1,"rip0pé3":1,rip0pee:1,"rip0pée":1,ripop33:1,ripope3:1,"ripopé3":1,ripopee:1,"ripopée":1,"ro5b!f":1,ro5b1f:1,ro5bif:1,"rob35p!3rrot":1,rob35p13rrot:1,rob35pi3rrot:1,"rob3sp!3rrot":1,rob3sp13rrot:1,rob3spi3rrot:1,"robe5p!errot":1,robe5p1errot:1,robe5pierrot:1,"robesp!errot":1,robesp1errot:1,robespierrot:1,"rosb!f":1,rosb1f:1,rosbif:1,roulur3:1,roulure:1,"s@g0u!n":1,"s@g0u1n":1,"s@g0uin":1,"s@gou!n":1,"s@gou1n":1,"s@gouin":1,"s@l@ud":1,"s@l0p":1,"s@l0p@rd":1,"s@l0p3":1,"s@l0p3r13":1,"s@l0p3ri3":1,"s@l0pe":1,"s@l3":1,"s@le":1,"s@lop":1,"s@lop@rd":1,"s@lop3":1,"s@lop3ri3":1,"s@lope":1,"s@loperie":1,"s@tr0u!ll3":1,"s@tr0u!lle":1,"s@tr0u1ll3":1,"s@tr0u1lle":1,"s@tr0uill3":1,"s@tr0uille":1,"s@trou!ll3":1,"s@trou!lle":1,"s@trou1ll3":1,"s@trou1lle":1,"s@trouill3":1,"s@trouille":1,"s0tt!s3ux":1,"s0tt!seux":1,s0tt1s3ux:1,s0tt1seux:1,s0ttis3ux:1,s0ttiseux:1,"s0us-m3rd3":1,"s0us-merde":1,"s3nt-l@-p!ss3":1,"s3nt-l@-p1ss3":1,"s3nt-l@-piss3":1,"s3nt-la-p!ss3":1,"s3nt-la-p1ss3":1,"s3nt-la-piss3":1,"sag0u!n":1,sag0u1n:1,sag0uin:1,"sagou!n":1,sagou1n:1,sagouin:1,sal0p:1,sal0p3:1,sal0pard:1,sal0pe:1,sal0perie:1,sal3:1,salaud:1,sale:1,salop:1,salop3:1,salop3ri3:1,salopard:1,salope:1,saloper1e:1,saloperie:1,"satr0u!ll3":1,"satr0u!lle":1,satr0u1ll3:1,satr0u1lle:1,satr0uill3:1,satr0uille:1,"satrou!ll3":1,"satrou!lle":1,satrou1ll3:1,satrou1lle:1,satrouill3:1,satrouille:1,schb3b:1,schbeb:1,schl3u:1,schleu:1,schn0c:1,schn0ck:1,schn0qu3:1,schn0que:1,schnoc:1,schnock:1,schnoqu3:1,schnoque:1,"sent-l@-p!sse":1,"sent-l@-p1sse":1,"sent-l@-pisse":1,"sent-la-p!sse":1,"sent-la-p1sse":1,"sent-la-pisse":1,"sott!s3ux":1,"sott!seux":1,sott1s3ux:1,sott1seux:1,sottis3ux:1,sottiseux:1,"sous-m3rd3":1,"sous-merde":1,"st3@r!qu3":1,"st3@r1qu3":1,"st3@riqu3":1,"st3ar!qu3":1,st3ar1qu3:1,st3ariqu3:1,"ste@r!qu3":1,"sté@r!qu3":1,"ste@r!que":1,"sté@r!que":1,"ste@r1qu3":1,"sté@r1qu3":1,"ste@r1que":1,"sté@r1que":1,"ste@riqu3":1,"sté@riqu3":1,"ste@rique":1,"sté@rique":1,"stear!qu3":1,"stéar!qu3":1,"stear!que":1,"stéar!que":1,stear1qu3:1,"stéar1qu3":1,stear1que:1,"stéar1que":1,steariqu3:1,"stéariqu3":1,stearique:1,"stéarique":1,"t@f!0l3":1,"t@f!0le":1,"t@f!ol3":1,"t@f!ole":1,"t@f10l3":1,"t@f10le":1,"t@f1ol3":1,"t@f1ole":1,"t@fi0l3":1,"t@fi0le":1,"t@fiol3":1,"t@fiole":1,"t@nt0u53r!3":1,"t@nt0u53r13":1,"t@nt0u53ri3":1,"t@nt0u5er!e":1,"t@nt0u5er1e":1,"t@nt0u5erie":1,"t@nt0us3r!3":1,"t@nt0us3r13":1,"t@nt0us3ri3":1,"t@nt0user!e":1,"t@nt0user1e":1,"t@nt0userie":1,"t@nt0uz3":1,"t@nt0uze":1,"t@ntou53r!3":1,"t@ntou53r13":1,"t@ntou53ri3":1,"t@ntou5er!e":1,"t@ntou5er1e":1,"t@ntou5erie":1,"t@ntous3r!3":1,"t@ntous3r13":1,"t@ntous3ri3":1,"t@ntouser!e":1,"t@ntouser1e":1,"t@ntouserie":1,"t@ntouz3":1,"t@ntouze":1,"t@p3tt3":1,"t@pette":1,"t@rl0uz3":1,"t@rl0uze":1,"t@rlouz3":1,"t@rlouze":1,"t0c@rd":1,t0card:1,t3b3:1,t3be:1,"t3bé":1,t3t3ux:1,t3ub3:1,t3ube:1,"t3ubé":1,"taf!0l3":1,"taf!0le":1,"taf!ol3":1,"taf!ole":1,taf10l3:1,taf10le:1,taf1ol3:1,taf1ole:1,tafi0l3:1,tafi0le:1,tafiol3:1,tafiole:1,"tant0u53r!3":1,tant0u53r13:1,tant0u53ri3:1,"tant0u5er!e":1,tant0u5er1e:1,tant0u5erie:1,"tant0us3r!3":1,tant0us3r13:1,tant0us3ri3:1,"tant0user!e":1,tant0user1e:1,tant0userie:1,tant0uz3:1,tant0uze:1,"tantou53r!3":1,tantou53r13:1,tantou53ri3:1,"tantou5er!e":1,tantou5er1e:1,tantou5erie:1,"tantous3r!3":1,tantous3r13:1,tantous3ri3:1,"tantouser!e":1,tantouser1e:1,tantouserie:1,tantouz3:1,tantouze:1,tap3tt3:1,tapette:1,tarl0uz3:1,tarl0uze:1,tarlouz3:1,tarlouze:1,tebe:1,"tebé":1,tet3ux:1,"tét3ux":1,teteux:1,"téteux":1,teube:1,"teubé":1,"toc@rd":1,tocard:1,"tr@!n33":1,"tr@!nee":1,"tr@1n33":1,"tr@1nee":1,"tr@in33":1,"tr@în33":1,"tr@îne3":1,"tr@îné3":1,"tr@inee":1,"tr@înee":1,"tr@înée":1,tr0uduc:1,"tra!n33":1,"tra!nee":1,tra1n33:1,tra1nee:1,train33:1,"traîn33":1,"traîne3":1,"traîné3":1,trainee:1,"traînee":1,"traînée":1,trouduc:1,"tru!@553":1,"tru!@55e":1,"tru!@ss3":1,"tru!@sse":1,"tru!a553":1,"tru!a55e":1,"tru!ass3":1,"tru!asse":1,"tru1@553":1,"tru1@55e":1,"tru1@ss3":1,"tru1@sse":1,tru1a553:1,tru1a55e:1,tru1ass3:1,tru1asse:1,"trui@553":1,"trui@55e":1,"trui@ss3":1,"trui@sse":1,truia553:1,truia55e:1,truiass3:1,truiasse:1,"v!3d@53":1,"v!3d@s3":1,"v!3da53":1,"v!3das3":1,"v!3r":1,"v!d3-c0u!ll35":1,"v!d3-c0u!ll3s":1,"v!d3-cou!ll35":1,"v!d3-cou!ll3s":1,"v!de-c0u!lle5":1,"v!de-c0u!lles":1,"v!de-cou!lle5":1,"v!de-cou!lles":1,"v!éd@53":1,"v!ed@5e":1,"v!éd@5e":1,"v!ed@s3":1,"v!éd@s3":1,"v!ed@se":1,"v!éd@se":1,"v!eda53":1,"v!éda53":1,"v!eda5e":1,"v!éda5e":1,"v!edas3":1,"v!édas3":1,"v!edase":1,"v!édase":1,"v!er":1,"v@ur!3n":1,"v@ur!en":1,"v@ur13n":1,"v@ur1en":1,"v@uri3n":1,"v@urien":1,"v13d@53":1,"v13d@s3":1,v13da53:1,v13das3:1,v13r:1,"v1d3-c0u1ll35":1,"v1d3-c0u1ll3s":1,"v1d3-cou1ll35":1,"v1d3-cou1ll3s":1,"v1de-c0u1lle5":1,"v1de-c0u1lles":1,"v1de-cou1lle5":1,"v1de-cou1lles":1,"v1ed@53":1,"v1éd@53":1,"v1ed@5e":1,"v1éd@5e":1,"v1ed@s3":1,"v1éd@s3":1,"v1ed@se":1,"v1éd@se":1,v1eda53:1,"v1éda53":1,v1eda5e:1,"v1éda5e":1,v1edas3:1,"v1édas3":1,v1edase:1,"v1édase":1,v1er:1,"vaur!3n":1,"vaur!en":1,vaur13n:1,vaur1en:1,vauri3n:1,vaurien:1,"vi3d@53":1,"vi3d@s3":1,vi3da53:1,vi3das3:1,vi3r:1,"vid3-c0uill35":1,"vid3-c0uill3s":1,"vid3-couill35":1,"vid3-couill3s":1,"vide-c0uille5":1,"vide-c0uilles":1,"vide-couille5":1,"vide-couilles":1,"vied@53":1,"viéd@53":1,"vied@5e":1,"viéd@5e":1,"vied@s3":1,"viéd@s3":1,"vied@se":1,"viéd@se":1,vieda53:1,"viéda53":1,vieda5e:1,"viéda5e":1,viedas3:1,"viédas3":1,viedase:1,"viédase":1,vier:1,"x3r0p!n3ur":1,x3r0p1n3ur:1,x3r0pin3ur:1,"x3rop!n3ur":1,x3rop1n3ur:1,x3ropin3ur:1,"xer0p!n3ur":1,"xér0p!n3ur":1,"xer0p!neur":1,"xér0p!neur":1,xer0p1n3ur:1,"xér0p1n3ur":1,xer0p1neur:1,"xér0p1neur":1,xer0pin3ur:1,"xér0pin3ur":1,xer0pineur:1,"xér0pineur":1,"xerop!n3ur":1,"xérop!n3ur":1,"xerop!neur":1,"xérop!neur":1,xerop1n3ur:1,"xérop1n3ur":1,xerop1neur:1,"xérop1neur":1,xeropin3ur:1,"xéropin3ur":1,xeropineur:1,"xéropineur":1,y0ud:1,"y0up!n":1,"y0up!n!5@t!0n":1,"y0up!n!5at!0n":1,"y0up!n!s@t!0n":1,"y0up!n!sat!0n":1,"y0up!n3":1,"y0up!ne":1,y0up1n:1,"y0up1n15@t10n":1,y0up1n15at10n:1,"y0up1n1s@t10n":1,y0up1n1sat10n:1,y0up1n3:1,y0up1ne:1,y0upin:1,y0upin3:1,y0upine:1,"y0upini5@ti0n":1,y0upini5ati0n:1,"y0upinis@ti0n":1,y0upinisati0n:1,y0utr3:1,y0utre:1,y3ul3:1,yeule:1,youd:1,"youp!n":1,"youp!n!5@t!on":1,"youp!n!5at!on":1,"youp!n!s@t!on":1,"youp!n!sat!on":1,"youp!n3":1,"youp!ne":1,youp1n:1,"youp1n15@t1on":1,youp1n15at1on:1,"youp1n1s@t1on":1,youp1n1sat1on:1,youp1n3:1,youp1ne:1,youpin:1,youpin3:1,youpine:1,"youpini5@tion":1,youpini5ation:1,"youpinis@tion":1,youpinisation:1,youtr3:1,youtre:1,zgu3gu3:1,zguegu3:1,"zguègu3":1,zguegue:1,"zguègue":1};
  },{}],6:[function(require,module,exports){
  module.exports=/\b(!mb3c!l3|!mbec!l3|!mbéc!l3|!mbec!le|!mbéc!le|@brut!|@brut1|@bruti|@nd0u!ll3|@nd0u!lle|@nd0u1ll3|@nd0u1lle|@nd0uill3|@nd0uille|@ndou!ll3|@ndou!lle|@ndou1ll3|@ndou1lle|@ndouill3|@ndouille|@v0rt0n|@vorton|1mb3c1l3|1mbec1l3|1mbéc1l3|1mbec1le|1mbéc1le|35p!ng0!n|35p!ngo!n|35p1ng01n|35p1ngo1n|35ping0in|35pingoin|3mm@nch3|3mm@nche|3mm@nché|3mm3rd3r|3mm3rd3u53|3mm3rd3ur|3mm3rd3us3|3mmanch3|3mmanche|3mmanché|3mp@f3|3mp@fe|3mp@fé|3mp@p@0ut3|3mp@p@0ute|3mp@p@0uté|3mp@p@out3|3mp@p@oute|3mp@p@outé|3mpaf3|3mpafe|3mpafé|3mpapa0ut3|3mpapa0ute|3mpapa0uté|3mpapaout3|3mpapaoute|3mpapaouté|3ncul3|3ncul3r|3ncul3ur|3ncule|3nculé|3nf0!r3|3nf0!re|3nf0!ré|3nf01r3|3nf01re|3nf01ré|3nf0ir3|3nf0ire|3nf0iré|3nflur3|3nfo!r3|3nfo!re|3nfo!ré|3nfo1r3|3nfo1re|3nfo1ré|3nfoir3|3nfoire|3nfoiré|3nv@53l!n3ur|3nv@53l1n3ur|3nv@53lin3ur|3nv@s3l!n3ur|3nv@s3l1n3ur|3nv@s3lin3ur|3nva53l!n3ur|3nva53l1n3ur|3nva53lin3ur|3nvas3l!n3ur|3nvas3l1n3ur|3nvas3lin3ur|3p@!5|3p@!s|3p@15|3p@1s|3p@i5|3p@is|3pa!5|3pa!s|3pa15|3pa1s|3pai5|3pais|3sp!ng0!n|3sp!ngo!n|3sp1ng01n|3sp1ngo1n|3sping0in|3spingoin|3tr0n|3tron|5@g0u!n|5@g0u1n|5@g0uin|5@gou!n|5@gou1n|5@gouin|5@l@ud|5@l0p|5@l0p@rd|5@l0p3|5@l0pe|5@l3|5@le|5@lop|5@lop@rd|5@lop3|5@lope|5@tr0u!ll3|5@tr0u!lle|5@tr0u1ll3|5@tr0u1lle|5@tr0uill3|5@tr0uille|5@trou!ll3|5@trou!lle|5@trou1ll3|5@trou1lle|5@trouill3|5@trouille|50tt!53ux|50tt!5eux|50tt153ux|50tt15eux|50tti53ux|50tti5eux|50u5-m3rd3|50u5-merde|53nt-l@-p!553|53nt-l@-p1553|53nt-l@-pi553|53nt-la-p!553|53nt-la-p1553|53nt-la-pi553|5ag0u!n|5ag0u1n|5ag0uin|5agou!n|5agou1n|5agouin|5al0p|5al0p3|5al0pard|5al0pe|5al3|5alaud|5ale|5alop|5alop3|5alopard|5alope|5atr0u!ll3|5atr0u!lle|5atr0u1ll3|5atr0u1lle|5atr0uill3|5atr0uille|5atrou!ll3|5atrou!lle|5atrou1ll3|5atrou1lle|5atrouill3|5atrouille|5chb3b|5chbeb|5chl3u|5chleu|5chn0c|5chn0ck|5chn0qu3|5chn0que|5chnoc|5chnock|5chnoqu3|5chnoque|5ent-l@-p!55e|5ent-l@-p155e|5ent-l@-pi55e|5ent-la-p!55e|5ent-la-p155e|5ent-la-pi55e|5ott!53ux|5ott!5eux|5ott153ux|5ott15eux|5otti53ux|5otti5eux|5ou5-m3rd3|5ou5-merde|5t3@r!qu3|5t3@r1qu3|5t3@riqu3|5t3ar!qu3|5t3ar1qu3|5t3ariqu3|5té@r!qu3|5te@r!que|5té@r!que|5te@r1qu3|5té@r1qu3|5te@r1que|5té@r1que|5te@riqu3|5té@riqu3|5te@rique|5té@rique|5tear!qu3|5téar!qu3|5tear!que|5téar!que|5tear1qu3|5téar1qu3|5tear1que|5téar1que|5teariqu3|5téariqu3|5tearique|5téarique|abrut!|abrut1|abruti|and0u!ll3|and0u!lle|and0u1ll3|and0u1lle|and0uill3|and0uille|andou!ll3|andou!lle|andou1ll3|andou1lle|andouill3|andouille|av0rt0n|avorton|b!@tch|b!atch|b!c0t|b!cot|b!t3|b!t3mb0!5|b!t3mb0!s|b!t3mbo!5|b!t3mbo!s|b!te|b!temb0!5|b!temb0!s|b!tembo!5|b!tembo!s|b@t@rd|b0rd3l|b0rdel|b0uff0n|b0ugn0ul|B0ugn0ul!3|b0ugn0ul!5@t!0n|b0ugn0ul!53r|b0ugn0ul!5at!0n|b0ugn0ul!5er|B0ugn0ul!e|b0ugn0ul!s@t!0n|b0ugn0ul!s3r|b0ugn0ul!sat!0n|b0ugn0ul!ser|B0ugn0ul13|b0ugn0ul15@t10n|b0ugn0ul153r|b0ugn0ul15at10n|b0ugn0ul15er|B0ugn0ul1e|b0ugn0ul1s@t10n|b0ugn0ul1s3r|b0ugn0ul1sat10n|b0ugn0ul1ser|b0ugn0ul3|b0ugn0ule|B0ugn0uli3|b0ugn0uli5@ti0n|b0ugn0uli53r|b0ugn0uli5ati0n|b0ugn0uli5er|B0ugn0ulie|b0ugn0ulis@ti0n|b0ugn0ulis3r|b0ugn0ulisati0n|b0ugn0uliser|b0ugr3|b0ugre|b0uk@k|b0ukak|b0un!0ul|b0un10ul|b0uni0ul|b0urd!ll3|b0urd!lle|b0urd1ll3|b0urd1lle|b0urdill3|b0urdille|b0us3ux|b0useux|b1@tch|b1atch|b1c0t|b1cot|b1t3|b1t3mb015|b1t3mb01s|b1t3mbo15|b1t3mbo1s|b1te|b1temb015|b1temb01s|b1tembo15|b1tembo1s|b3@uf|b3auf|bât@rd|batard|bâtard|be@uf|beauf|bi@tch|biatch|bic0t|bicot|bit3|bit3mb0i5|bit3mb0is|bit3mboi5|bit3mbois|bite|bitemb0i5|bitemb0is|bitemboi5|bitembois|bord3l|bordel|bouffon|bougnoul|Bougnoul!3|bougnoul!5@t!on|bougnoul!53r|bougnoul!5at!on|bougnoul!5er|Bougnoul!e|bougnoul!s@t!on|bougnoul!s3r|bougnoul!sat!on|bougnoul!ser|Bougnoul13|bougnoul15@t1on|bougnoul153r|bougnoul15at1on|bougnoul15er|Bougnoul1e|bougnoul1s@t1on|bougnoul1s3r|bougnoul1sat1on|bougnoul1ser|bougnoul3|bougnoule|Bougnouli3|bougnouli5@tion|bougnouli53r|bougnouli5ation|bougnouli5er|Bougnoulie|bougnoulis@tion|bougnoulis3r|bougnoulisation|bougnouliser|bougr3|bougre|bouk@k|boukak|boun!oul|boun1oul|bounioul|bourd!ll3|bourd!lle|bourd1ll3|bourd1lle|bourdill3|bourdille|bous3ux|bouseux|br!53-burn35|br!5e-burne5|br!s3-burn3s|br!se-burnes|br@nl3r|br@nl3ur|br@nler|br@nleur|br@nqu3|br@nque|br153-burn35|br15e-burne5|br1s3-burn3s|br1se-burnes|branl3r|branl3ur|branler|branleur|branqu3|branque|bri53-burn35|bri5e-burne5|bris3-burn3s|brise-burnes|c@553-b0nb0n|c@553-bonbon|c@553-c0u!ll3|c@553-c0u!ll35|c@553-c0u1ll3|c@553-c0u1ll35|c@553-c0uill3|c@553-c0uill35|c@553-cou!ll3|c@553-cou!ll35|c@553-cou1ll3|c@553-cou1ll35|c@553-couill3|c@553-couill35|c@55e-b0nb0n|c@55e-bonbon|c@55e-c0u!lle|c@55e-c0u!lle5|c@55e-c0u1lle|c@55e-c0u1lle5|c@55e-c0uille|c@55e-c0uille5|c@55e-cou!lle|c@55e-cou!lle5|c@55e-cou1lle|c@55e-cou1lle5|c@55e-couille|c@55e-couille5|c@c0u|c@cou|c@fr3|c@fre|c@ld0ch3|c@ld0che|c@ldoch3|c@ldoche|c@ss3-b0nb0n|c@ss3-bonbon|c@ss3-c0u!ll3|c@ss3-c0u!ll3s|c@ss3-c0u1ll3|c@ss3-c0u1ll3s|c@ss3-c0uill3|c@ss3-c0uill3s|c@ss3-cou!ll3|c@ss3-cou!ll3s|c@ss3-cou1ll3|c@ss3-cou1ll3s|c@ss3-couill3|c@ss3-couill3s|c@sse-b0nb0n|c@sse-bonbon|c@sse-c0u!lle|c@sse-c0u!lles|c@sse-c0u1lle|c@sse-c0u1lles|c@sse-c0uille|c@sse-c0uilles|c@sse-cou!lle|c@sse-cou!lles|c@sse-cou1lle|c@sse-cou1lles|c@sse-couille|c@sse-couilles|c0ch3|c0che|c0n|c0n@553|c0n@55e|c0n@rd|c0n@ss3|c0n@sse|c0n5|c0na553|c0na55e|c0nard|c0nass3|c0nasse|c0nch!3r|c0nch!er|c0nch13r|c0nch1er|c0nchi3r|c0nchier|c0nn@553|c0nn@55e|c0nn@rd|c0nn@rd3|c0nn@rde|c0nn@ss3|c0nn@sse|c0nn3|c0nna553|c0nna55e|c0nnard|c0nnard3|c0nnarde|c0nnass3|c0nnasse|c0nne|c0ns|c0u1ll0n|c0u1ll0nn3r|c0u1ll3|c0u1ll3s|c0uill0n|c0uill0nn3r|c0uill0nner|c0uill3|c0uill3s|c0uille|c0uilles|c0un!fl3|c0un!fle|c0un1fl3|c0un1fle|c0unifl3|c0unifle|c0urt@ud|c0urtaud|ca553-b0nb0n|ca553-bonbon|ca553-c0u!ll3|ca553-c0u!ll35|ca553-c0u1ll3|ca553-c0u1ll35|ca553-c0uill3|ca553-c0uill35|ca553-cou!ll3|ca553-cou!ll35|ca553-cou1ll3|ca553-cou1ll35|ca553-couill3|ca553-couill35|ca55e-b0nb0n|ca55e-bonbon|ca55e-c0u!lle|ca55e-c0u!lle5|ca55e-c0u1lle|ca55e-c0u1lle5|ca55e-c0uille|ca55e-c0uille5|ca55e-cou!lle|ca55e-cou!lle5|ca55e-cou1lle|ca55e-cou1lle5|ca55e-couille|ca55e-couille5|cac0u|cacou|cafr3|cafre|cald0ch3|cald0che|caldoch3|caldoche|cass3-b0nb0n|cass3-bonbon|cass3-c0u!ll3|cass3-c0u!ll3s|cass3-c0u1ll3|cass3-c0u1ll3s|cass3-c0uill3|cass3-c0uill3s|cass3-cou!ll3|cass3-cou!ll3s|cass3-cou1ll3|cass3-cou1ll3s|cass3-couill3|cass3-couill3s|casse-b0nb0n|casse-bonbon|casse-c0u!lle|casse-c0u!lles|casse-c0u1lle|casse-c0u1lles|casse-c0uille|casse-c0uilles|casse-cou!lle|casse-cou!lles|casse-cou1lle|casse-cou1lles|casse-couille|casse-couilles|ch!3nn@553|ch!3nn@ss3|ch!3nna553|ch!3nnass3|ch!3r|ch!enn@55e|ch!enn@sse|ch!enna55e|ch!ennasse|ch!er|ch!n3t0c|ch!n3t0qu3|ch!n3toc|ch!n3toqu3|ch!net0c|ch!net0que|ch!netoc|ch!netoque|ch!nt0k|ch!ntok|ch@ch@r|ch@g@553|ch@g@55e|ch@g@ss3|ch@g@sse|ch@uff@rd|ch13nn@553|ch13nn@ss3|ch13nna553|ch13nnass3|ch13r|ch13ur|ch13urs|ch1enn@55e|ch1enn@sse|ch1enna55e|ch1ennasse|ch1er|ch1eur|ch1eurs|ch1n3t0c|ch1n3t0qu3|ch1n3toc|ch1n3toqu3|ch1net0c|ch1net0que|ch1netoc|ch1netoque|ch1nt0k|ch1ntok|chachar|chaga553|chaga55e|chagass3|chagasse|chauffard|chi3nn@553|chi3nn@ss3|chi3nna553|chi3nnass3|chi3r|chi3ur|chi3urs|chienn@55e|chienn@sse|chienna55e|chiennasse|chier|chieur|chieurs|chin3t0c|chin3t0qu3|chin3toc|chin3toqu3|chinet0c|chinet0que|chinetoc|chinetoque|chint0k|chintok|chl3uh|chleuh|chn0qu3|chn0que|chnoqu3|chnoque|coch3|coche|con|con@553|con@55e|con@rd|con@ss3|con@sse|con5|cona553|cona55e|conard|conass3|conasse|conch!3r|conch!er|conch13r|conch1er|conchi3r|conchier|conn@553|conn@55e|conn@rd|conn@rd3|conn@rde|conn@ss3|conn@sse|conn3|conna553|conna55e|connard|connard3|connarde|connass3|connasse|conne|cons|cou1lle|cou1lles|cou1llon|cou1llonner|couill3|couill3s|couille|couilles|couillon|couillonn3r|couillonner|coun!fl3|coun!fle|coun1fl3|coun1fle|counifl3|counifle|court@ud|courtaud|cr!cr!|cr0tt3|cr0tte|cr0tté|cr0u!ll@t|cr0u!ll3|cr0u!llat|cr0u!lle|cr0u1ll@t|cr0u1ll3|cr0u1llat|cr0u1lle|cr0uill@t|cr0uill3|cr0uillat|cr0uille|cr0ût0n|cr1cr1|cr3t!n|cr3t1n|cr3tin|cr3v@rd|cr3vard|cr3vur3|cret!n|crét!n|cret1n|crét1n|cretin|crétin|crev@rd|crevard|crevure|cricri|crott3|crotte|crotté|crou!ll@t|crou!ll3|crou!llat|crou!lle|crou1ll@t|crou1ll3|crou1llat|crou1lle|crouill@t|crouill3|crouillat|crouille|croûton|cul|d3b!l3|d3b1l3|d3bil3|d3gu3l@ss3|d3gu3lass3|d3m3rd3r|deb!l3|déb!l3|deb!le|déb!le|deb1l3|déb1l3|deb1le|déb1le|debil3|débil3|debile|débile|déguel@sse|deguelasse|déguelasse|demerder|démerder|dr0u!ll3|dr0u!lle|dr0u1ll3|dr0u1lle|dr0uill3|dr0uille|drou!ll3|drou!lle|drou1ll3|drou1lle|drouill3|drouille|du schn0c|du schnoc|du5chn0ck|du5chnock|duc0n|duc0nn0t|ducon|duconnot|dug3n0ux|dug3noux|dugen0ux|dugenoux|dugl@nd|dugland|duschn0ck|duschnock|e5p!ng0!n|e5p!ngo!n|e5p1ng01n|e5p1ngo1n|e5ping0in|e5pingoin|emm@nche|emm@nché|emmanche|emmanché|emmerder|emmerdeu5e|emmerdeur|emmerdeuse|emp@fe|emp@fé|emp@p@0ute|emp@p@0uté|emp@p@oute|emp@p@outé|empafe|empafé|empapa0ute|empapa0uté|empapaoute|empapaouté|encule|enculé|enculer|enculeur|enf0!re|enf0!ré|enf01re|enf01ré|enf0ire|enf0iré|enflure|enfo!re|enfo!ré|enfo1re|enfo1ré|enfoire|enfoiré|env@5el!neur|env@5el1neur|env@5elineur|env@sel!neur|env@sel1neur|env@selineur|enva5el!neur|enva5el1neur|enva5elineur|envasel!neur|envasel1neur|envaselineur|ep@!5|ép@!5|ep@!s|ép@!s|ep@15|ép@15|ep@1s|ép@1s|ep@i5|ép@i5|ep@is|ép@is|epa!5|épa!5|epa!s|épa!s|epa15|épa15|epa1s|épa1s|epai5|épai5|epais|épais|esp!ng0!n|esp!ngo!n|esp1ng01n|esp1ngo1n|esping0in|espingoin|etr0n|étr0n|etron|étron|f!0tt3|f!0tte|f!ott3|f!otte|f0ut3ur|f0uteur|f0utr3|f0utre|f10tt3|f10tte|f1ott3|f1otte|f31gn@ss3|f3ign@ss3|f3ignass3|FDP|fe1gnasse|feign@sse|feignasse|fi0tt3|fi0tte|fiott3|fiotte|fout3ur|fouteur|foutr3|foutre|fr!tz|fr1tz|fritz|fum!3r|fum!er|fum13r|fum1er|fumi3r|fumier|g@rc3|g@rce|g@up3|g@upe|G0d0n|g0g0l|g0ï|g0u!ll@nd|g0u!lland|g0u!n3|g0u!ne|g0u1ll@nd|g0u1lland|g0u1n3|g0u1ne|g0uill@nd|g0uilland|g0uin3|g0uine|g0urd3|g0urde|g0urg@nd!n3|g0urg@nd!ne|g0urg@nd1n3|g0urg@nd1ne|g0urg@ndin3|g0urg@ndine|g0urgand!n3|g0urgand!ne|g0urgand1n3|g0urgand1ne|g0urgandin3|g0urgandine|garc3|garce|gaup3|gaupe|GDM|gl@nd|gl@nd0u!ll0u|gl@nd0u1ll0u|gl@nd0uill0u|gl@nd3u53|gl@nd3ur|gl@nd3us3|gl@ndeu5e|gl@ndeur|gl@ndeuse|gl@ndou!llou|gl@ndou1llou|gl@ndouillou|gl@ndu|gland|gland0u!ll0u|gland0u1ll0u|gland0uill0u|gland3u53|gland3ur|gland3us3|glandeu5e|glandeur|glandeuse|glandou!llou|glandou1llou|glandouillou|glandu|gn0ul|gn0ul3|gn0ule|gnoul|gnoul3|gnoule|Godon|gogol|goï|gou!ll@nd|gou!lland|gou!n3|gou!ne|gou1ll@nd|gou1lland|gou1n3|gou1ne|gouill@nd|gouilland|gouin3|gouine|gourd3|gourde|gourg@nd!n3|gourg@nd!ne|gourg@nd1n3|gourg@nd1ne|gourg@ndin3|gourg@ndine|gourgand!n3|gourgand!ne|gourgand1n3|gourgand1ne|gourgandin3|gourgandine|gr0gn@553|gr0gn@55e|gr0gn@ss3|gr0gn@sse|gr0gna553|gr0gna55e|gr0gnass3|gr0gnasse|grogn@553|grogn@55e|grogn@ss3|grogn@sse|grogna553|grogna55e|grognass3|grognasse|gu!nd0ul3|gu!nd0ule|gu!ndoul3|gu!ndoule|gu1nd0ul3|gu1nd0ule|gu1ndoul3|gu1ndoule|gu3n!ch3|gu3n1ch3|gu3nich3|guen!che|guen1che|gueniche|guind0ul3|guind0ule|guindoul3|guindoule|imb3cil3|imbecil3|imbécil3|imbecile|imbécile|j3@n-f0utr3|j3@n-foutr3|j3an-f0utr3|j3an-foutr3|je@n-f0utre|je@n-foutre|jean-f0utre|jean-foutre|k!k00|k!k0u|k!koo|k!kou|k1k00|k1k0u|k1koo|k1kou|kik00|kik0u|kikoo|kikou|Kr@ut|Kraut|l@ch3ux|l@cheux|l@v3tt3|l@vette|l0p3tt3|l0pette|lach3ux|lâch3ux|lacheux|lâcheux|lav3tt3|lavette|lop3tt3|lopette|m!53r@bl3|m!53rabl3|m!5ér@bl3|m!5er@ble|m!5ér@ble|m!5erabl3|m!5érabl3|m!5erable|m!5érable|m!cht0|m!chto|m!n@bl3|m!n@ble|m!nabl3|m!nable|m!nu5|m!nus|m!s3r@bl3|m!s3rabl3|m!ser@bl3|m!sér@bl3|m!ser@ble|m!sér@ble|m!serabl3|m!sérabl3|m!serable|m!sérable|m@g0t|m@got|m@k0um3|m@k0ume|m@k0umé|m@koum3|m@koume|m@koumé|m@nch3|m@nche|m@ng3-m3rd3|m@nge-merde|m@rch@nd0t|m@rch@ndot|m@rg0u!ll!5t3|m@rg0u!ll!5te|m@rg0u!ll!st3|m@rg0u!ll!ste|m@rg0u1ll15t3|m@rg0u1ll15te|m@rg0u1ll1st3|m@rg0u1ll1ste|m@rg0uilli5t3|m@rg0uilli5te|m@rg0uillist3|m@rg0uilliste|m@rgou!ll!5t3|m@rgou!ll!5te|m@rgou!ll!st3|m@rgou!ll!ste|m@rgou1ll15t3|m@rgou1ll15te|m@rgou1ll1st3|m@rgou1ll1ste|m@rgouilli5t3|m@rgouilli5te|m@rgouillist3|m@rgouilliste|m@uv!3tt3|m@uv!ette|m@uv13tt3|m@uv1ette|m@uvi3tt3|m@uviette|m0!n@!ll3|m0!n@!lle|m0!n5-qu3-r!3n|m0!n5-que-r!en|m0!na!ll3|m0!na!lle|m0!ns-qu3-r!3n|m0!ns-que-r!en|m01n@1ll3|m01n@1lle|m01n5-qu3-r13n|m01n5-que-r1en|m01na1ll3|m01na1lle|m01ns-qu3-r13n|m01ns-que-r1en|m0in@ill3|m0in@ille|m0in5-qu3-ri3n|m0in5-que-rien|m0inaill3|m0inaille|m0ins-qu3-ri3n|m0ins-que-rien|m0n@c@!ll3|m0n@c@!lle|m0n@c@1ll3|m0n@c@1lle|m0n@c@ill3|m0n@c@ille|m0naca!ll3|m0naca!lle|m0naca1ll3|m0naca1lle|m0nacaill3|m0nacaille|m0r!c@ud|m0r!caud|m0r1c@ud|m0r1caud|m0ric@ud|m0ricaud|m153r@bl3|m153rabl3|m15er@bl3|m15ér@bl3|m15er@ble|m15ér@ble|m15erabl3|m15érabl3|m15erable|m15érable|m1cht0|m1chto|m1n@bl3|m1n@ble|m1nabl3|m1nable|m1nu5|m1nus|m1s3r@bl3|m1s3rabl3|m1ser@bl3|m1sér@bl3|m1ser@ble|m1sér@ble|m1serabl3|m1sérabl3|m1serable|m1sérable|m3rd@!ll0n|m3rd@!ll3|m3rd@!llon|m3rd@1ll0n|m3rd@1ll3|m3rd@1llon|m3rd@ill0n|m3rd@ill3|m3rd@illon|m3rd0u!ll@rd|m3rd0u!llard|m3rd0u1ll@rd|m3rd0u1llard|m3rd0uill@rd|m3rd0uillard|m3rd3|m3rd3ux|m3rda!ll0n|m3rda!ll3|m3rda!llon|m3rda1ll0n|m3rda1ll3|m3rda1llon|m3rdaill0n|m3rdaill3|m3rdaillon|m3rdou!ll@rd|m3rdou!llard|m3rdou1ll@rd|m3rdou1llard|m3rdouill@rd|m3rdouillard|mag0t|magot|mak0um3|mak0ume|mak0umé|makoum3|makoume|makoumé|manch3|manche|mang3-m3rd3|mange-merde|marchand0t|marchandot|marg0u!ll!5t3|marg0u!ll!5te|marg0u!ll!st3|marg0u!ll!ste|marg0u1ll15t3|marg0u1ll15te|marg0u1ll1st3|marg0u1ll1ste|marg0uilli5t3|marg0uilli5te|marg0uillist3|marg0uilliste|margou!ll!5t3|margou!ll!5te|margou!ll!st3|margou!ll!ste|margou1ll15t3|margou1ll15te|margou1ll1st3|margou1ll1ste|margouilli5t3|margouilli5te|margouillist3|margouilliste|mauv!3tt3|mauv!ette|mauv13tt3|mauv1ette|mauvi3tt3|mauviette|merd@!ll0n|merd@!lle|merd@!llon|merd@1ll0n|merd@1lle|merd@1llon|merd@ill0n|merd@ille|merd@illon|merd0u!ll@rd|merd0u!llard|merd0u1ll@rd|merd0u1llard|merd0uill@rd|merd0uillard|merda!ll0n|merda!lle|merda!llon|merda1ll0n|merda1lle|merda1llon|merdaill0n|merdaille|merdaillon|merde|merdeux|merdou!ll@rd|merdou!llard|merdou1ll@rd|merdou1llard|merdouill@rd|merdouillard|mi53r@bl3|mi53rabl3|mi5er@bl3|mi5ér@bl3|mi5er@ble|mi5ér@ble|mi5erabl3|mi5érabl3|mi5erable|mi5érable|micht0|michto|min@bl3|min@ble|minabl3|minable|minu5|minus|mis3r@bl3|mis3rabl3|miser@bl3|misér@bl3|miser@ble|misér@ble|miserabl3|misérabl3|miserable|misérable|mo!n@!ll3|mo!n@!lle|mo!n5-qu3-r!3n|mo!n5-que-r!en|mo!na!ll3|mo!na!lle|mo!ns-qu3-r!3n|mo!ns-que-r!en|mo1n@1ll3|mo1n@1lle|mo1n5-qu3-r13n|mo1n5-que-r1en|mo1na1ll3|mo1na1lle|mo1ns-qu3-r13n|mo1ns-que-r1en|moin@ill3|moin@ille|moin5-qu3-ri3n|moin5-que-rien|moinaill3|moinaille|moins-qu3-ri3n|moins-que-rien|mon@c@!ll3|mon@c@!lle|mon@c@1ll3|mon@c@1lle|mon@c@ill3|mon@c@ille|monaca!ll3|monaca!lle|monaca1ll3|monaca1lle|monacaill3|monacaille|mor!c@ud|mor!caud|mor1c@ud|mor1caud|moric@ud|moricaud|n!@!53ux|n!@!5eux|n!@!s3ux|n!@!seux|n!@c|n!@k0u3|n!@k0ue|n!@k0ué|n!@kou3|n!@koue|n!@koué|n!a!53ux|n!a!5eux|n!a!s3ux|n!a!seux|n!ac|n!ak0u3|n!ak0ue|n!ak0ué|n!akou3|n!akoue|n!akoué|n!qu3|n!qu3r|n!que|n!quer|n@s3|n@se|n@z3|n@ze|n1@153ux|n1@15eux|n1@1s3ux|n1@1seux|n1@c|n1@k0u3|n1@k0ue|n1@k0ué|n1@kou3|n1@koue|n1@koué|n1a153ux|n1a15eux|n1a1s3ux|n1a1seux|n1ac|n1ak0u3|n1ak0ue|n1ak0ué|n1akou3|n1akoue|n1akoué|n1qu3|n1qu3r|n1que|n1quer|n3gr0|n3gro|nas3|nase|naz3|naze|negr0|négr0|negro|négro|ni@c|ni@i53ux|ni@i5eux|ni@is3ux|ni@iseux|ni@k0u3|ni@k0ue|ni@k0ué|ni@kou3|ni@koue|ni@koué|niac|niai53ux|niai5eux|niais3ux|niaiseux|niak0u3|niak0ue|niak0ué|niakou3|niakoue|niakoué|niqu3|niqu3r|nique|niquer|NTM|p!550u|p!55ou|p!gn0uf|p!gnouf|p!ss0u|p!ssou|p@k05|p@k0s|p@ko5|p@kos|p@n0ufl3|p@n0ufle|p@noufl3|p@noufle|p@t@r!n|p@t@r1n|p@t@rin|p0rc@5|p0rc@553|p0rc@55e|p0rc@s|p0rc@ss3|p0rc@sse|p0rca5|p0rca553|p0rca55e|p0rcas|p0rcass3|p0rcasse|p0uc@v|p0ucav|p0uf|p0uf!@553|p0uf!@55e|p0uf!@ss3|p0uf!@sse|p0uf!a553|p0uf!a55e|p0uf!ass3|p0uf!asse|p0uf1@553|p0uf1@55e|p0uf1@ss3|p0uf1@sse|p0uf1a553|p0uf1a55e|p0uf1ass3|p0uf1asse|p0uff!@553|p0uff!@55e|p0uff!@ss3|p0uff!@sse|p0uff!a553|p0uff!a55e|p0uff!ass3|p0uff!asse|p0uff1@553|p0uff1@55e|p0uff1@ss3|p0uff1@sse|p0uff1a553|p0uff1a55e|p0uff1ass3|p0uff1asse|p0uffi@553|p0uffi@55e|p0uffi@ss3|p0uffi@sse|p0uffia553|p0uffia55e|p0uffiass3|p0uffiasse|p0ufi@553|p0ufi@55e|p0ufi@ss3|p0ufi@sse|p0ufia553|p0ufia55e|p0ufiass3|p0ufiasse|p0und3|p0unde|p0undé|p0urr!tur3|p0urr!ture|p0urr1tur3|p0urr1ture|p0urritur3|p0urriture|p1550u|p155ou|p1gn0uf|p1gnouf|p1mbêch3|p1mbêche|p1ss0u|p1ss3ux|p1sseux|p1ssou|p3cqu3|p3d@l3|p3d0qu3|p3d3|p3dal3|p3doqu3|p3qu3n@ud|p3qu3naud|p3t|p3t@553|p3t@ss3|p3t3ux|p3ta553|p3tass3|pak05|pak0s|pako5|pakos|pan0ufl3|pan0ufle|panoufl3|panoufle|patar!n|patar1n|patarin|PD|pecque|ped@l3|péd@l3|ped@le|péd@le|ped0qu3|péd0qu3|ped0que|péd0que|pedal3|pédal3|pedale|pédale|pede|pédé|pedoqu3|pédoqu3|pedoque|pédoque|pequ3n@ud|péqu3n@ud|pequ3naud|péqu3naud|pequen@ud|péquen@ud|pequenaud|péquenaud|pet|pét@553|pet@55e|pét@55e|pet@ss3|pét@ss3|pet@sse|pét@sse|peta553|péta553|peta55e|péta55e|petass3|pétass3|petasse|pétasse|peteux|péteux|pi550u|pi55ou|pign0uf|pignouf|pimbêch3|pimbêche|piss0u|piss3ux|pisseux|pissou|pl0uc|pl3utr3|pleutre|plouc|porc@5|porc@553|porc@55e|porc@s|porc@ss3|porc@sse|porca5|porca553|porca55e|porcas|porcass3|porcasse|pouc@v|poucav|pouf|pouf!@553|pouf!@55e|pouf!@ss3|pouf!@sse|pouf!a553|pouf!a55e|pouf!ass3|pouf!asse|pouf1@553|pouf1@55e|pouf1@ss3|pouf1@sse|pouf1a553|pouf1a55e|pouf1ass3|pouf1asse|pouff!@553|pouff!@55e|pouff!@ss3|pouff!@sse|pouff!a553|pouff!a55e|pouff!ass3|pouff!asse|pouff1@553|pouff1@55e|pouff1@ss3|pouff1@sse|pouff1a553|pouff1a55e|pouff1ass3|pouff1asse|pouffi@553|pouffi@55e|pouffi@ss3|pouffi@sse|pouffia553|pouffia55e|pouffiass3|pouffiasse|poufi@553|poufi@55e|poufi@ss3|poufi@sse|poufia553|poufia55e|poufiass3|poufiasse|pound3|pounde|poundé|pourr!tur3|pourr!ture|pourr1tur3|pourr1ture|pourritur3|pourriture|pun@!53|pun@!5e|pun@!s3|pun@!se|pun@153|pun@15e|pun@1s3|pun@1se|pun@i53|pun@i5e|pun@is3|pun@ise|puna!53|puna!5e|puna!s3|puna!se|puna153|puna15e|puna1s3|puna1se|punai53|punai5e|punais3|punaise|put!n|put@!n|put@1n|put@in|put1n|put3|puta!n|puta1n|putain|pute|putin|qu3ut@rd|qu3utard|queut@rd|queutard|r!p0p33|r!p0pe3|r!p0pé3|r!p0pee|r!p0pée|r!pop33|r!pope3|r!popé3|r!popee|r!popée|r@clur3|r@clure|r@t0n|r@ton|r05b!f|r05b1f|r05bif|r0b35p!3rr0t|r0b35p13rr0t|r0b35pi3rr0t|r0b3sp!3rr0t|r0b3sp13rr0t|r0b3spi3rr0t|r0be5p!err0t|r0be5p1err0t|r0be5pierr0t|r0besp!err0t|r0besp1err0t|r0bespierr0t|r0sb!f|r0sb1f|r0sbif|r0ulur3|r0ulure|r1p0p33|r1p0pe3|r1p0pé3|r1p0pee|r1p0pée|r1pop33|r1pope3|r1popé3|r1popee|r1popée|raclur3|raclure|rat0n|raton|rip0p33|rip0pe3|rip0pé3|rip0pee|rip0pée|ripop33|ripope3|ripopé3|ripopee|ripopée|ro5b!f|ro5b1f|ro5bif|rob35p!3rrot|rob35p13rrot|rob35pi3rrot|rob3sp!3rrot|rob3sp13rrot|rob3spi3rrot|robe5p!errot|robe5p1errot|robe5pierrot|robesp!errot|robesp1errot|robespierrot|rosb!f|rosb1f|rosbif|roulur3|roulure|s@g0u!n|s@g0u1n|s@g0uin|s@gou!n|s@gou1n|s@gouin|s@l@ud|s@l0p|s@l0p@rd|s@l0p3|s@l0p3r13|s@l0p3ri3|s@l0pe|s@l3|s@le|s@lop|s@lop@rd|s@lop3|s@lop3ri3|s@lope|s@loperie|s@tr0u!ll3|s@tr0u!lle|s@tr0u1ll3|s@tr0u1lle|s@tr0uill3|s@tr0uille|s@trou!ll3|s@trou!lle|s@trou1ll3|s@trou1lle|s@trouill3|s@trouille|s0tt!s3ux|s0tt!seux|s0tt1s3ux|s0tt1seux|s0ttis3ux|s0ttiseux|s0us-m3rd3|s0us-merde|s3nt-l@-p!ss3|s3nt-l@-p1ss3|s3nt-l@-piss3|s3nt-la-p!ss3|s3nt-la-p1ss3|s3nt-la-piss3|sag0u!n|sag0u1n|sag0uin|sagou!n|sagou1n|sagouin|sal0p|sal0p3|sal0pard|sal0pe|sal0perie|sal3|salaud|sale|salop|salop3|salop3ri3|salopard|salope|saloper1e|saloperie|satr0u!ll3|satr0u!lle|satr0u1ll3|satr0u1lle|satr0uill3|satr0uille|satrou!ll3|satrou!lle|satrou1ll3|satrou1lle|satrouill3|satrouille|schb3b|schbeb|schl3u|schleu|schn0c|schn0ck|schn0qu3|schn0que|schnoc|schnock|schnoqu3|schnoque|sent-l@-p!sse|sent-l@-p1sse|sent-l@-pisse|sent-la-p!sse|sent-la-p1sse|sent-la-pisse|sott!s3ux|sott!seux|sott1s3ux|sott1seux|sottis3ux|sottiseux|sous-m3rd3|sous-merde|st3@r!qu3|st3@r1qu3|st3@riqu3|st3ar!qu3|st3ar1qu3|st3ariqu3|ste@r!qu3|sté@r!qu3|ste@r!que|sté@r!que|ste@r1qu3|sté@r1qu3|ste@r1que|sté@r1que|ste@riqu3|sté@riqu3|ste@rique|sté@rique|stear!qu3|stéar!qu3|stear!que|stéar!que|stear1qu3|stéar1qu3|stear1que|stéar1que|steariqu3|stéariqu3|stearique|stéarique|t@f!0l3|t@f!0le|t@f!ol3|t@f!ole|t@f10l3|t@f10le|t@f1ol3|t@f1ole|t@fi0l3|t@fi0le|t@fiol3|t@fiole|t@nt0u53r!3|t@nt0u53r13|t@nt0u53ri3|t@nt0u5er!e|t@nt0u5er1e|t@nt0u5erie|t@nt0us3r!3|t@nt0us3r13|t@nt0us3ri3|t@nt0user!e|t@nt0user1e|t@nt0userie|t@nt0uz3|t@nt0uze|t@ntou53r!3|t@ntou53r13|t@ntou53ri3|t@ntou5er!e|t@ntou5er1e|t@ntou5erie|t@ntous3r!3|t@ntous3r13|t@ntous3ri3|t@ntouser!e|t@ntouser1e|t@ntouserie|t@ntouz3|t@ntouze|t@p3tt3|t@pette|t@rl0uz3|t@rl0uze|t@rlouz3|t@rlouze|t0c@rd|t0card|t3b3|t3be|t3bé|t3t3ux|t3ub3|t3ube|t3ubé|taf!0l3|taf!0le|taf!ol3|taf!ole|taf10l3|taf10le|taf1ol3|taf1ole|tafi0l3|tafi0le|tafiol3|tafiole|tant0u53r!3|tant0u53r13|tant0u53ri3|tant0u5er!e|tant0u5er1e|tant0u5erie|tant0us3r!3|tant0us3r13|tant0us3ri3|tant0user!e|tant0user1e|tant0userie|tant0uz3|tant0uze|tantou53r!3|tantou53r13|tantou53ri3|tantou5er!e|tantou5er1e|tantou5erie|tantous3r!3|tantous3r13|tantous3ri3|tantouser!e|tantouser1e|tantouserie|tantouz3|tantouze|tap3tt3|tapette|tarl0uz3|tarl0uze|tarlouz3|tarlouze|tebe|tebé|tet3ux|tét3ux|teteux|téteux|teube|teubé|toc@rd|tocard|tr@!n33|tr@!nee|tr@1n33|tr@1nee|tr@in33|tr@în33|tr@îne3|tr@îné3|tr@inee|tr@înee|tr@înée|tr0uduc|tra!n33|tra!nee|tra1n33|tra1nee|train33|traîn33|traîne3|traîné3|trainee|traînee|traînée|trouduc|tru!@553|tru!@55e|tru!@ss3|tru!@sse|tru!a553|tru!a55e|tru!ass3|tru!asse|tru1@553|tru1@55e|tru1@ss3|tru1@sse|tru1a553|tru1a55e|tru1ass3|tru1asse|trui@553|trui@55e|trui@ss3|trui@sse|truia553|truia55e|truiass3|truiasse|v!3d@53|v!3d@s3|v!3da53|v!3das3|v!3r|v!d3-c0u!ll35|v!d3-c0u!ll3s|v!d3-cou!ll35|v!d3-cou!ll3s|v!de-c0u!lle5|v!de-c0u!lles|v!de-cou!lle5|v!de-cou!lles|v!éd@53|v!ed@5e|v!éd@5e|v!ed@s3|v!éd@s3|v!ed@se|v!éd@se|v!eda53|v!éda53|v!eda5e|v!éda5e|v!edas3|v!édas3|v!edase|v!édase|v!er|v@ur!3n|v@ur!en|v@ur13n|v@ur1en|v@uri3n|v@urien|v13d@53|v13d@s3|v13da53|v13das3|v13r|v1d3-c0u1ll35|v1d3-c0u1ll3s|v1d3-cou1ll35|v1d3-cou1ll3s|v1de-c0u1lle5|v1de-c0u1lles|v1de-cou1lle5|v1de-cou1lles|v1ed@53|v1éd@53|v1ed@5e|v1éd@5e|v1ed@s3|v1éd@s3|v1ed@se|v1éd@se|v1eda53|v1éda53|v1eda5e|v1éda5e|v1edas3|v1édas3|v1edase|v1édase|v1er|vaur!3n|vaur!en|vaur13n|vaur1en|vauri3n|vaurien|vi3d@53|vi3d@s3|vi3da53|vi3das3|vi3r|vid3-c0uill35|vid3-c0uill3s|vid3-couill35|vid3-couill3s|vide-c0uille5|vide-c0uilles|vide-couille5|vide-couilles|vied@53|viéd@53|vied@5e|viéd@5e|vied@s3|viéd@s3|vied@se|viéd@se|vieda53|viéda53|vieda5e|viéda5e|viedas3|viédas3|viedase|viédase|vier|x3r0p!n3ur|x3r0p1n3ur|x3r0pin3ur|x3rop!n3ur|x3rop1n3ur|x3ropin3ur|xer0p!n3ur|xér0p!n3ur|xer0p!neur|xér0p!neur|xer0p1n3ur|xér0p1n3ur|xer0p1neur|xér0p1neur|xer0pin3ur|xér0pin3ur|xer0pineur|xér0pineur|xerop!n3ur|xérop!n3ur|xerop!neur|xérop!neur|xerop1n3ur|xérop1n3ur|xerop1neur|xérop1neur|xeropin3ur|xéropin3ur|xeropineur|xéropineur|y0ud|y0up!n|y0up!n!5@t!0n|y0up!n!5at!0n|y0up!n!s@t!0n|y0up!n!sat!0n|y0up!n3|y0up!ne|y0up1n|y0up1n15@t10n|y0up1n15at10n|y0up1n1s@t10n|y0up1n1sat10n|y0up1n3|y0up1ne|y0upin|y0upin3|y0upine|y0upini5@ti0n|y0upini5ati0n|y0upinis@ti0n|y0upinisati0n|y0utr3|y0utre|y3ul3|yeule|youd|youp!n|youp!n!5@t!on|youp!n!5at!on|youp!n!s@t!on|youp!n!sat!on|youp!n3|youp!ne|youp1n|youp1n15@t1on|youp1n15at1on|youp1n1s@t1on|youp1n1sat1on|youp1n3|youp1ne|youpin|youpin3|youpine|youpini5@tion|youpini5ation|youpinis@tion|youpinisation|youtr3|youtre|zgu3gu3|zguegu3|zguègu3|zguegue|zguègue)\b/gi;
  },{}],7:[function(require,module,exports){
  (function (process){(function (){
  
  'use strict'
  
  if (process.env.NODE_ENV === 'production') {
    module.exports = require('./russian-bad-words.cjs.production.min.js')
  } else {
    module.exports = require('./russian-bad-words.cjs.development.js')
  }
  
  }).call(this)}).call(this,require('_process'))
  },{"./russian-bad-words.cjs.development.js":8,"./russian-bad-words.cjs.production.min.js":9,"_process":1}],8:[function(require,module,exports){
  'use strict';
  
  Object.defineProperty(exports, '__esModule', { value: true });
  
  var нахуй = {
    type: 'non qualifying adverb',
    adverb: 'нахуй'
  };
  
  var хуёво = {
    type: 'qualifying adverb',
    adverb: 'хуёво',
    comparative: 'хуёвее',
    superlative: 'хуёвейше'
  };
  
  var нах = {
    type: 'non qualifying adverb',
    adverb: 'нах'
  };
  
  var заебись = {
    type: 'non qualifying adverb',
    adverb: 'заебись'
  };
  
  var охуенно = {
    type: 'qualifying adverb',
    adverb: 'охуенно',
    comparative: 'охуеннее',
    superlative: 'охуенней'
  };
  
  var adverbs = [заебись, нах, нахуй, охуенно, хуёво];
  
  var ёба = {
    type: 'interjection',
    interjection: 'ёба'
  };
  
  var бля = {
    type: 'interjection',
    interjection: 'бля'
  };
  
  var блять = {
    type: 'interjection',
    interjection: 'блять'
  };
  
  var ёпт = {
    type: 'interjection',
    interjection: 'ёпт'
  };
  
  var interjections = [бля, блять, ёба, ёпт];
  
  var блядь = {
    type: 'noun',
    nominativeSingular: 'блядь',
    genitiveSingular: 'бляди',
    dativeSingular: 'бляди',
    accusativeSingular: 'блядь',
    instrumentalSingular: 'блядью',
    prepositionalSingular: 'бляди',
    nominativePlural: 'бляди',
    genitivePlural: 'блядей',
    dativePlural: 'блядям',
    accusativePlural: 'блядей',
    instrumentalPlural: 'блядями',
    prepositionalPlural: 'блядях'
  };
  
  var пизда = {
    type: 'noun',
    nominativeSingular: 'пизда',
    genitiveSingular: 'пизды',
    dativeSingular: 'пизде',
    accusativeSingular: 'пизду',
    instrumentalSingular: 'пиздой',
    prepositionalSingular: 'пизде',
    nominativePlural: 'пизды',
    genitivePlural: 'пизд',
    dativePlural: 'пиздам',
    accusativePlural: 'пизды',
    instrumentalPlural: 'пиздами',
    prepositionalPlural: 'пиздах'
  };
  
  var пиздец = {
    type: 'noun',
    nominativeSingular: 'пиздец',
    genitiveSingular: 'пиздеца',
    dativeSingular: 'пиздецу',
    accusativeSingular: 'пиздец',
    instrumentalSingular: 'пиздецом',
    prepositionalSingular: 'пиздеце',
    nominativePlural: 'пиздецы',
    genitivePlural: 'пиздецов',
    dativePlural: 'пиздецам',
    accusativePlural: 'пиздецы',
    instrumentalPlural: 'пиздецами',
    prepositionalPlural: 'пиздецах'
  };
  
  var сука = {
    type: 'noun',
    nominativeSingular: 'сука',
    genitiveSingular: 'суки',
    dativeSingular: 'суке',
    accusativeSingular: 'суку',
    instrumentalSingular: 'сукой',
    prepositionalSingular: 'суке',
    nominativePlural: 'суки',
    genitivePlural: 'сук',
    dativePlural: 'сукам',
    accusativePlural: 'сук',
    instrumentalPlural: 'суками',
    prepositionalPlural: 'суках'
  };
  
  var хуй = {
    type: 'noun',
    nominativeSingular: 'хуй',
    genitiveSingular: 'хуя',
    dativeSingular: 'хую',
    accusativeSingular: 'хуй',
    instrumentalSingular: 'хуём',
    prepositionalSingular: 'хуе',
    nominativePlural: 'хуи',
    genitivePlural: 'хуёв',
    dativePlural: 'хуям',
    accusativePlural: 'хуи',
    instrumentalPlural: 'хуями',
    prepositionalPlural: 'хуях'
  };
  
  var долбоёб = {
    type: 'noun',
    nominativeSingular: 'долбоёб',
    genitiveSingular: 'долбоёба',
    dativeSingular: 'долбоёбу',
    accusativeSingular: 'долбоёба',
    instrumentalSingular: 'долбоёбом',
    prepositionalSingular: 'долбоёбе',
    nominativePlural: 'долбоёбы',
    genitivePlural: 'долбоёбов',
    dativePlural: 'долбоёбам',
    accusativePlural: 'долбоёбов',
    instrumentalPlural: 'долбоёбами',
    prepositionalPlural: 'долбоёбах'
  };
  
  var наебалово = {
    type: 'singular noun',
    nominativeSingular: 'наебалово',
    genitiveSingular: 'наебалова',
    dativeSingular: 'наебалову',
    accusativeSingular: 'наебалово',
    instrumentalSingular: 'наебаловом',
    prepositionalSingular: 'наебалове'
  };
  
  var хуета = {
    type: 'noun',
    nominativeSingular: 'хуета',
    genitiveSingular: 'хуеты',
    dativeSingular: 'хуете',
    accusativeSingular: 'хуету',
    instrumentalSingular: 'хуетой',
    prepositionalSingular: 'хуете',
    nominativePlural: 'хуеты',
    genitivePlural: 'хует',
    dativePlural: 'хуетам',
    accusativePlural: 'хуеты',
    instrumentalPlural: 'хуетами',
    prepositionalPlural: 'хуетах'
  };
  
  var хуйня = {
    type: 'singular noun',
    nominativeSingular: 'хуйня',
    genitiveSingular: 'хуйни',
    dativeSingular: 'хуйне',
    accusativeSingular: 'хуйню',
    instrumentalSingular: 'хуйнёй',
    prepositionalSingular: 'хуйне'
  };
  
  var заебумба = {
    type: 'singular noun',
    nominativeSingular: 'заебумба',
    genitiveSingular: 'заебумбы',
    dativeSingular: 'заебумбе',
    accusativeSingular: 'заебумбу',
    instrumentalSingular: 'заебумбой',
    prepositionalSingular: 'заебумбе'
  };
  
  var nouns = [блядь, долбоёб, заебумба, наебалово, пизда, пиздец, сука, хуета, хуй, хуйня];
  
  var ёбнуть = {
    type: 'perfective verb',
    infinitive: 'ёбнуть',
    imperativePluralSecondPerson: 'ёбните',
    imperativeSingularSecondPerson: 'ёбни',
    indicativeFuturePluralFirstPerson: 'ёбнем',
    indicativeFuturePluralSecondPerson: 'ёбнете',
    indicativeFuturePluralThirdPerson: 'ёбнут',
    indicativeFutureSingularFirstPerson: 'ёбну',
    indicativeFutureSingularSecondPerson: 'ёбнешь',
    indicativeFutureSingularThirdPerson: 'ёбнет',
    indicativePastPlural: 'ёбнули',
    indicativePastSingularFeminine: 'ёбнула',
    indicativePastSingularMasculine: 'ёбнул',
    indicativePastSingularNeuter: 'ёбнуло'
  };
  
  var ебать = {
    type: 'imperfective verb',
    infinitive: 'ебать',
    indicativePastSingularMasculine: 'ебал',
    indicativePastSingularFeminine: 'ебала',
    indicativePastSingularNeuter: 'ебало',
    indicativePastPlural: 'ебали',
    indicativePresentSingularFirstPerson: 'ебу',
    indicativePresentSingularSecondPerson: 'ебёшь',
    indicativePresentSingularThirdPerson: 'ебёт',
    indicativePresentPluralFirstPerson: 'ебём',
    indicativePresentPluralSecondPerson: 'ебёте',
    indicativePresentPluralThirdPerson: 'ебут',
    imperativeSingularSecondPerson: 'еби',
    imperativePluralSecondPerson: 'ебите'
  };
  
  var ебаться = {
    type: 'imperfective verb',
    infinitive: 'ебаться',
    indicativePastSingularMasculine: 'ебался',
    indicativePastSingularFeminine: 'ебалась',
    indicativePastSingularNeuter: 'ебалось',
    indicativePastPlural: 'ебались',
    indicativePresentSingularFirstPerson: 'ебусь',
    indicativePresentSingularSecondPerson: 'ебёшься',
    indicativePresentSingularThirdPerson: 'ебётся',
    indicativePresentPluralFirstPerson: 'ебёмся',
    indicativePresentPluralSecondPerson: 'ебётесь',
    indicativePresentPluralThirdPerson: 'ебутся',
    imperativeSingularSecondPerson: 'ебись',
    imperativePluralSecondPerson: 'ебитесь'
  };
  
  var ебашить = {
    type: 'imperfective verb',
    infinitive: 'ебашить',
    imperativePluralSecondPerson: 'ебашьте',
    imperativeSingularSecondPerson: 'ебашь',
    indicativePastPlural: 'ебашили',
    indicativePastSingularFeminine: 'ебашила',
    indicativePastSingularMasculine: 'ебашил',
    indicativePastSingularNeuter: 'ебашило',
    indicativePresentPluralFirstPerson: 'ебашим',
    indicativePresentPluralSecondPerson: 'ебашите',
    indicativePresentPluralThirdPerson: 'ебашат',
    indicativePresentSingularFirstPerson: 'ебашу',
    indicativePresentSingularSecondPerson: 'ебашишь',
    indicativePresentSingularThirdPerson: 'ебашит'
  };
  
  var заебать = {
    type: 'perfective verb',
    infinitive: 'заебать',
    imperativePluralSecondPerson: 'заебите',
    imperativeSingularSecondPerson: 'заеби',
    indicativeFuturePluralFirstPerson: 'заебём',
    indicativeFuturePluralSecondPerson: 'заебёте',
    indicativeFuturePluralThirdPerson: 'заебут',
    indicativeFutureSingularFirstPerson: 'заебу',
    indicativeFutureSingularSecondPerson: 'заебёшь',
    indicativeFutureSingularThirdPerson: 'заебёт',
    indicativePastPlural: 'заебали',
    indicativePastSingularFeminine: 'заебала',
    indicativePastSingularMasculine: 'заебал',
    indicativePastSingularNeuter: 'заебало'
  };
  
  var пиздеть = {
    type: 'imperfective verb',
    infinitive: 'пиздеть',
    imperativePluralSecondPerson: 'пиздите',
    imperativeSingularSecondPerson: 'пизди',
    indicativePastPlural: 'пиздели',
    indicativePastSingularFeminine: 'пиздела',
    indicativePastSingularMasculine: 'пиздел',
    indicativePastSingularNeuter: 'пиздело',
    indicativePresentPluralFirstPerson: 'пиздим',
    indicativePresentPluralSecondPerson: 'пиздите',
    indicativePresentPluralThirdPerson: 'пиздят',
    indicativePresentSingularFirstPerson: 'пизжу',
    indicativePresentSingularSecondPerson: 'пиздишь',
    indicativePresentSingularThirdPerson: 'пиздит'
  };
  
  var проебать = {
    type: 'perfective verb',
    infinitive: 'проебать',
    imperativePluralSecondPerson: 'проебите',
    imperativeSingularSecondPerson: 'проеби',
    indicativeFuturePluralFirstPerson: 'проебём',
    indicativeFuturePluralSecondPerson: 'проебёте',
    indicativeFuturePluralThirdPerson: 'проебут',
    indicativeFutureSingularFirstPerson: 'проебу',
    indicativeFutureSingularSecondPerson: 'проебёшь',
    indicativeFutureSingularThirdPerson: 'проебёт',
    indicativePastPlural: 'проебали',
    indicativePastSingularFeminine: 'проебала',
    indicativePastSingularMasculine: 'проебал',
    indicativePastSingularNeuter: 'проебало'
  };
  
  var спиздить = {
    type: 'perfective verb',
    infinitive: 'спиздить',
    imperativePluralSecondPerson: 'спиздите',
    imperativeSingularSecondPerson: 'спизди',
    indicativeFuturePluralFirstPerson: 'спиздим',
    indicativeFuturePluralSecondPerson: 'спиздите',
    indicativeFuturePluralThirdPerson: 'спиздят',
    indicativeFutureSingularFirstPerson: 'спизжу',
    indicativeFutureSingularSecondPerson: 'спиздишь',
    indicativeFutureSingularThirdPerson: 'спиздит',
    indicativePastPlural: 'спиздили',
    indicativePastSingularFeminine: 'спиздила',
    indicativePastSingularMasculine: 'спиздил',
    indicativePastSingularNeuter: 'спиздило'
  };
  
  var verbs = [ебать, ебаться, ебашить, ёбнуть, заебать, пиздеть, проебать, спиздить];
  
  var похуй = {
    type: 'predicative',
    predicative: 'похуй'
  };
  
  var predicatives = [похуй];
  
  var words = /*#__PURE__*/[].concat(adverbs, interjections, nouns, verbs, predicatives);
  
  var flatten = function flatten(words) {
    return words.reduce(function (result, word) {
      Object.values(word).forEach(function (wordForm) {
        return result.push(wordForm);
      });
      return result;
    }, []);
  };
  
  var flatWords = /*#__PURE__*/flatten(words);
  
  exports.flatWords = flatWords;
  exports.words = words;
  
  
  },{}],9:[function(require,module,exports){
  "use strict";Object.defineProperty(exports,"__esModule",{value:!0});var i=[].concat([{type:"non qualifying adverb",adverb:"заебись"},{type:"non qualifying adverb",adverb:"нах"},{type:"non qualifying adverb",adverb:"нахуй"},{type:"qualifying adverb",adverb:"охуенно",comparative:"охуеннее",superlative:"охуенней"},{type:"qualifying adverb",adverb:"хуёво",comparative:"хуёвее",superlative:"хуёвейше"}],[{type:"interjection",interjection:"бля"},{type:"interjection",interjection:"блять"},{type:"interjection",interjection:"ёба"},{type:"interjection",interjection:"ёпт"}],[{type:"noun",nominativeSingular:"блядь",genitiveSingular:"бляди",dativeSingular:"бляди",accusativeSingular:"блядь",instrumentalSingular:"блядью",prepositionalSingular:"бляди",nominativePlural:"бляди",genitivePlural:"блядей",dativePlural:"блядям",accusativePlural:"блядей",instrumentalPlural:"блядями",prepositionalPlural:"блядях"},{type:"noun",nominativeSingular:"долбоёб",genitiveSingular:"долбоёба",dativeSingular:"долбоёбу",accusativeSingular:"долбоёба",instrumentalSingular:"долбоёбом",prepositionalSingular:"долбоёбе",nominativePlural:"долбоёбы",genitivePlural:"долбоёбов",dativePlural:"долбоёбам",accusativePlural:"долбоёбов",instrumentalPlural:"долбоёбами",prepositionalPlural:"долбоёбах"},{type:"singular noun",nominativeSingular:"заебумба",genitiveSingular:"заебумбы",dativeSingular:"заебумбе",accusativeSingular:"заебумбу",instrumentalSingular:"заебумбой",prepositionalSingular:"заебумбе"},{type:"singular noun",nominativeSingular:"наебалово",genitiveSingular:"наебалова",dativeSingular:"наебалову",accusativeSingular:"наебалово",instrumentalSingular:"наебаловом",prepositionalSingular:"наебалове"},{type:"noun",nominativeSingular:"пизда",genitiveSingular:"пизды",dativeSingular:"пизде",accusativeSingular:"пизду",instrumentalSingular:"пиздой",prepositionalSingular:"пизде",nominativePlural:"пизды",genitivePlural:"пизд",dativePlural:"пиздам",accusativePlural:"пизды",instrumentalPlural:"пиздами",prepositionalPlural:"пиздах"},{type:"noun",nominativeSingular:"пиздец",genitiveSingular:"пиздеца",dativeSingular:"пиздецу",accusativeSingular:"пиздец",instrumentalSingular:"пиздецом",prepositionalSingular:"пиздеце",nominativePlural:"пиздецы",genitivePlural:"пиздецов",dativePlural:"пиздецам",accusativePlural:"пиздецы",instrumentalPlural:"пиздецами",prepositionalPlural:"пиздецах"},{type:"noun",nominativeSingular:"сука",genitiveSingular:"суки",dativeSingular:"суке",accusativeSingular:"суку",instrumentalSingular:"сукой",prepositionalSingular:"суке",nominativePlural:"суки",genitivePlural:"сук",dativePlural:"сукам",accusativePlural:"сук",instrumentalPlural:"суками",prepositionalPlural:"суках"},{type:"noun",nominativeSingular:"хуета",genitiveSingular:"хуеты",dativeSingular:"хуете",accusativeSingular:"хуету",instrumentalSingular:"хуетой",prepositionalSingular:"хуете",nominativePlural:"хуеты",genitivePlural:"хует",dativePlural:"хуетам",accusativePlural:"хуеты",instrumentalPlural:"хуетами",prepositionalPlural:"хуетах"},{type:"noun",nominativeSingular:"хуй",genitiveSingular:"хуя",dativeSingular:"хую",accusativeSingular:"хуй",instrumentalSingular:"хуём",prepositionalSingular:"хуе",nominativePlural:"хуи",genitivePlural:"хуёв",dativePlural:"хуям",accusativePlural:"хуи",instrumentalPlural:"хуями",prepositionalPlural:"хуях"},{type:"singular noun",nominativeSingular:"хуйня",genitiveSingular:"хуйни",dativeSingular:"хуйне",accusativeSingular:"хуйню",instrumentalSingular:"хуйнёй",prepositionalSingular:"хуйне"}],[{type:"imperfective verb",infinitive:"ебать",indicativePastSingularMasculine:"ебал",indicativePastSingularFeminine:"ебала",indicativePastSingularNeuter:"ебало",indicativePastPlural:"ебали",indicativePresentSingularFirstPerson:"ебу",indicativePresentSingularSecondPerson:"ебёшь",indicativePresentSingularThirdPerson:"ебёт",indicativePresentPluralFirstPerson:"ебём",indicativePresentPluralSecondPerson:"ебёте",indicativePresentPluralThirdPerson:"ебут",imperativeSingularSecondPerson:"еби",imperativePluralSecondPerson:"ебите"},{type:"imperfective verb",infinitive:"ебаться",indicativePastSingularMasculine:"ебался",indicativePastSingularFeminine:"ебалась",indicativePastSingularNeuter:"ебалось",indicativePastPlural:"ебались",indicativePresentSingularFirstPerson:"ебусь",indicativePresentSingularSecondPerson:"ебёшься",indicativePresentSingularThirdPerson:"ебётся",indicativePresentPluralFirstPerson:"ебёмся",indicativePresentPluralSecondPerson:"ебётесь",indicativePresentPluralThirdPerson:"ебутся",imperativeSingularSecondPerson:"ебись",imperativePluralSecondPerson:"ебитесь"},{type:"imperfective verb",infinitive:"ебашить",imperativePluralSecondPerson:"ебашьте",imperativeSingularSecondPerson:"ебашь",indicativePastPlural:"ебашили",indicativePastSingularFeminine:"ебашила",indicativePastSingularMasculine:"ебашил",indicativePastSingularNeuter:"ебашило",indicativePresentPluralFirstPerson:"ебашим",indicativePresentPluralSecondPerson:"ебашите",indicativePresentPluralThirdPerson:"ебашат",indicativePresentSingularFirstPerson:"ебашу",indicativePresentSingularSecondPerson:"ебашишь",indicativePresentSingularThirdPerson:"ебашит"},{type:"perfective verb",infinitive:"ёбнуть",imperativePluralSecondPerson:"ёбните",imperativeSingularSecondPerson:"ёбни",indicativeFuturePluralFirstPerson:"ёбнем",indicativeFuturePluralSecondPerson:"ёбнете",indicativeFuturePluralThirdPerson:"ёбнут",indicativeFutureSingularFirstPerson:"ёбну",indicativeFutureSingularSecondPerson:"ёбнешь",indicativeFutureSingularThirdPerson:"ёбнет",indicativePastPlural:"ёбнули",indicativePastSingularFeminine:"ёбнула",indicativePastSingularMasculine:"ёбнул",indicativePastSingularNeuter:"ёбнуло"},{type:"perfective verb",infinitive:"заебать",imperativePluralSecondPerson:"заебите",imperativeSingularSecondPerson:"заеби",indicativeFuturePluralFirstPerson:"заебём",indicativeFuturePluralSecondPerson:"заебёте",indicativeFuturePluralThirdPerson:"заебут",indicativeFutureSingularFirstPerson:"заебу",indicativeFutureSingularSecondPerson:"заебёшь",indicativeFutureSingularThirdPerson:"заебёт",indicativePastPlural:"заебали",indicativePastSingularFeminine:"заебала",indicativePastSingularMasculine:"заебал",indicativePastSingularNeuter:"заебало"},{type:"imperfective verb",infinitive:"пиздеть",imperativePluralSecondPerson:"пиздите",imperativeSingularSecondPerson:"пизди",indicativePastPlural:"пиздели",indicativePastSingularFeminine:"пиздела",indicativePastSingularMasculine:"пиздел",indicativePastSingularNeuter:"пиздело",indicativePresentPluralFirstPerson:"пиздим",indicativePresentPluralSecondPerson:"пиздите",indicativePresentPluralThirdPerson:"пиздят",indicativePresentSingularFirstPerson:"пизжу",indicativePresentSingularSecondPerson:"пиздишь",indicativePresentSingularThirdPerson:"пиздит"},{type:"perfective verb",infinitive:"проебать",imperativePluralSecondPerson:"проебите",imperativeSingularSecondPerson:"проеби",indicativeFuturePluralFirstPerson:"проебём",indicativeFuturePluralSecondPerson:"проебёте",indicativeFuturePluralThirdPerson:"проебут",indicativeFutureSingularFirstPerson:"проебу",indicativeFutureSingularSecondPerson:"проебёшь",indicativeFutureSingularThirdPerson:"проебёт",indicativePastPlural:"проебали",indicativePastSingularFeminine:"проебала",indicativePastSingularMasculine:"проебал",indicativePastSingularNeuter:"проебало"},{type:"perfective verb",infinitive:"спиздить",imperativePluralSecondPerson:"спиздите",imperativeSingularSecondPerson:"спизди",indicativeFuturePluralFirstPerson:"спиздим",indicativeFuturePluralSecondPerson:"спиздите",indicativeFuturePluralThirdPerson:"спиздят",indicativeFutureSingularFirstPerson:"спизжу",indicativeFutureSingularSecondPerson:"спиздишь",indicativeFutureSingularThirdPerson:"спиздит",indicativePastPlural:"спиздили",indicativePastSingularFeminine:"спиздила",indicativePastSingularMasculine:"спиздил",indicativePastSingularNeuter:"спиздило"}],[{type:"predicative",predicative:"похуй"}]);exports.flatWords=function(i){return i.reduce((function(i,e){return Object.values(e).forEach((function(e){return i.push(e)})),i}),[])}(i),exports.words=i;
  
  
  },{}],10:[function(require,module,exports){
  /**
   * LeoProfanity
   *
   * @constructor
   */
  var LeoProfanity = {
    /** @type {Object.<string, Array.string>} */
    wordDictionary: {},
  
    /** @type {Array.string} */
    words: [],
  
    lang : 'en',
  
    /**
     * Remove word from the list
     *
     * @private
     * @param {string} str - word
     */
    removeWord: function (str) {
      var index = this.words.indexOf(str);
  
      if (index !== -1) {
        this.words.splice(index, 1);
      }
  
      return this;
    },
  
    /**
     * Add word into the list
     *
     * @private
     * @param {string} str - word
     */
    addWord: function (str) {
      if (this.words.indexOf(str) === -1) {
        this.words.push(str);
      }
  
      return this;
    },
  
    /**
     * Return replacement word from key
     *
     * @example
     * // output: '***'
     * getReplacementWord('*', 3)
     *
     * // output: '----'
     * getReplacementWord('-', 4)
     *
     * @private
     * @param {string} key
     * @param {number} n
     * @returns string
     */
    getReplacementWord: function (key, n) {
      var i = 0;
      var replacementWord = '';
  
      for (i = 0; i < n; i++) {
        replacementWord += key;
      }
  
      return replacementWord;
    },
  
    /**
     * Sanitize string for this project
     * 1. Convert to lower case
     * 2. Replace comma and dot with space
     *
     * @private
     * @param {string} str
     * @returns {string}
     */
    sanitize: function (str) {
      str = str.toLowerCase();
      /* eslint-disable */
      str = str.replace(/\.|,/g, ' ');
  
      return str;
    },
  
    /**
     * Return all current profanity words
     *
     * @example
     * filter.list();
     * 
     * @public
     * @returns {Array.string}
     */
    list: function () {
      return this.words;
    },
  
    /**
     * Check the string contain profanity words or not
     * Approach, to make it fast ASAP.
     * Check out more cases on "clean" method
     * 
     * @example
     * // output: true
     * filter.check('I have boob');
     *
     * @see http://stackoverflow.com/questions/26425637/javascript-split-string-with-white-space
     * @see http://stackoverflow.com/questions/6116474/how-to-find-if-an-array-contains-a-specific-string-in-javascript-jquery
     * @see http://stackoverflow.com/questions/9141951/splitting-string-by-whitespace-without-empty-elements
     * @public
     * @param {string} str
     * @returns {boolean}
     */
    check: function (str) {
      if (!str) return false;
  
      var i = 0;
      var isFound = false;
  
      str = this.sanitize(str);
      // convert into array and remove white space
      // add default returned value for some cases (e.g. "." will returns null)
      var strs = str.match(/[^ ]+/g) || [];
      while (!isFound && i <= this.words.length - 1) {
        if (strs.includes(this.words[i])) isFound = true;
        i++;
      }
  
      return isFound;
    },
  
    /**
     * Internal proceeding method
     *
     * @todo improve algorithm
     * @see http://stackoverflow.com/questions/26425637/javascript-split-string-with-white-space
     * @private
     * @param {string} str
     * @param {string} [replaceKey=*] one character only
     * @param {string} [nbLetters=0] number of ignoring letters from the beginning
     * @returns {string}
     */
    proceed: function (str, replaceKey, nbLetters) {
      if (!str) return '';
      if (typeof replaceKey === 'undefined') replaceKey = '*';
      if (typeof nbLetters === 'undefined') nbLetters = 0;
  
      var self = this;
      var originalString = str;
      var result = str;
  
      var sanitizedStr = self.sanitize(originalString);
      // split by whitespace (keep delimiter)
      // (cause comma and dot already replaced by whitespace)
      var sanitizedArr = sanitizedStr.split(/(\s)/);
      // split by whitespace, comma and dot (keep delimiter)
      var resultArr = result.split(/(\s|,|\.)/);
  
      // loop through given string
      var badWords = [];
      sanitizedArr.forEach(function (item, index) {
        if (self.words.includes(item)) {
          var replacementWord = item.slice(0, nbLetters) + self.getReplacementWord(replaceKey, item.length - nbLetters);
          badWords.push(resultArr[index]);
          resultArr[index] = replacementWord;
        }
      });
  
      // combine it
      result = resultArr.join('');
  
      return [result, badWords];
    },
  
    /**
     * Replace profanity words
     * 
     * @example
     * // no bad word
     * // output: I have 2 eyes
     * filter.clean('I have 2 eyes');
     * 
     * // normal case
     * // output: I have ****, etc.
     * filter.clean('I have boob, etc.');
     * 
     * // case sensitive
     * // output: I have ****
     * filter.clean('I have BoOb');
     * 
     * // separated by comma and dot
     * // output: I have ****.
     * filter.clean('I have BoOb.');
     * 
     * // multi occurrence
     * // output: I have ****,****, ***, and etc.
     * filter.clean('I have boob,boob, ass, and etc.');
     * 
     * // should not detect unspaced-word
     * // output: Buy classic watches online
     * filter.clean('Buy classic watches online');
     * 
     * // clean with custom replacement-character
     * // output: I have ++++
     * filter.clean('I have boob', '+');
     * 
     * // support "clear letter" in the beginning of the word
     * // output: I have bo++
     * filter.clean('I have boob', '+', 2);
     * 
     * @public
     * @param {string} str
     * @param {string} [replaceKey=*] one character only
     * @param {string} [nbLetters=0] number of ignoring letters from the beginning
     * @returns {string}
     */
    clean: function (str, replaceKey, nbLetters) {
      if (!str) return '';
      if (typeof replaceKey === 'undefined') replaceKey = '*';
      if (typeof nbLetters === 'undefined') nbLetters = 0;
      return this.proceed(str, replaceKey, nbLetters)[0];
    },
  
    /**
     * Get list of used bad/profanity words
     * 
     * @example
     * // should return original string if string not contain profanity word
     * // output: []
     * filter.badWordsUsed('I have 2 eyes')
     * 
     * // should found profanity word
     * // output: ['zoophilia']
     * filter.badWordsUsed('lorem zoophilia ipsum')
     * 
     * // should detect case sensitive
     * // output: ['BoOb']
     * filter.badWordsUsed('I have BoOb')
     * 
     * // should detect multi occurrence
     * // output: ['boob', 'boob', 'ass']
     * filter.badWordsUsed('I have boob,boob, ass, and etc.')
     * 
     * // should not detect unspaced-word
     * // output: []
     * filter.badWordsUsed('Buy classic watches online')
     * 
     * // should detect multi-length-space and multi-space
     * // output: ['BoOb']
     * filter.badWordsUsed(',I h  a.   v e BoOb.')
     *
     * @public
     * @param {string} str
     * @returns {Array.string}
     */
    badWordsUsed: function (str) {
      if (!str) return [];
      return this.proceed(str, '*')[1];
    },
  
    /**
     * Add word to the list
     * 
     * @example
     * // add word
     * filter.add('b00b');
     * 
     * // add word's array
     * // check duplication automatically
     * filter.add(['b00b', 'b@@b']);
     * 
     * @public
     * @param {string|Array.string} data
     */
    add: function (data) {
      var self = this;
  
      if (typeof data === 'string') {
        self.addWord(data);
      } else if (data.constructor === Array) {
        data.forEach(function (word) {
          self.addWord(word);
        });
      }
  
      return this;
    },
  
    /**
     * Remove word from the list
     * 
     * @example
     * // remove word
     * filter.remove('b00b');
     * 
     * // remove word's array
     * filter.remove(['b00b', 'b@@b']);
     *
     * @public
     * @param {string|Array.string} data
     */
    remove: function (data) {
      var self = this;
  
      if (typeof data === 'string') {
        self.removeWord(data);
      } else if (data.constructor === Array) {
        data.forEach(function (word) {
          self.removeWord(word);
        });
      }
  
      return this;
    },
  
    /**
     * Reset word list by using en dictionary
     * (also remove word that manually add)
     * 
     * @public
     */
    reset: function () {
      this.loadDictionary('en');
      return this;
    },
  
    /**
     * Clear all words in the list
     *
     * @public
     */
    clearList: function () {
      this.words = [];
  
      return this;
    },
  
    /**
     * Return word list from dictionary
     *
     * @example
     * // returns words in en dictionary
     * filter.getDictionary();
     * 
     * // returns words in fr dictionary
     * filter.getDictionary('fr');
     * 
     * @public
     * @param {string} [name=en] dictionary name
     * @returns {Array.string}
     */
    getDictionary: function (name = 'en') {
      name = (name in this.wordDictionary) ? name : 'en';
      return this.wordDictionary[name]
    },
  
    /**
     * Add dictionary
     *
     * @todo complete it
     * @private
     * @param {string} name
     * @param {Array.string} data
     */
    addDictionary: function (name, data) {
  
    },
  
    /**
     * Load word list from dictionary to using in the filter
     *
     * @example
     * // replace current dictionary with the french one
     * filter.loadDictionary('fr');
     * 
     * // replace dictionary with the default one (same as filter.reset())
     * filter.loadDictionary();
     *
     * @public
     * @param {string} [name=en]
     */
    loadDictionary: function (name = 'en') {
      // clone
      if(this.lang != name){
        this.words = JSON.parse(JSON.stringify(this.getDictionary(name)))
        this.lang = name
      }
      
    },
  };
  
  window.LeoProfanity = LeoProfanity
  
  if (typeof module !== 'undefined' && module.exports != null) {
    // constructor here
    LeoProfanity.wordDictionary['en'] = require('../dictionary/default.json');
  
    // try to import optional dictionaries
    try { LeoProfanity.wordDictionary['fr'] = require('french-badwords-list').array; } catch (e) {}
    try { LeoProfanity.wordDictionary['ru'] = require('russian-bad-words').flatWords; } catch (e) {}
  
    /** @type {Array.string} */
    LeoProfanity.words = JSON.parse(JSON.stringify(LeoProfanity.wordDictionary ? LeoProfanity.wordDictionary['en'] : []));
  
    module.exports = LeoProfanity
    exports.default = LeoProfanity
  }
  
  },{"../dictionary/default.json":2,"french-badwords-list":4,"russian-bad-words":7}]},{},[10]);
  