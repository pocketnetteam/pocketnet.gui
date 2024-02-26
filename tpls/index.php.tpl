<!doctype html>
<html class="no-js customscroll applicationhtml" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Cache-Control" content="no-cache">
        <meta http-equiv='expires' content='0'>
        <meta http-equiv="X-Frame-Options: SAMEORIGIN">
        
        <link rel="alternate" href="android-app://pocketnet.app/https/pocketnet.app" />
        <link rel="alternate" href="android-app://pocketnet.app/https/test.pocketnet.app" />
        <link rel="alternate" href="android-app://pocketnet.app/https/bastyon.com" />
        <link rel="alternate" href="android-app://pocketnet.app/https/bastyon.com" />

        <meta name="theme-color" content="#ffffff">
        <meta name="msapplication-navbutton-color" content="#ffffff">
        <meta name="apple-mobile-web-app-status-bar-style" content="#ffffff">

        <title>__VAR__.name</title>
        <meta name="description" content="A Revolutionary anti-censorship decentralized publishing and social platform. Based on the blockchain technology, it runs on a set of computers around the world, not controlled by any single entity. Self-policed by users with good reputation where nobody records your keystrokes, viewing habits or searches. ">
        <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1, user-scalable=no">
        <meta name="fragment" content="!">
        <meta name="keywords" content="Blockchain, Decentralized, Delete Facebook, Alternative Social Media, Social Network, Social Platform, No Censorship, Online Social Network, Facebook Alternative, Reddit Alternative, Twitter Alternative, Social Sharing Platform, Decentralized Social Network, Blockchain Social Network, bastyon, bastion, bastyon pocketnet, pocketnet, Donald Trump, election 2020, Trump, PKOIN, PKOIN digifinex, BTCPOP PKOIN , Bitforex PKOIN, facebook, linkedin, instagram, telegram, whatsapp" />

        <meta http-equiv="Content-Security-Policy" content="
        upgrade-insecure-requests;
        default-src blob: 'self' __VAR__.domain:*;
        connect-src blob: data: 'self' http: ws: https: wss:;
        img-src 'self' blob: data: http: https: __VAR__.domain:*;
        script-src 'self' blob: __VAR__.domain player.vimeo.com www.youtube.com s.ytimg.com cdnjs.cloudflare.com/ajax/libs/lamejs/ cdn.jsdelivr.net/joypixels/ 'unsafe-eval' 'unsafe-inline';
        frame-src 'self' https:;
        style-src 'self' data: __VAR__.domain:* cdn.jsdelivr.net/joypixels/ use.fontawesome.com 'unsafe-inline';
        font-src 'self' data: __VAR__.domain:* use.fontawesome.com;
        media-src data: blob: *">

        <link rel="manifest" href="manifest.json">
        <link rel="apple-touch-icon" href="img/res/blue_pad_250.png" sizes="250x250">
        <meta name="theme-color" content="#212529" />

        <link rel="dns-prefetch" href="__VAR__.domain:8899" />
        <link rel="dns-prefetch" href="__VAR__.domain" />
        <?php 
        
            require_once('php/og.php'); 

            $og = new OG($_GET, __VAR__.proxypath, "__VAR__.domain", "__VAR__.project");

            $og->get();
            $og->echotags();
        ?>

        <style type="text/css">
            :root {
                --splashScreenIcon: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyOC4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0i0KHQu9C+0LlfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIyNDBweCIgaGVpZ2h0PSIyNDBweCIgdmlld0JveD0iMCAwIDI0MCAyNDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI0MCAyNDA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOm5vbmU7fQ0KCS5zdDF7ZmlsbDojQ0NDQkNCO30NCgkuc3Qye2ZpbGw6I0ZGRkZGRjt9DQoJLnN0M3tmaWxsOiNFMDIwM0M7fQ0KCS5zdDR7ZmlsbDojMUIyRTVBO30NCjwvc3R5bGU+DQo8Zz4NCgk8Zz4NCgkJPGc+DQoJCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNODksMTY1LjJsMTEuNy01My43bC0zMS00Ni4zbDQ0LjEsMTEuMWwxNi4zLTI3LjhsLTksNi4zTDc4LjQsMzAuMmMtMy0xLjgtNS44LTMuMS04LjQtNC4xDQoJCQkJYy0yLjktMS41LTYuMS0yLjQtOS42LTIuNGMtMC4xLDAtMC4xLDAtMC4yLDBjLTQuOCwwLTkuMSwxLjctMTIuNyw0LjNjLTUuMywzLjktOC44LDEwLjItOC44LDE3LjNjMCwwLjktMC4yLDE0OC4zLTAuMiwxNDkuMQ0KCQkJCWMwLDQuNSwxLjQsOC43LDMuOCwxMi4yYzMuOSw1LjcsMTAuNSw5LjUsMTcuOSw5LjVjMSwwLDEuOS0wLjIsMi45LTAuM2MwLjktMC4xLDEuNy0wLjMsMi42LTAuNWM3LjEtMS42LDEyLjgtNC45LDEyLjgtNC45DQoJCQkJbDYzLjUtMzYuN2wxOC41LTAuOGwtMzEuMS0yOEw4OSwxNjUuMnoiLz4NCgkJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNDQuMiw4OC45bDI3LjgsMTYuNmwtMTguNSwyMS4xbDUuNiwzNy40bDM1LjctMjAuNmMyLjYtMS41LDQuOS0zLDYuOC00LjVjMS41LTEsMi44LTIuMiw0LTMuNQ0KCQkJCWMzLjUtMy45LDUuNy04LjksNS43LTE0LjZjMC00LjQtMS4zLTguNC0zLjUtMTEuOGMtMS0xLjYtMi4zLTMtMy43LTQuM2MtNC42LTQuNS05LjMtNy4zLTkuMy03LjNsLTU5LjctMzQuNUwxNDQuMiw4OC45eiIvPg0KCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIyNC40LDk4LjRsLTAuMS0wLjJjLTEuOC0yLjgtNC01LjQtNi42LTcuN2MtNS45LTUuOC0xMS44LTkuMy0xMy0xMEw4OC4yLDEzLjNjLTMuNS0yLTYuOS0zLjctMTAuMy01DQoJCQkJYy01LjYtMi42LTExLjUtNC0xNy41LTRjLTAuNCwwLTAuOCwwLTEuMiwwYy04LjQsMC4yLTE2LjUsMy4xLTIzLjQsOC4yYy01LDMuNy05LjIsOC42LTEyLjEsMTQuMWMtMyw1LjgtNC42LDEyLjMtNC42LDE4LjkNCgkJCQljMCwwLjYtMC4xLDQ0LjMtMC4xLDc3LjFsLTAuMSw0NGMwLDE2LjUsMCwyNy44LDAsMjguMWMwLDguMywyLjUsMTYuMyw3LjIsMjMuMmM3LjcsMTEuMywyMC40LDE4LDM0LjEsMThjMi4yLDAsMy45LTAuMiw1LTAuNA0KCQkJCWwwLjgtMC4xYzEuMy0wLjIsMi42LTAuNCwzLjktMC43YzkuNC0yLjEsMTYuOS02LjIsMTguMy03bDExNi41LTY3LjJjMy0xLjgsNS45LTMuNiw4LjUtNS42YzIuNS0xLjcsNC44LTMuNyw3LTYuMQ0KCQkJCWM3LTcuNiwxMC45LTE3LjUsMTAuOS0yNy44QzIzMSwxMTIuOCwyMjguNywxMDUuMSwyMjQuNCw5OC40eiIvPg0KCQkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTYwLjIsMjMzLjFjLTEyLjgsMC0yNC43LTYuMy0zMS44LTE2LjhjLTQuNC02LjQtNi43LTEzLjktNi43LTIxLjdjMC0wLjQsMC4yLTE0OC41LDAuMi0xNDkuMQ0KCQkJCWMwLTYuMSwxLjUtMTIuMiw0LjMtMTcuNmMyLjctNS4yLDYuNi05LjcsMTEuMy0xMy4yYzYuNC00LjgsMTQtNy40LDIxLjktNy42YzAuMywwLDAuNywwLDEsMGM1LjYsMCwxMS4yLDEuMywxNi40LDMuOA0KCQkJCWMzLjQsMS4zLDYuNiwyLjksMTAuMSw0LjlsMTE2LjQsNjcuMmMwLjcsMC40LDYuNiwzLjksMTIuNSw5LjZjMi40LDIuMiw0LjUsNC43LDYuMiw3LjJsMC4xLDAuMWM0LDYuMiw2LjIsMTMuNSw2LjIsMjAuOQ0KCQkJCWMwLDkuNi0zLjYsMTguOS0xMC4yLDI2Yy0yLjEsMi4zLTQuMyw0LjItNi42LDUuOGMtMi40LDEuOS01LjIsMy43LTguMiw1LjRMODYuOSwyMjUuMmMtMS40LDAuOC04LjUsNC43LTE3LjUsNi43DQoJCQkJYy0xLjIsMC4zLTIuNSwwLjUtMy43LDAuN2wtMC43LDAuMUM2My45LDIzMi45LDYyLjIsMjMzLjEsNjAuMiwyMzMuMXoiLz4NCgkJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0yMDQuMiwxMDQuN2MtNC42LTQuNS05LjMtNy4zLTkuMy03LjNsLTU5LjctMzQuNWw5LjEsMjUuOWwyNy44LDE2LjZsLTE4LjUsMjEuMWw1LjYsMzcuNGwzNS43LTIwLjYNCgkJCQljMi42LTEuNSw0LjktMyw2LjgtNC41YzEuNS0xLDIuOC0yLjIsNC0zLjVjMy41LTMuOSw1LjctOC45LDUuNy0xNC42YzAtNC40LTEuMy04LjQtMy41LTExLjgNCgkJCQlDMjA2LjksMTA3LjMsMjA1LjYsMTA1LjksMjA0LjIsMTA0Ljd6Ii8+DQoJCQk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNODksMTY1LjJsMTEuNy01My43bC0zMS00Ni4zbDQ0LjEsMTEuMWwxNi4zLTI3LjhsLTksNi4zTDc4LjQsMzAuMmMtMy0xLjgtNS44LTMuMS04LjQtNC4xDQoJCQkJYy0yLjktMS41LTYuMS0yLjQtOS42LTIuNGMtMC4xLDAtMC4xLDAtMC4yLDBjLTQuOCwwLTkuMSwxLjctMTIuNyw0LjNjLTUuMywzLjktOC44LDEwLjItOC44LDE3LjNjMCwwLjktMC4yLDE0OC4zLTAuMiwxNDkuMQ0KCQkJCWMwLDQuNSwxLjQsOC43LDMuOCwxMi4yYzMuOSw1LjcsMTAuNSw5LjUsMTcuOSw5LjVjMSwwLDEuOS0wLjIsMi45LTAuM2MwLjktMC4xLDEuNy0wLjMsMi42LTAuNWM3LjEtMS42LDEyLjgtNC45LDEyLjgtNC45DQoJCQkJbDYzLjUtMzYuN2wxOC41LTAuOGwtMzEuMS0yOEw4OSwxNjUuMnoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K');
            }

            #splashScreen{contain:strict;position:fixed;top:0;left:0;width:100%;height:100%;background-color:#011621;z-index:5000;display:flex;justify-content:center;align-items:center;flex-direction:column;}#splashScreen h1{color:#fff;margin-top:1em;margin-bottom:0;font-size:1em}#splashScreen h1.fade-in{-webkit-animation:fade-in .3s ease-out both;animation:fade-in .3s ease-out both}#splashScreen.fade-out{-webkit-animation:fade-out .2s ease-in both;animation:fade-out .2s ease-in both;background-color:#0098eb}#splashScreen .icon{will-change: transform;width:55px;height:55px;max-height:55px;max-width:55px;background-image:var(--splashScreenIcon);background-position:50% 50%; background-size: contain}#splashScreen .icon.zoom-in{-webkit-animation:zoom-in .5s ease-out both;animation:zoom-in .5s ease-out both}#splashScreen .icon.zoom-out{-webkit-animation:zoom-out .5s ease-in both;animation:zoom-out .5s ease-in both}#splashScreen .icon.rotate{}#splashScreen .icon.zoom-out-rotate{-webkit-animation:zoom-out-rotate .5s ease-in both;animation:zoom-out-rotate .5s ease-in both}@media only screen and (max-width:640px){#splashScreen{display:flex}}@-webkit-keyframes zoom-out{0%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);opacity:1}50%{opacity:.25}100%{-webkit-transform:scale3d(50,50,50);transform:scale3d(50,50,50);opacity:0}}@keyframes zoom-out{0%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);opacity:1}50%{opacity:.25}100%{-webkit-transform:scale3d(50,50,50);transform:scale3d(50,50,50);opacity:0}}@-webkit-keyframes zoom-in{0%{-webkit-transform:scale3d(0,0,0);transform:scale3d(0,0,0);opacity:0}100%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);opacity:1}}@keyframes zoom-in{0%{-webkit-transform:scale3d(0,0,0);transform:scale3d(0,0,0);opacity:0}100%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);opacity:1}}@-webkit-keyframes zoom-out-rotate{0%{-webkit-transform:scale3d(1,1,1) rotate(0);transform:scale3d(1,1,1) rotate(0);opacity:1}50%{opacity:.25}100%{-webkit-transform:scale3d(5,5,5) rotate(310deg);transform:scale3d(5,5,5) rotate(310deg);opacity:0}}@keyframes zoom-out-rotate{0%{-webkit-transform:scale3d(1,1,1) rotate(0);transform:scale3d(1,1,1) rotate(0);opacity:1}50%{opacity:.25}100%{-webkit-transform:scale3d(5,5,5) rotate(310deg);transform:scale3d(5,5,5) rotate(310deg);opacity:0}}@-webkit-keyframes rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes fade-out{0%{opacity:1}100%{opacity:0}}@keyframes fade-out{0%{opacity:1}100%{opacity:0}}@-webkit-keyframes fade-in{0%{opacity:0}100%{opacity:1}}@keyframes fade-in{0%{opacity:0}100%{opacity:1}}
        </style>
        <link rel="icon" href="./favicon.svg" sizes="any" type="image/svg+xml">
       
    </head>
    <body id="application" class="menu-hide ">

        <div id="camera">
        </div>
        <div id="windowsContainer">
        </div>

        <div class="appcnt">

            <div id="headerWrapper">
            </div>

            <div id="menuWrapper">
            </div> 

            <div id="panelWrapper">
            </div> 

            <div id="navigationWrapper">
            </div> 

            <div class="topPreloader" id="_topPreloader">
            </div>

            <div id="splashScreen" class="cssanimation">
                <div class="icon zoom-in rotate"></div>
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

            <div class="contentWrapper"> 
                <div id="content">                
                </div>
            </div>
            

            <div id="footerWrapper">
                
            </div>

        </div>


        <div id="matrix" class="matrix"></div>
        <div id="bastyonCalls"></div>


       <!-- <script src="cordova.js"></script>-->
                
        <script type="text/javascript">

            _Node = false;
            
        </script>

        
        

        __JSENV__
        __JS__
        __CSS__
        __VE__
        __JSPOST__

        <script async src="js/pwa-service-worker.js?v=v__PACKAGE-VERSION__"></script>

        <div id="hideallnotificationsel"></div>

        
        


    </body>
</html>
