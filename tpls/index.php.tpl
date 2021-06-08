<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Cache-Control" content="no-cache">
        <meta http-equiv='expires' content='0'>

      

        <title>POCKETNET</title>
        <meta name="description" content="A Revolutionary anti-censorship decentralized publishing and social platform. Based on the blockchain technology, it runs on a set of computers around the world, not controlled by any single entity. Self-policed by users with good reputation where nobody records your keystrokes, viewing habits or searches. ">
        <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1, user-scalable=no">
        <meta name="fragment" content="!">
        <meta name="keywords" content="Blockchain, Decentralized, Delete Facebook, Alternative Social Media, Social Network, Social Platform, No Censorship, Online Social Network, Facebook Alternative, Reddit Alternative, Twitter Alternative, Social Sharing Platform, Decentralized Social Network, Blockchain Social Network " />

        <meta http-equiv="Content-Security-Policy" content="
        default-src https: 'self'; 
        connect-src https: wss: data: blob:;
        img-src 'self' data: https:;
        script-src 'self' blob: https://__VAR__.domain https://unpkg.com/@ffmpeg/ffmpeg@0.10.0/dist/ffmpeg.min.js https://player.vimeo.com https://www.youtube.com https://s.ytimg.com https://cdn.rawgit.com https://cdn.jsdelivr.net 'unsafe-eval' 'unsafe-inline';
        style-src 'self'  https://use.fontawesome.com https://fonts.googleapis.com https://cdn.jsdelivr.net 'unsafe-inline';
        font-src 'self' data: https://fonts.gstatic.com https://use.fontawesome.com;
        media-src blob: *">

        <link rel="manifest" href="manifest.json">
        <link rel="apple-touch-icon" href="https://__VAR__.domain/img/res/blue_pad_250.png" sizes="250x250">
        <meta name="theme-color" content="#011621" />

        <link rel="dns-prefetch" href="https://__VAR__.domain:8899" />
        <link rel="dns-prefetch" href="https://__VAR__.domain" />
        <?php 
        
            require_once('php/og.php'); 

            $og = new OG($_GET, __VAR__.proxypath);

            $og->get();
            $og->echotags();
        ?>

        <style type="text/css">
            #splashScreen{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:#011621;z-index:5000;display:flex;justify-content:center;align-items:center;flex-direction:column}#splashScreen h1{color:#fff;margin-top:1em;margin-bottom:0;font-size:1em}#splashScreen h1.fade-in{-webkit-animation:fade-in .3s ease-out both;animation:fade-in .3s ease-out both}#splashScreen h1.fade-out{-webkit-animation:fade-out .2s ease-in both;animation:fade-out .2s ease-in both}#splashScreen img{max-height:6vh;max-width:10vw}#splashScreen img.zoom-in{-webkit-animation:zoom-in .5s ease-out both;animation:zoom-in .5s ease-out both}#splashScreen img.zoom-out{-webkit-animation:zoom-out .5s ease-in both;animation:zoom-out .5s ease-in both}#splashScreen img.rotate,#splashScreen.cssanimation img{-webkit-animation:rotate 1s ease-in-out infinite both;animation:rotate 1s ease-in-out infinite both}@media only screen and (max-width:768px){html.scrollmodedown #menu .menuWrapper{top:-65px}html.scrollmodedown #panelWrapper{padding-top:0;display:none}html.scrollmodedown #navigation{bottom:-60px}}@media only screen and (max-width:640px){#splashScreen{display:flex}}@-webkit-keyframes zoom-out{0%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);opacity:1}100%{-webkit-transform:scale3d(5,5,5);transform:scale3d(5,5,5);opacity:0}}@keyframes zoom-out{0%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);opacity:1}100%{-webkit-transform:scale3d(5,5,5);transform:scale3d(5,5,5);opacity:0}}@-webkit-keyframes zoom-in{0%{-webkit-transform:scale3d(0,0,0);transform:scale3d(0,0,0);opacity:0}100%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);opacity:1}}@keyframes zoom-in{0%{-webkit-transform:scale3d(0,0,0);transform:scale3d(0,0,0);opacity:0}100%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);opacity:1}}@-webkit-keyframes rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes fade-out{0%{opacity:1}100%{opacity:0}}@keyframes fade-out{0%{opacity:1}100%{opacity:0}}@-webkit-keyframes fade-in{0%{opacity:0}100%{opacity:1}}@keyframes fade-in{0%{opacity:0}100%{opacity:1}}
        </style>

        <link rel="icon" href="./favicon.svg" sizes="any" type="image/svg+xml">
       
    </head>
    <body id="application" class="menu-hide">

        <div id="headerWrapper">
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
            <img src="img/splashscreen/pocketnet-logo-19.svg" class="zoom-in">
        </div>

        <div class="chats">
        </div>


        <div id="matrix" class="matrix"></div>

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

        <link rel="stylesheet" href="css/fontawesome/css/all.css">

        <script async src="js/pwa-service-worker.js"></script>

    </body>
</html>
