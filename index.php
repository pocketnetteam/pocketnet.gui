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
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
        <meta name="fragment" content="!">
        <meta name="keywords" content="Blockchain, Decentralized, Delete Facebook, Alternative Social Media, Social Network, Social Platform, No Censorship, Online Social Network, Facebook Alternative, Reddit Alternative, Twitter Alternative, Social Sharing Platform, Decentralized Social Network, Blockchain Social Network " />

        <meta http-equiv="Content-Security-Policy" content="
        default-src https: 'self'; 
        connect-src https: wss:;
        img-src 'self' data: https:;
        script-src 'self' https://pocketnet.app https://player.vimeo.com https://www.youtube.com https://s.ytimg.com https://cdn.rawgit.com https://embed.tawk.to https://cdn.jsdelivr.net 'unsafe-eval' 'unsafe-inline';
        style-src 'self'  https://use.fontawesome.com https://fonts.googleapis.com https://cdn.jsdelivr.net 'unsafe-inline';
        font-src 'self' https://fonts.gstatic.com https://static-v.tawk.to https://use.fontawesome.com;
        media-src *">

        <?php 
        
            require_once('php/og.php'); 

            $og = new OG($_GET);

            $og->get();
            $og->echotags();
        ?>

        <link rel="stylesheet" href="css/normalize.css?v=714786054518">
<link rel="stylesheet" href="css/tooltipster.core.min.css?v=818541865459">
<link rel="stylesheet" href="css/tooltipster.bundle.min.css?v=980789615021">
<link rel="stylesheet" href="css/main.css?v=490539114481">
<link rel="stylesheet" href="css/stblack.css?v=118207406610">
<link rel="stylesheet" href="css/plyr.css?v=376570464912">
<link rel="stylesheet" href="css/jquery-ui.min.css?v=976468030301">
<link rel="stylesheet" href="css/medium/medium-editor.css?v=78236645831">
<link rel="stylesheet" href="css/medium/medium-editor-insert-plugin.css?v=735573568236">
<link rel="stylesheet" href="css/medium/beagle.css?v=611758137510">

        
        <link rel="stylesheet" href="css/fontawesome/css/all.css">

        <script src="js/vendor/device.min.js?v=136"></script>
        <script src="js/vendor/modernizr-2.8.3.min.js?v=136"></script>


       
       
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

        <div class="chats">
        </div>

        
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
                

        <script src="js/vendor/jquery-1.11.3.min.js?v=12"></script>

        <script src="js/vendor/vue/vue.js"></script>
        <script src="js/vendor/vue/webcomponents-bundle.js"></script>
        <script src="js/vendor/vue/vue.min.js"></script>
        

        <script type="text/javascript">

            _Node = false;
            
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

        <script join src="js/vendor/underscore-min.js?v=7"></script>
<script join src="js/vendor/fingerprint2.js?v=7"></script>
<script join src="js/vendor/tooltipster.core.js?v=7"></script>
<script join src="js/vendor/tooltipster.bundle.js?v=7"></script>
<script join src="js/vendor/jquery-ui.min.js?v=7"></script>
<script join src="js/vendor/imagesloaded.pkgd.min.js?v=7"></script>
<script join src="js/vendor/timer.js?v=7"></script>
<script join src="js/vendor/ion.sound/ion.sound.min.js?v=7"></script>
<script join src="js/vendor/aesjs.js?v=7"></script>
<script join src="js/vendor/linkify.min.js?v=7"></script>
<script join src="js/vendor/linkify-html.min.js?v=7"></script>
<script join src="js/lib/pocketnet/btc17.js?v=7"></script>
<script join src="js/lib/pocketnet/buffer.js?v=7"></script>
<script join src="js/lib/client/system16.js?v=7"></script>
<script join src="js/lib/client/api.js?v=7"></script>
<script join src="js/vendor/pbkdf2.js?v=7"></script>
<script join src="js/vendor/sha1.js?v=7"></script>
<script join src="js/vendor/jdenticon.js?v=7"></script>
<script join src="js/vendor/paste.js?v=7"></script>
<script join src="js/vendor/jquery.md5.js?v=7"></script>
<script join src="js/vendor/jquery.animate-number.js?v=7"></script>
<script join src="js/vendor/jquery.touchSwipe.js?v=7"></script>
<script join src="js/vendor/emojione.js?v=7"></script>
<script join src="js/vendor/plyr.js?v=7"></script>
<script join src="js/vendor/reconnectingwebsocket.js?v=7"></script>
<script join src="js/vendor/rtc/db.js?v=7"></script>
<script join src="js/vendor/xss.min.js?v=7"></script>
<script join src="js/vendor/jquery.mark.js?v=7"></script>
<script join src="js/vendor/hc-sticky.js?v=7"></script>

        
        <script>window.design = true;</script><script join src="js/functions.js?v=94411702724"></script>
<script join src="js/user.js?v=143028926183"></script>
<script join src="js/module.js?v=515165537289"></script>
<script join src="js/navn.js?v=872520979555"></script>
<script join src="js/validation.js?v=619473786169"></script>
<script join src="js/_map.js?v=573231318717"></script>
<script join src="js/localization.js?v=801007479961"></script>
<script join src="js/kit.js?v=655374642678"></script>
<script join src="js/satolist.js?v=826385584322"></script>
<script join src="js/messenger2/clientrtc.js?v=291491299329"></script>
<script join src="js/peertube-master.js?v=388676760051"></script>
<script join src="js/app.js?v=20166536893"></script>
<script join src="js/main.js?v=688246826920"></script>



        <script type="text/javascript">

            topPreloader(100);
            
        </script>

        <script src="chat/matrix-element.min.js"></script>

       

    </body>
</html>
