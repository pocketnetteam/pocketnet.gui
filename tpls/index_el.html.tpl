<!doctype html>
<html class="no-js electronapp customscroll applicationhtml" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Cache-Control" content="no-cache">
        <meta http-equiv='expires' content='0'>
        <meta http-equiv="X-Frame-Options: SAMEORIGIN">

        <!-- <title>__VAR__.name</title> -->
        <meta name="description" content="">
        <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1, user-scalable=no">
        <meta name="fragment" content="!">
        <meta name="keywords" content="" />

        <meta http-equiv="Content-Security-Policy" content="
        default-src https: 'self' file: __VAR__.domain:*; 
        connect-src https: data: wss: http: ws: file: data: blob:;
        img-src 'self' blob: data: http: https: file:;
        script-src 'self' blob: https://__VAR__.domain https://player.vimeo.com https://www.youtube.com https://s.ytimg.com https://cdn.jsdelivr.net/joypixels/ https://cdnjs.cloudflare.com/ajax/libs/lamejs/ 'unsafe-eval' 'unsafe-inline';
        frame-src 'self' https://__VAR__.domain https://player.vimeo.com https://www.youtube.com https://www.brighteon.com  https://stream.brighteon.com;
        style-src 'self' data: __VAR__.domain:* https://cdn.jsdelivr.net/joypixels/ https://use.fontawesome.com 'unsafe-inline' ;
        font-src 'self' data: __VAR__.domain:* https://use.fontawesome.com;
        media-src data: blob: *">

        <link rel="manifest" href="manifest.json">
        <link rel="apple-touch-icon" href="img/res/blue_pad_250.png" sizes="250x250">
        <meta name="theme-color" content="#011621" />

        <link rel="stylesheet" href="css/normalize.css?v=136">
        <!-- Place favicon.ico in the root directory -->        
        <link rel="icon" href="favicon.svg" sizes="any" type="image/svg+xml">

        <link rel="stylesheet" href="css/tooltipster.core.min.css?v=487681635664">
        <link rel="stylesheet" href="css/tooltipster.bundle.min.css?v=748159927557">
        <link rel="stylesheet" href="css/main.css?v=503197461855">
        <link rel="stylesheet" href="css/common.css?v=503197461855">
        <link rel="stylesheet" href="css/plyr.css?v=1">        

        <link rel="stylesheet" href="css/openapi.css?v=815525481864">
        <link rel="stylesheet" href="css/fontawesome/css/all.css">
        <link rel="stylesheet" href="peertube/video-embed.css">

        <script src="js/vendor/device.js?v=136"></script>
        <script src="js/vendor/modernizr-2.8.3.min.js?v=136"></script>
        <script src="https://__VAR__.domain/js/widgets.js?v=136"></script>

        <style type="text/css">
            :root {
                --splashScreenIcon: url('data:image/svg+xml;base64,PHN2ZyBpZD0i0KHQu9C+0LlfMSIgZGF0YS1uYW1lPSLQodC70L7QuSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTA5Ljk3IDUwOC44MSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOnVybCgj0JHQtdC30YvQvNGP0L3QvdGL0Llf0LPRgNCw0LTQuNC10L3Rgl83KTt9LmNscy0ye2ZpbGw6dXJsKCPQkdC10LfRi9C80Y/QvdC90YvQuV/Qs9GA0LDQtNC40LXQvdGCXzctMik7fS5jbHMtM3tmaWxsOnVybCgj0JHQtdC30YvQvNGP0L3QvdGL0Llf0LPRgNCw0LTQuNC10L3Rgl83LTMpO30uY2xzLTR7ZmlsbDp1cmwoI9CR0LXQt9GL0LzRj9C90L3Ri9C5X9Cz0YDQsNC00LjQtdC90YJfNy00KTt9PC9zdHlsZT48bGluZWFyR3JhZGllbnQgaWQ9ItCR0LXQt9GL0LzRj9C90L3Ri9C5X9Cz0YDQsNC00LjQtdC90YJfNyIgeDE9Ijg1Ljg5IiB5MT0iMjU5LjM3IiB4Mj0iODUuODkiIHkyPSIyLjkxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDBhNGZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTQyMTYzIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ItCR0LXQt9GL0LzRj9C90L3Ri9C5X9Cz0YDQsNC00LjQtdC90YJfNy0yIiB4MT0iMjU0LjYiIHkxPSI4NS44OSIgeDI9IjUwNi43MyIgeTI9Ijg1Ljg5IiB4bGluazpocmVmPSIj0JHQtdC30YvQvNGP0L3QvdGL0Llf0LPRgNCw0LTQuNC10L3Rgl83Ii8+PGxpbmVhckdyYWRpZW50IGlkPSLQkdC10LfRi9C80Y/QvdC90YvQuV/Qs9GA0LDQtNC40LXQvdGCXzctMyIgeDE9IjQyNC40MiIgeTE9IjI1Mi4xOCIgeDI9IjQyOC4yOCIgeTI9IjUxMi44MyIgeGxpbms6aHJlZj0iI9CR0LXQt9GL0LzRj9C90L3Ri9C5X9Cz0YDQsNC00LjQtdC90YJfNyIvPjxsaW5lYXJHcmFkaWVudCBpZD0i0JHQtdC30YvQvNGP0L3QvdGL0Llf0LPRgNCw0LTQuNC10L3Rgl83LTQiIHgxPSIyNTUuNTciIHkxPSI0MjMuMDUiIHgyPSIwLjQ0IiB5Mj0iNDIzLjA1IiB4bGluazpocmVmPSIj0JHQtdC30YvQvNGP0L3QvdGL0Llf0LPRgNCw0LTQuNC10L3Rgl83Ii8+PC9kZWZzPjx0aXRsZT5wb2NrZXRuZXQgbG9nbyDRhtCy0LXRgjwvdGl0bGU+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTA2LjMxLDMzNy4yOWMtLjI0LS40NC0uNDgtLjg4LS43My0xLjMyaDBhMTY5LjM5LDE2OS4zOSwwLDAsMSw2Ni4xOS0yMjkuNjRsLTQzLTY0LjI1QzEwOS4zLDUzLDk2LjIsNjMuNTksODAsNzkuODNhMjQ2Ljg0LDI0Ni44NCwwLDAsMC00MSwyOTQuNDloMGEzOC42NSwzOC42NSwwLDAsMSw1LDE5LjA2LDM4LjcxLDM4LjcxLDAsMCwxLTExLjM1LDI3LjQ0TDAsNDUzLjM0bDU0LjQ1LDU0LjQ1TDg4LDQ3NC4xYTExNi4xNSwxMTYuMTUsMCwwLDAsMTcuNTEtMjMuMiwxMTUuOCwxMTUuOCwwLDAsMCwuOC0xMTMuNjFaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNDI5LjksODBhMjQ2Ljg0LDI0Ni44NCwwLDAsMC0yOTQuNDktNDFoMGEzOC42NiwzOC42NiwwLDAsMS0xOS4wNiw1QTM4LjcxLDM4LjcxLDAsMCwxLDg4LjkxLDMyLjU2TDU2LjM5LDAsMS45NCw1NC40NSwzNS42Myw4OGExMTUuMzUsMTE1LjM1LDAsMCwwLDgwLjcyLDMyLjgsMTE1LjIsMTE1LjIsMCwwLDAsNTcuNDEtMTUuMjJoMGExNjkuMzksMTY5LjM5LDAsMCwxLDIyOS42NCw2Ni4xOWw2NS41Mi00MS4xOEM0NTgsMTExLjExLDQ0Ni4xNCw5Ni4yLDQyOS45LDgwWiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTQzMCw0MjkuMzhhMjQ2Ljg0LDI0Ni44NCwwLDAsMCw0MS0yOTQuNDloMGEzOC44NSwzOC44NSwwLDAsMSw2LjM2LTQ2LjVMNTEwLDU1Ljg3LDQ1NS41MywxLjQyLDQyMiwzNS4xMWExMTUuNzksMTE1Ljc5LDAsMCwwLTE3LjU4LDEzOC4xM2gwYTE2OS4zOSwxNjkuMzksMCwwLDEtNjYuMTksMjI5LjY0bDQ0LjMzLDYzLjY0QzQwMiw0NTUuNTksNDEzLjc3LDQ0NS42Miw0MzAsNDI5LjM4WiIvPjxwYXRoIGNsYXNzPSJjbHMtNCIgZD0iTTQ3NC41NSw0MjAuOGExMTUuNzksMTE1Ljc5LDAsMCwwLTEzOC4xMy0xNy41OGgwYTE3MC4xMSwxNzAuMTEsMCwwLDEtMjMwLjEtNjUuOTJoMGExMTUuOCwxMTUuOCwwLDAsMS0uOCwxMTMuNjEsMjQ3LDI0NywwLDAsMCwyNjkuMjUsMTloMGEzOC44NSwzOC44NSwwLDAsMSw0Ni41LDYuMzZsMzIuNTIsMzIuNTYsNTQuNDUtNTQuNDVaIi8+PC9zdmc+');
            }

            #splashScreen{contain:strict;position:fixed;top:0;left:0;width:100%;height:100%;background-color:#011621;z-index:5000;display:flex;justify-content:center;align-items:center;flex-direction:column;}#splashScreen h1{color:#fff;margin-top:1em;margin-bottom:0;font-size:1em}#splashScreen h1.fade-in{-webkit-animation:fade-in .3s ease-out both;animation:fade-in .3s ease-out both}#splashScreen.fade-out{-webkit-animation:fade-out .2s ease-in both;animation:fade-out .2s ease-in both;background-color:#0098eb}#splashScreen .icon{will-change: transform;width:55px;height:55px;max-height:55px;max-width:55px;background-image:var(--splashScreenIcon);background-position:50% 50%; background-size: contain}#splashScreen .icon.zoom-in{-webkit-animation:zoom-in .5s ease-out both;animation:zoom-in .5s ease-out both}#splashScreen .icon.zoom-out{-webkit-animation:zoom-out .5s ease-in both;animation:zoom-out .5s ease-in both}#splashScreen .icon.rotate{-webkit-animation:rotate 1s ease-in-out infinite both;animation:rotate 1s ease-in-out infinite both}#splashScreen .icon.zoom-out-rotate{-webkit-animation:zoom-out-rotate .5s ease-in both;animation:zoom-out-rotate .5s ease-in both}@media only screen and (max-width:640px){#splashScreen{display:flex}}@-webkit-keyframes zoom-out{0%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);opacity:1}50%{opacity:.25}100%{-webkit-transform:scale3d(50,50,50);transform:scale3d(50,50,50);opacity:0}}@keyframes zoom-out{0%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);opacity:1}50%{opacity:.25}100%{-webkit-transform:scale3d(50,50,50);transform:scale3d(50,50,50);opacity:0}}@-webkit-keyframes zoom-in{0%{-webkit-transform:scale3d(0,0,0);transform:scale3d(0,0,0);opacity:0}100%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);opacity:1}}@keyframes zoom-in{0%{-webkit-transform:scale3d(0,0,0);transform:scale3d(0,0,0);opacity:0}100%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);opacity:1}}@-webkit-keyframes zoom-out-rotate{0%{-webkit-transform:scale3d(1,1,1) rotate(0);transform:scale3d(1,1,1) rotate(0);opacity:1}50%{opacity:.25}100%{-webkit-transform:scale3d(5,5,5) rotate(310deg);transform:scale3d(5,5,5) rotate(310deg);opacity:0}}@keyframes zoom-out-rotate{0%{-webkit-transform:scale3d(1,1,1) rotate(0);transform:scale3d(1,1,1) rotate(0);opacity:1}50%{opacity:.25}100%{-webkit-transform:scale3d(5,5,5) rotate(310deg);transform:scale3d(5,5,5) rotate(310deg);opacity:0}}@-webkit-keyframes rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes fade-out{0%{opacity:1}100%{opacity:0}}@keyframes fade-out{0%{opacity:1}100%{opacity:0}}@-webkit-keyframes fade-in{0%{opacity:0}100%{opacity:1}}@keyframes fade-in{0%{opacity:0}100%{opacity:1}}
        </style>
       
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

            <div id="splashScreen" class="cssanimation">
                <div class="icon zoom-in rotate"></div>
            </div>

        
            <div id="hideallnotifications"></div>

            <div id="globalpreloader">
                <div class="table">
                    <div>
                        <div class="icon">
                            <i class="fas fa-spinner fa-spin"></i>
                        </div>
                    </div>
                
                </div>
            </div>

            <div class="electronnav" id="electronnavContainer">
            </div>

            <div class="contentWrapper "> 
                <div id="content">                
                </div>
            </div>

            <div id="footerWrapper">
                
            </div>

            <div class="topPreloader" id="_topPreloader">
            </div>
        </div>

        </div>
            <div id="matrix" class="matrix">
        </div>
        <div id="bastyonCalls"></div>


        
        <script>window.$ = window.jQuery = require('./js/vendor/jquery.js');</script>
        

        <script type="text/javascript">
            
            _Node = false;
            _Electron = true;

            window.global = window;
            window.process = window;
            window.process.browser = true;
            window.process.version = '';
            window.process.versions = {node: false};

            topPreloader = function(percent){
                return
                var el = $('#_topPreloader');


                var div = $("<div>");
                    el.removeClass('complete');
                    el.append(div);

                    var inip = el.attr('percent') || 0;

                    el.attr('percent', percent); 

                    div.width((percent - inip) + "%")

                if(percent <= 0 || percent >= 100){


                    el.addClass('complete');
                    el.attr('percent', 0); 

                    setTimeout(function(){

                        el.fadeOut(300);

                        setTimeout(function(){


                            el.html('');

                        },300)

                    },500)
                    
                }
                else{
                    el.fadeIn(1);
                }
                
            }

            topPreloader(15)
            
        </script>

        <script src="js/vendor/underscore-min.js?v=136"></script> 
        <script src="js/vendor/tooltipster.core.js"></script>
        <script src="js/vendor/tooltipster.bundle.js"></script>
        <script  join src="js/vendor/moment.min.js?v=89"></script>
        <script  join src="js/vendor/ua-parser.min.js"></script>
        <script  join src="js/vendor/moment.locale.js?v=89"></script>
        
        <!--<script src="js/vendor/imagesloaded.pkgd.js"></script> -->
        <script src="js/vendor/timer.js"></script>
        <script src="js/vendor/autosize.min.js"></script>
        <script src="js/vendor/ion.sound/ion.sound.js"></script>   

        <script src="js/vendor/linkify.min.js"></script>
        <script src="js/vendor/linkify-html.min.js"></script>
        <script src="js/vendor/jquery.inputmask.bundle.js"></script>

        __VAR__.test
 
        <script join src="js/vendor/aesjs.js"></script>
        <script join src="js/lib/pocketnet/btc17.js?v=4"></script>
        <script join src="js/lib/pocketnet/buffer.js?v=4"></script>
        <script join src="js/lib/client/system16.js?v=4"></script>
        <script join src="js/lib/client/api.js?v=4"></script>       
        <script src="js/vendor/pbkdf2.js"></script>
        <script src="js/vendor/sha1.js"></script>   

        <script src="js/vendor/paste.js"></script> 
        <script src="js/vendor/jquery.md5.js?v=136"></script>
        <script src="js/vendor/joypixels.js"></script>
        <script join src="js/vendor/hammer.min.js?v=89"></script>
        <script join src="js/vendor/owl/owl.carousel.js?v=90"></script>
        <script src="js/vendor/plyr.js?v=1"></script>
        <script src="js/vendor/reconnectingwebsocket.js?v=136"></script>
        <script src="js/vendor/mark.js"></script>
        <script src="js/vendor/hc-sticky.js"></script>
        <script join src="js/vendor/axios.js"></script>

        __JSENV__

        <script>window.design = true;</script>
        <script join src="js/functionsfirst.js?v=138441565214"></script>
        <script join src="js/functions.js?v=138441565214"></script>
        <script join src="js/kit.js"></script>
        <script join src="js/user.js?v=101388250711"></script>
        <script join src="js/module.js?v=908573389519"></script>
        <script join src="js/navn.js?v=533010043902"></script>
        <script join src="js/validation.js?v=325793338940"></script>
        <script join src="js/_map.js?v=147657511756"></script>
        <script join src="js/localization.js?v=439731354592"></script>
        <script join src="js/satolist.js?v=439731354592"></script>
        <script join src="peertube/video-embed.bundle.js"></script>
        <script join src="js/peertube.js"></script>
        <script join src="js/lib/client/p2pvideo.js"></script>
        <script join src="js/logger.js"></script>
        <script join src="js/videotransport.js"></script>
        <script join src="js/app.js?v=322676503798"></script>
        <script join src="js/main.js?v=723212304292"></script>       
        <script join src="chat/matrix-element.min.js"></script>    
        <script async src="js/pwa-service-worker.js"></script>
    </body>
</html>
