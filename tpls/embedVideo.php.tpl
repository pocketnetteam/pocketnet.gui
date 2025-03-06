<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="robots" content="noindex" />
    <meta property="og:platform" content="PeerTube" />
    <link href="./peertube/video-embed.css" rel="stylesheet" />
    <title>__VAR__.name video</title>
    <?php 
        
            require_once('php/og.php'); 

            $og = new OG($_GET, __VAR__.proxypath, "__VAR__.domain", "__VAR__.project", $_SERVER['REQUEST_URI'], '__VAR__.strconfig');

            $og->get();
            $og->echotags();
        ?>

    <link rel="icon" href="./favicon.svg" sizes="any" type="image/svg+xml">

  </head>
  <body id="custom-css" class="standalone-video-embed">
    <div id="error-block">
      <h1 id="error-title"></h1>
      <div id="error-content"></div>
    </div>
    <div class="video-js-wrapper"><div id="video-wrapper"></div></div>
    <script>_OpenApi = true</script>
    __JSENV__
    <script src="./peertube/video-embed.bundle.js"></script>
    <script src="js/vendor/underscore-min.js?v=136"></script>
    <script join src="js/functionsfirst.js?v=138441565214"></script>
    <script join src="js/lib/client/system16.js?v=4"></script>
    <script join src="js/lib/client/api.js?v=4"></script>  
    <script>
      const addVideoToPage = () => {
        const elem = document.getElementById('video-wrapper');

        const urlParams = new URLSearchParams(window.location.search);

        var isVideEmbed = urlParams.get('embed');


        var host = urlParams.get('host'), 
          id = urlParams.get('id'), 
          s = urlParams.get('s'), 
          autoplay = urlParams.get('autoplay');

        if (!isVideEmbed || !host || !id) return;


        window.project_config.archivedPeertubeServers.map(server => {
          if (host.includes(server)) host = host.replace(server, 'peertube.archive.pocketnet.app');
        });

        PeerTubeEmbeding.main(elem, id, 'https://' + host, {
          videoEmbedded: true,
          autoplay: autoplay && true,
          txid: s || ''
        });
      };

      var servers = ((window.project_config || {}).servers || {})[window.testpocketnet ? 'test' : 'production'] || {}

      var listofproxies = servers.proxy || []


      var api = new Api({
        options : {
          listofproxies : listofproxies
        }
      })
      
      api.initIf().then(() => {
        return api.getPeertubeserversList()
      }).catch(e => {
        console.error(e)
      }).then(() => {
        addVideoToPage();
      })


      
    </script>
    <script src="./peertube/video-embed.bundle.js"></script>
    <script async src="js/pwa-service-worker.js?v=v__PACKAGE-VERSION__"></script>
  </body>
</html>
