<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Cache-Control" content="no-cache">
        <meta http-equiv='expires' content='0'>
        

        <!-- <title>POCKETNET</title> -->
        <meta name="description" content="">
        <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1, user-scalable=no">
        <meta name="fragment" content="!">
        <meta name="keywords" content="" />

        <meta http-equiv="Content-Security-Policy" content="
        default-src https: 'self' file:; 
        connect-src https: wss: file: data: blob:;
        img-src 'self' data: https: file:;
        script-src 'self' file: blob: https://__VAR__.domain https://unpkg.com/@ffmpeg/ffmpeg@0.10.0/dist/ffmpeg.min.js https://player.vimeo.com https://www.youtube.com https://s.ytimg.com https://cdn.rawgit.com https://embed.tawk.to https://cdn.jsdelivr.net 'unsafe-eval' 'unsafe-inline';
        style-src 'self' file: https://use.fontawesome.com https://fonts.googleapis.com https://cdn.jsdelivr.net 'unsafe-inline';
        font-src 'self' file: data: https://fonts.gstatic.com https://static-v.tawk.to https://use.fontawesome.com;
        media-src blob: *">

        <link rel="manifest" href="manifest.json">
        <link rel="apple-touch-icon" href="https://__VAR__.domain/img/res/blue_pad_250.png" sizes="250x250">
        <meta name="theme-color" content="#011621" />

        <link rel="stylesheet" href="css/normalize.css?v=136">
        <!-- Place favicon.ico in the root directory -->        
        <link rel="icon" href="favicon.svg" sizes="any" type="image/svg+xml">

        <link rel="stylesheet" href="css/tooltipster.core.min.css?v=487681635664">
        <link rel="stylesheet" href="css/tooltipster.bundle.min.css?v=748159927557">
        <link rel="stylesheet" href="css/main.css?v=503197461855">
        <link rel="stylesheet" href="css/stblack.css?v=276199619365">
        <link rel="stylesheet" href="css/plyr_el.css?v=1">        
        <link rel="stylesheet" href="css/jquery-ui.min.css?v=136">

        <link rel="stylesheet" href="css/medium/medium-editor.css">
        <link rel="stylesheet" href="css/medium/medium-editor-insert-plugin.css?v=136">
        <link rel="stylesheet" href="js/vendor/DateTimePicker.min.css?v=514508004319">
        <link rel="stylesheet" href="css/medium/beagle.css?v=136">

        <link rel="stylesheet" href="css/datetime.css?v=136">        

        <link rel="stylesheet" href="css/openapi.css?v=815525481864">
        <link rel="stylesheet" href="css/fontawesome/css/all.css">
        <link rel="stylesheet" href="peertube/video-embed.css">
        <script src="js/vendor/device.min.js?v=136"></script>
        <script src="js/vendor/modernizr-2.8.3.min.js?v=136"></script>
        <script src="https://__VAR__.domain/js/widgets.js?v=136"></script>
        
       
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
            <img src="img/splashscreen/pocketnet-logo-19.svg" id="splashScreenImg" class="zoom-in rotate">
        </div>

        <div class="chats">
        </div>

        </div>
            <div id="matrix" class="matrix">
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

        <!--<div class="updatingFrontend">
            <div class="table">
                <div>
                    <div class="text">
                        <span>Please be Patient: Major Release of Pocketnet is Being Prepared</span>
                    </div>

                    <div class="icon">
                        <i class="fas fa-wrench"></i>
                    </div>
                    
                </div>
               
            </div>
        </div>-->

        <script>window.$ = window.jQuery = require('./js/vendor/jquery-1.11.3.min.js');</script>
        

        <script type="text/javascript">
            
            _Node = false;
            _Electron = true;

            window.global = window;
            window.process = window;
            window.process.browser = true;
            window.process.version = '';
            window.process.versions = {node: false};

            topPreloader = function(percent){
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
        
        <!--<script src="js/vendor/imagesloaded.pkgd.min.js"></script> -->
        <script src="js/vendor/timer.js"></script>
        <script src="js/vendor/autosize.min.js"></script>
        <script src="js/vendor/ion.sound/ion.sound.min.js"></script>   

        <script src="js/vendor/linkify.min.js"></script>
        <script src="js/vendor/linkify-html.min.js"></script>
        <script src="js/vendor/jquery.inputmask.bundle.js"></script>

       
 
        <script join src="js/vendor/aesjs.js"></script>
        <script join src="js/lib/pocketnet/btc17.js?v=4"></script>
        <script join src="js/lib/pocketnet/buffer.js?v=4"></script>
        <script join src="js/lib/client/system16.js?v=4"></script>
        <script join src="js/lib/client/api.js?v=4"></script>       
        <script src="js/vendor/pbkdf2.js"></script>
        <script src="js/vendor/sha1.js"></script>   

        <script src="js/vendor/paste.js"></script> 
        <script src="js/vendor/jquery.md5.js?v=136"></script>
        <script src="js/vendor/joypixels.min.js"></script>
        
        <script src="js/vendor/plyr.js?v=1"></script>
        <script src="js/vendor/reconnectingwebsocket.js?v=136"></script>
        <script src="js/vendor/mark.js"></script>
        <script src="js/vendor/hc-sticky.js"></script>
        <script join src="js/vendor/axios.js"></script>

        __VAR__.test

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
        <script join src="js/messenger2/clientrtc.js?v=413927449417"></script>
        <script join src="peertube/video-embed.bundle.js"></script>
        <script join src="js/peertube.js"></script>
        <script join src="js/app.js?v=322676503798"></script>
        <script join src="js/main.js?v=723212304292"></script>       
       
   
    </body>
</html>
