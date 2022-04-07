<!doctype html>
<html class="no-js customscroll" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Cache-Control" content="no-cache">
        <meta http-equiv='expires' content='0'>

        <link rel="alternate" href="android-app://pocketnet.app/https/pocketnet.app" />
        <link rel="alternate" href="android-app://pocketnet.app/https/test.pocketnet.app" />
        <link rel="alternate" href="android-app://pocketnet.app/https/bastyon.com" />
        <link rel="alternate" href="android-app://pocketnet.app/https/bastyon.com" />

        <meta name="theme-color" content="#ffffff">
        <meta name="msapplication-navbutton-color" content="#ffffff">
        <meta name="apple-mobile-web-app-status-bar-style" content="#ffffff">

        <title>__VAR__.project</title>
        <meta name="description" content="A Revolutionary anti-censorship decentralized publishing and social platform. Based on the blockchain technology, it runs on a set of computers around the world, not controlled by any single entity. Self-policed by users with good reputation where nobody records your keystrokes, viewing habits or searches. ">
        <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1, user-scalable=no">
        <meta name="fragment" content="!">
        <meta name="keywords" content="Blockchain, Decentralized, Delete Facebook, Alternative Social Media, Social Network, Social Platform, No Censorship, Online Social Network, Facebook Alternative, Reddit Alternative, Twitter Alternative, Social Sharing Platform, Decentralized Social Network, Blockchain Social Network, bastyon, bastion, bastyon pocketnet, pocketnet, Donald Trump, election 2020, Trump, PKOIN, PKOIN digifinex, BTCPOP PKOIN , Bitforex PKOIN, facebook, linkedin, instagram, telegram, whatsapp" />

        <meta http-equiv="Content-Security-Policy" content="
        upgrade-insecure-requests;
        default-src 'self' __VAR__.domain:*; 
        connect-src 'self' http: ws: https: wss:;
        img-src 'self' data: http: https: __VAR__.domain:*;
        script-src 'self' blob: __VAR__.domain player.vimeo.com www.youtube.com s.ytimg.com cdn.jsdelivr.net/joypixels/ 'unsafe-eval' 'unsafe-inline';
        frame-src 'self' __VAR__.domain player.vimeo.com www.youtube.com;
        style-src 'self' data: __VAR__.domain:* cdn.jsdelivr.net/joypixels/ use.fontawesome.com 'unsafe-inline';
        font-src 'self' data: __VAR__.domain:* use.fontawesome.com;
        media-src blob: *">

        <link rel="manifest" href="manifest.json">
        <link rel="apple-touch-icon" href="__VAR__.domain/img/res/blue_pad_250.png" sizes="250x250">
        <meta name="theme-color" content="#011621" />

        <link rel="dns-prefetch" href="__VAR__.domain:8899" />
        <link rel="dns-prefetch" href="__VAR__.domain" />
        <?php 
        
            require_once('php/og.php'); 

            $og = new OG($_GET, __VAR__.proxypath, "__VAR__.domain", "__VAR__.project");

            $og->get();
            $og->echotags();
        ?>

        <style type="text/css">
            #splashScreen{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#011621;z-index:5000;display:flex;justify-content:center;align-items:center;flex-direction:column;}#splashScreen h1{color:#fff;margin-top:1em;margin-bottom:0;font-size:1em}#splashScreen h1.fade-in{-webkit-animation:fade-in .3s ease-out both;animation:fade-in .3s ease-out both}#splashScreen.fade-out{-webkit-animation:fade-out .2s ease-in both;animation:fade-out .2s ease-in both;background-color:#0098eb}#splashScreen img{max-height:50px;max-width:50px}#splashScreen img.zoom-in{-webkit-animation:zoom-in .5s ease-out both;animation:zoom-in .5s ease-out both}#splashScreen img.zoom-out{-webkit-animation:zoom-out .5s ease-in both;animation:zoom-out .5s ease-in both}#splashScreen img.rotate{-webkit-animation:rotate 1s ease-in-out infinite both;animation:rotate 1s ease-in-out infinite both}#splashScreen img.zoom-out-rotate{-webkit-animation:zoom-out-rotate .5s ease-in both;animation:zoom-out-rotate .5s ease-in both}@media only screen and (max-width:640px){#splashScreen{display:flex}}@-webkit-keyframes zoom-out{0%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);opacity:1}50%{opacity:.25}100%{-webkit-transform:scale3d(50,50,50);transform:scale3d(50,50,50);opacity:0}}@keyframes zoom-out{0%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);opacity:1}50%{opacity:.25}100%{-webkit-transform:scale3d(50,50,50);transform:scale3d(50,50,50);opacity:0}}@-webkit-keyframes zoom-in{0%{-webkit-transform:scale3d(0,0,0);transform:scale3d(0,0,0);opacity:0}100%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);opacity:1}}@keyframes zoom-in{0%{-webkit-transform:scale3d(0,0,0);transform:scale3d(0,0,0);opacity:0}100%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);opacity:1}}@-webkit-keyframes zoom-out-rotate{0%{-webkit-transform:scale3d(1,1,1) rotate(0);transform:scale3d(1,1,1) rotate(0);opacity:1}50%{opacity:.25}100%{-webkit-transform:scale3d(75,75,75) rotate(310deg);transform:scale3d(75,75,75) rotate(310deg);opacity:0}}@keyframes zoom-out-rotate{0%{-webkit-transform:scale3d(1,1,1) rotate(0);transform:scale3d(1,1,1) rotate(0);opacity:1}50%{opacity:.25}100%{-webkit-transform:scale3d(75,75,75) rotate(310deg);transform:scale3d(75,75,75) rotate(310deg);opacity:0}}@-webkit-keyframes rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes fade-out{0%{opacity:1}100%{opacity:0}}@keyframes fade-out{0%{opacity:1}100%{opacity:0}}@-webkit-keyframes fade-in{0%{opacity:0}100%{opacity:1}}@keyframes fade-in{0%{opacity:0}100%{opacity:1}}
        </style>
        <link rel="icon" href="./favicon.svg" sizes="any" type="image/svg+xml">
       
    </head>
    <body id="application" class="menu-hide ">

        <div id="windowsContainer">
        </div>

        <div id="headerWrapper">
        </div>

        <div class="cordovatop">
        </div>

        <div id="menuWrapper">
        </div> 

        <div id="panelWrapper">
        </div> 

        <div id="navigationWrapper">
        </div> 

        <div class="contentWrapper"> 
            <div id="content">                
            </div>
        </div>

        <div id="footerWrapper">
            
        </div>

        <div class="bodyshadow">
        </div>     

        <div class="topPreloader" id="_topPreloader">
        </div>

        <div id="splashScreen" class="cssanimation">
            <img src="img/splashscreen/pocketnet-logo-19.svg" id="splashScreenImg" class="zoom-in rotate">
        </div>

        <div class="chats">
        </div>
    

        <div id="matrix" class="matrix"></div>
        <div id="hideallnotifications"></div>

        <div id="topsmallpreloader">
            <div class="table">
                <div>
                    <div class="icon">
                        <i class="fas fa-spinner fa-spin"></i>
                    </div>
                </div>
            </div>
        </div>

        <div id="globalpreloader">
            <div class="table">
                <div>
                    <div class="icon">
                        <i class="fas fa-spinner fa-spin"></i>
                    </div>
                </div>
               
            </div>
        </div>


       <!-- <script src="cordova.js"></script>-->
                
        <script type="text/javascript">

            _Node = false;
            
        </script>

        

        __JSENV__

        __VE__

        __JS__

        __CSS__

        <link rel="stylesheet" href="css/fontawesome/css/all.min.css">

        <script async src="js/pwa-service-worker.js?v=v__PACKAGE-VERSION__"></script>


    </body>
</html>
