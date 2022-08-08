<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="robots" content="noindex" />
    <meta property="og:platform" content="PeerTube" />
    <link href="./peertube/video-embed.css" rel="stylesheet" />

    <?php 
        
            require_once('php/og.php'); 

            $og = new OG($_GET, __VAR__.proxypath, "__VAR__.domain", "__VAR__.project");

            $og->get();
            $og->echotags();
        ?>

  </head>
  <body id="custom-css" class="standalone-video-embed">
    <div id="error-block">
      <h1 id="error-title"></h1>
      <div id="error-content"></div>
    </div>
    <div class="video-js-wrapper"><div id="video-wrapper"></div></div>
    <div id="placeholder-preview"></div>
    <script src="./peertube/video-embed.bundle.js"></script>
    <script>
      const addVideoToPage = () => {
        const elem = document.getElementById('video-wrapper');

        const urlParams = new URLSearchParams(window.location.search);

        const isVideEmbed = urlParams.get('embed');

        const [host, id, s] = [urlParams.get('host'), urlParams.get('id'), urlParams.get('s')];

        if (!isVideEmbed || !host || !id) return;

        PeerTubeEmbeding.main(elem, id, {
          host,
          videoEmbedded: true,
          txid: s || '',
          logoType : "__VAR__.project"
        });
      };

      addVideoToPage();
    </script>
    <script src="./peertube/video-embed.bundle.js"></script>
  </body>
</html>
