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
        <script src="js/widgets.js?v=136"></script>

        <style type="text/css">
            :root {
                --splashScreenIcon: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyOC4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0i0KHQu9C+0LlfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIyNDBweCIgaGVpZ2h0PSIyNDBweCIgdmlld0JveD0iMCAwIDI0MCAyNDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI0MCAyNDA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOm5vbmU7fQ0KCS5zdDF7ZmlsbDojQ0NDQkNCO30NCgkuc3Qye2ZpbGw6I0ZGRkZGRjt9DQoJLnN0M3tmaWxsOiNFMDIwM0M7fQ0KCS5zdDR7ZmlsbDojMUIyRTVBO30NCjwvc3R5bGU+DQo8Zz4NCgk8Zz4NCgkJPGc+DQoJCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNODksMTY1LjJsMTEuNy01My43bC0zMS00Ni4zbDQ0LjEsMTEuMWwxNi4zLTI3LjhsLTksNi4zTDc4LjQsMzAuMmMtMy0xLjgtNS44LTMuMS04LjQtNC4xDQoJCQkJYy0yLjktMS41LTYuMS0yLjQtOS42LTIuNGMtMC4xLDAtMC4xLDAtMC4yLDBjLTQuOCwwLTkuMSwxLjctMTIuNyw0LjNjLTUuMywzLjktOC44LDEwLjItOC44LDE3LjNjMCwwLjktMC4yLDE0OC4zLTAuMiwxNDkuMQ0KCQkJCWMwLDQuNSwxLjQsOC43LDMuOCwxMi4yYzMuOSw1LjcsMTAuNSw5LjUsMTcuOSw5LjVjMSwwLDEuOS0wLjIsMi45LTAuM2MwLjktMC4xLDEuNy0wLjMsMi42LTAuNWM3LjEtMS42LDEyLjgtNC45LDEyLjgtNC45DQoJCQkJbDYzLjUtMzYuN2wxOC41LTAuOGwtMzEuMS0yOEw4OSwxNjUuMnoiLz4NCgkJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNDQuMiw4OC45bDI3LjgsMTYuNmwtMTguNSwyMS4xbDUuNiwzNy40bDM1LjctMjAuNmMyLjYtMS41LDQuOS0zLDYuOC00LjVjMS41LTEsMi44LTIuMiw0LTMuNQ0KCQkJCWMzLjUtMy45LDUuNy04LjksNS43LTE0LjZjMC00LjQtMS4zLTguNC0zLjUtMTEuOGMtMS0xLjYtMi4zLTMtMy43LTQuM2MtNC42LTQuNS05LjMtNy4zLTkuMy03LjNsLTU5LjctMzQuNUwxNDQuMiw4OC45eiIvPg0KCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIyNC40LDk4LjRsLTAuMS0wLjJjLTEuOC0yLjgtNC01LjQtNi42LTcuN2MtNS45LTUuOC0xMS44LTkuMy0xMy0xMEw4OC4yLDEzLjNjLTMuNS0yLTYuOS0zLjctMTAuMy01DQoJCQkJYy01LjYtMi42LTExLjUtNC0xNy41LTRjLTAuNCwwLTAuOCwwLTEuMiwwYy04LjQsMC4yLTE2LjUsMy4xLTIzLjQsOC4yYy01LDMuNy05LjIsOC42LTEyLjEsMTQuMWMtMyw1LjgtNC42LDEyLjMtNC42LDE4LjkNCgkJCQljMCwwLjYtMC4xLDQ0LjMtMC4xLDc3LjFsLTAuMSw0NGMwLDE2LjUsMCwyNy44LDAsMjguMWMwLDguMywyLjUsMTYuMyw3LjIsMjMuMmM3LjcsMTEuMywyMC40LDE4LDM0LjEsMThjMi4yLDAsMy45LTAuMiw1LTAuNA0KCQkJCWwwLjgtMC4xYzEuMy0wLjIsMi42LTAuNCwzLjktMC43YzkuNC0yLjEsMTYuOS02LjIsMTguMy03bDExNi41LTY3LjJjMy0xLjgsNS45LTMuNiw4LjUtNS42YzIuNS0xLjcsNC44LTMuNyw3LTYuMQ0KCQkJCWM3LTcuNiwxMC45LTE3LjUsMTAuOS0yNy44QzIzMSwxMTIuOCwyMjguNywxMDUuMSwyMjQuNCw5OC40eiIvPg0KCQkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTYwLjIsMjMzLjFjLTEyLjgsMC0yNC43LTYuMy0zMS44LTE2LjhjLTQuNC02LjQtNi43LTEzLjktNi43LTIxLjdjMC0wLjQsMC4yLTE0OC41LDAuMi0xNDkuMQ0KCQkJCWMwLTYuMSwxLjUtMTIuMiw0LjMtMTcuNmMyLjctNS4yLDYuNi05LjcsMTEuMy0xMy4yYzYuNC00LjgsMTQtNy40LDIxLjktNy42YzAuMywwLDAuNywwLDEsMGM1LjYsMCwxMS4yLDEuMywxNi40LDMuOA0KCQkJCWMzLjQsMS4zLDYuNiwyLjksMTAuMSw0LjlsMTE2LjQsNjcuMmMwLjcsMC40LDYuNiwzLjksMTIuNSw5LjZjMi40LDIuMiw0LjUsNC43LDYuMiw3LjJsMC4xLDAuMWM0LDYuMiw2LjIsMTMuNSw2LjIsMjAuOQ0KCQkJCWMwLDkuNi0zLjYsMTguOS0xMC4yLDI2Yy0yLjEsMi4zLTQuMyw0LjItNi42LDUuOGMtMi40LDEuOS01LjIsMy43LTguMiw1LjRMODYuOSwyMjUuMmMtMS40LDAuOC04LjUsNC43LTE3LjUsNi43DQoJCQkJYy0xLjIsMC4zLTIuNSwwLjUtMy43LDAuN2wtMC43LDAuMUM2My45LDIzMi45LDYyLjIsMjMzLjEsNjAuMiwyMzMuMXoiLz4NCgkJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0yMDQuMiwxMDQuN2MtNC42LTQuNS05LjMtNy4zLTkuMy03LjNsLTU5LjctMzQuNWw5LjEsMjUuOWwyNy44LDE2LjZsLTE4LjUsMjEuMWw1LjYsMzcuNGwzNS43LTIwLjYNCgkJCQljMi42LTEuNSw0LjktMyw2LjgtNC41YzEuNS0xLDIuOC0yLjIsNC0zLjVjMy41LTMuOSw1LjctOC45LDUuNy0xNC42YzAtNC40LTEuMy04LjQtMy41LTExLjgNCgkJCQlDMjA2LjksMTA3LjMsMjA1LjYsMTA1LjksMjA0LjIsMTA0Ljd6Ii8+DQoJCQk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNODksMTY1LjJsMTEuNy01My43bC0zMS00Ni4zbDQ0LjEsMTEuMWwxNi4zLTI3LjhsLTksNi4zTDc4LjQsMzAuMmMtMy0xLjgtNS44LTMuMS04LjQtNC4xDQoJCQkJYy0yLjktMS41LTYuMS0yLjQtOS42LTIuNGMtMC4xLDAtMC4xLDAtMC4yLDBjLTQuOCwwLTkuMSwxLjctMTIuNyw0LjNjLTUuMywzLjktOC44LDEwLjItOC44LDE3LjNjMCwwLjktMC4yLDE0OC4zLTAuMiwxNDkuMQ0KCQkJCWMwLDQuNSwxLjQsOC43LDMuOCwxMi4yYzMuOSw1LjcsMTAuNSw5LjUsMTcuOSw5LjVjMSwwLDEuOS0wLjIsMi45LTAuM2MwLjktMC4xLDEuNy0wLjMsMi42LTAuNWM3LjEtMS42LDEyLjgtNC45LDEyLjgtNC45DQoJCQkJbDYzLjUtMzYuN2wxOC41LTAuOGwtMzEuMS0yOEw4OSwxNjUuMnoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K');
            }

            #splashScreen{contain:strict;position:fixed;top:0;left:0;width:100%;height:100%;background-color:#011621;z-index:5000;display:flex;justify-content:center;align-items:center;flex-direction:column;}#splashScreen h1{color:#fff;margin-top:1em;margin-bottom:0;font-size:1em}#splashScreen h1.fade-in{-webkit-animation:fade-in .3s ease-out both;animation:fade-in .3s ease-out both}#splashScreen.fade-out{-webkit-animation:fade-out .2s ease-in both;animation:fade-out .2s ease-in both;background-color:#0098eb}#splashScreen .icon{will-change: transform;width:55px;height:55px;max-height:55px;max-width:55px;background-image:var(--splashScreenIcon);background-position:50% 50%; background-size: contain}#splashScreen .icon.zoom-in{-webkit-animation:zoom-in .5s ease-out both;animation:zoom-in .5s ease-out both}#splashScreen .icon.zoom-out{-webkit-animation:zoom-out .5s ease-in both;animation:zoom-out .5s ease-in both}#splashScreen .icon.rotate{}#splashScreen .icon.zoom-out-rotate{-webkit-animation:zoom-out-rotate .5s ease-in both;animation:zoom-out-rotate .5s ease-in both}@media only screen and (max-width:640px){#splashScreen{display:flex}}@-webkit-keyframes zoom-out{0%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);opacity:1}50%{opacity:.25}100%{-webkit-transform:scale3d(50,50,50);transform:scale3d(50,50,50);opacity:0}}@keyframes zoom-out{0%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);opacity:1}50%{opacity:.25}100%{-webkit-transform:scale3d(50,50,50);transform:scale3d(50,50,50);opacity:0}}@-webkit-keyframes zoom-in{0%{-webkit-transform:scale3d(0,0,0);transform:scale3d(0,0,0);opacity:0}100%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);opacity:1}}@keyframes zoom-in{0%{-webkit-transform:scale3d(0,0,0);transform:scale3d(0,0,0);opacity:0}100%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);opacity:1}}@-webkit-keyframes zoom-out-rotate{0%{-webkit-transform:scale3d(1,1,1) rotate(0);transform:scale3d(1,1,1) rotate(0);opacity:1}50%{opacity:.25}100%{-webkit-transform:scale3d(5,5,5) rotate(310deg);transform:scale3d(5,5,5) rotate(310deg);opacity:0}}@keyframes zoom-out-rotate{0%{-webkit-transform:scale3d(1,1,1) rotate(0);transform:scale3d(1,1,1) rotate(0);opacity:1}50%{opacity:.25}100%{-webkit-transform:scale3d(5,5,5) rotate(310deg);transform:scale3d(5,5,5) rotate(310deg);opacity:0}}@-webkit-keyframes rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes fade-out{0%{opacity:1}100%{opacity:0}}@keyframes fade-out{0%{opacity:1}100%{opacity:0}}@-webkit-keyframes fade-in{0%{opacity:0}100%{opacity:1}}@keyframes fade-in{0%{opacity:0}100%{opacity:1}}
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
        <script src="js/vendor/wallet-address-validator.min.js?v=136"></script> 
        <script src="js/vendor/tooltipster.core.js"></script>
        <script src="js/vendor/tooltipster.bundle.js"></script>
        <script  join src="js/vendor/moment.min.js?v=89"></script>
        <script  join src="js/vendor/ua-parser.min.js"></script>
        <script  join src="js/vendor/moment.locale.js?v=89"></script>
        
        <!--<script src="js/vendor/imagesloaded.pkgd.js"></script> -->
        <script src="js/vendor/timer.js"></script>
        <script src="js/vendor/autosize.min.js"></script>
        <script src="js/vendor/ion.sound/ion.sound.js"></script>   

        <script src="js/vendor/linkify.js"></script>
        <script src="js/vendor/linkify-html.js"></script>
        <script src="js/vendor/linkify-string.js"></script>
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
        <script  join src="js/media.js"></script>
        
        __JSENV__

        <script>window.design = true;</script>
        <script join src="js/functionsfirst.js?v=138441565214"></script>
        <script join src="js/functions.js?v=138441565214"></script>
        <script join src="js/lib/client/resoursesdb.js?v=375481859972"></script>
        <script join src="js/kit.js"></script>
        <script join src="js/lib/client/actions.js?v=937458050853"></script>
        <script join src="js/lib/client/sdk.js?v=310943151538"></script>
        <script join src="js/user.js?v=101388250711"></script>
        <script join src="js/module.js?v=908573389519"></script>
        <script join src="js/navn.js?v=533010043902"></script>
        <script join src="js/validation.js?v=325793338940"></script>
        <script join src="js/_map.js?v=147657511756"></script>
        <script join src="js/localization.js?v=439731354592"></script>
        <script join src="js/satolist.js?v=439731354592"></script>
        <script join src="js/bastyonCalls/bastyonCalls.min.js"></script>
        <script join src="peertube/video-embed.bundle.js"></script>
        <script join src="js/peertube.js"></script>
        <script join src="js/lib/apps/index.js?v=463508547385"></script>
        <script join src="js/lib/client/p2pvideo.js"></script>
        <script join src="js/logger.js"></script>
        <script join src="js/videotransport.js"></script>
        <script join src="js/app.js?v=322676503798"></script>
        <script join src="js/main.js?v=723212304292"></script>       
        <script join src="chat/matrix-element.min.js"></script>    
        <script async src="js/pwa-service-worker.js"></script>

        <div id="hideallnotificationsel"></div>
    </body>
</html>
