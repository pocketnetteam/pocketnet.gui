<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Cache-Control" content="no-cache">
        <meta http-equiv='expires' content='0'>
        

        <title>POCKETNET</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
        <meta name="fragment" content="!">
        <meta name="keywords" content="" />

        <link rel="stylesheet" href="css/normalize.css?v=136">
        <!-- Place favicon.ico in the root directory -->        

        __CSS__

        

        <link rel="stylesheet" href="https://cdn.plyr.io/3.4.4/plyr.css">
        
        <link rel="stylesheet" href="css/jquery-ui.min.css?v=136">

        <link rel="stylesheet" href="css/medium/medium-editor.css">
        <link rel="stylesheet" href="css/medium/medium-editor-insert-plugin.css?v=136">
        <link rel="stylesheet" href="css/medium/beagle.css?v=136">

        <link rel="stylesheet" href="css/datetime.css?v=136">        
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
            
     
        
        <script src="js/vendor/device.min.js?v=136"></script>
        <script src="js/vendor/modernizr-2.8.3.min.js?v=136"></script>

         
       
    </head>
    <body id="application" class="menu-hide">

        <div id="headerWrapper">
        </div>

        <div id="menuWrapper">
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

        <div class="topPreloader">
        </div>

        <div class="chats">
        </div>


       <!-- <script src="cordova.js"></script>-->
                

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.3.min.js"><\/script>')</script>

        <script type="text/javascript">

            _Node = false;
            
            topPreloader = function(percent){
                var el = $('.topPreloader');


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
        <script src="js/vendor/jquery-ui.min.js"></script>
        <script src="js/vendor/imagesloaded.pkgd.min.js"></script> 
        <script src="js/vendor/timer.js"></script>
        <!--<script src="js/vendor/autosize.min.js"></script>-->
        <script src="js/vendor/ion.sound/ion.sound.min.js"></script>   
        <script join src="js/vendor/aesjs.js"></script>
        <script join src="js/vendor/btc/src/btc.js"></script>
        <script src="js/vendor/pbkdf2.js"></script>
        <script src="js/vendor/sha1.js"></script>   
        <script src="js/vendor/jdenticon.js"></script>
        <script src="js/vendor/paste.js"></script> 
        <script src="js/vendor/jquery.md5.js?v=136"></script>
        <script src="js/vendor/jquery.animateNumber.min.js?v=136"></script>
        <script src="js/vendor/emojione.js?v=136"></script>
        <script src="js/vendor/plyr.js?v=136"></script>
        <script src="js/vendor/rtc/RTCMultiConnection.min.js?v=136"></script>
        <script src="js/vendor/rtc/socket.io.js"></script>
        <script src="js/vendor/rtc/db.js"></script>

        __JS__


        <script type="text/javascript">

            topPreloader(100);
            
        </script>

        <!-- Global site tag (gtag.js) - Google Analytics -->
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-131365418-1"></script> 
            <script>
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'UA-131365418-1');
            </script> 

        
          <!--
        <script type="text/javascript">

            if(!isMobile()){
                var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/5c3075947a79fc1bddf36050/default';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
                })();
            }

      
        </script>
     -->
    </body>
</html>
