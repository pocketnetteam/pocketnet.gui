const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');

module.exports = class VideoDownload {
  PostsDir = 'posts';
  VideosDir = 'videos';
  DownloadProgress = {};

  Regexps = {
    Streams: /^.+\.m3u8/gm,
    VideoTargetName: /#EXT-X-MAP:URI="(.+\.mp4)"/m,
    BytesRange: /(?!BYTERANGE)(\d+@\d+)/gm,
    FragmentNameRange: /(?!fragment_)(\d+)-(\d+)/,
  };

  constructor(appPath) {
    this.Storage = appPath;
  }

  static initHandlers(ipcMain, appPath) {
    const videoDownloader = new VideoDownload(appPath);

    ipcMain.handle('saveShareData', async (event, shareData) => {
      return await videoDownloader.savePostData(shareData);
    });

    ipcMain.handle('saveShareVideo', async (event, folder, videoData, videoResolution) => {
      return await videoDownloader.savePostVideo(folder, videoData, videoResolution);
    });

    ipcMain.handle('deleteShareWithVideo', async (event, shareId) => {
      return videoDownloader.deletePostAndVideo(shareId)
    });

    ipcMain.handle('getShareList', async (event) => {
      return videoDownloader.getPostsList();
    });

    ipcMain.handle('getShareData', async (event, shareId) => {
      return videoDownloader.getPostData(shareId);
    });

    ipcMain.handle('getVideoData', async (event, shareId, videoId) => {
      return videoDownloader.getVideoData(shareId, videoId);
    });

    ipcMain.handle('getVideoSegment', async (event, videoDir, filename) => {
      return videoDownloader.getVideoSegment(videoDir, filename);
    });

    ipcMain.handle('setVideoDownloadStatus', async (event, shareId, status) => {
      return videoDownloader.setVideoDownloadStatus(shareId, status);
    });

    ipcMain.handle('getVideoDownloadProgress', async (event, shareId) => {
      return videoDownloader.getVideoDownloadProgress(shareId);
    });
  }

  static detachHandlers(ipcMain) {
    ipcMain.removeHandler('saveShareData');
    ipcMain.removeHandler('saveShareVideo');
    ipcMain.removeHandler('deleteShareWithVideo');
    ipcMain.removeHandler('getShareList');
    ipcMain.removeHandler('getShareData');
    ipcMain.removeHandler('getVideoData');
    ipcMain.removeHandler('getVideoSegment');
  }

  async savePostData(shareData) {
    const shareDir = this.getPostFolder(shareData.id);
    const jsonDir = path.join(shareDir, 'share.json');

    const jsonData = JSON.stringify(shareData);

    fs.writeFileSync(jsonDir, jsonData, { overwrite: false });

    return shareDir;
  }

  async savePostVideo(folder, videoData, videoResolution) {

    const shareId = path.basename(folder);
    const videoDir = this.getVideoFolder(shareId, videoData.uuid);
    const jsonDir = path.join(videoDir, 'info.json');
    const signsDir = path.join(videoDir, 'signatures.json');
    const playlistDir = path.join(videoDir, 'playlist.m3u8');

    this.DownloadProgress[shareId] = {
      status: 'downloading',
      progress: 0,
    };

    const jsonData = JSON.stringify(videoData);
    fs.writeFileSync(jsonDir, jsonData, { overwrite: false });

    const playlistUrl = videoData.streamingPlaylists[0].playlistUrl;
    const signsUrl = videoData.streamingPlaylists[0].segmentsSha256Url;

    const signsFile = fs.createWriteStream(signsDir);
    await this.downloadFile(signsUrl, { stream: signsFile });

    const streamsData = await this.downloadFile(playlistUrl);
    const streamsList = streamsData.match(this.Regexps.Streams);

    const targetStream = streamsList.find((stream) => (
      stream.endsWith(`${videoResolution}.m3u8`)
    ));

    const urlLastCut = playlistUrl.lastIndexOf('/');
    const targetStreamBaseUrl = playlistUrl.substring(0, urlLastCut);
    const targetStreamUrl = `${targetStreamBaseUrl}/${targetStream}`;

    const fragmentsFile = fs.createWriteStream(playlistDir);
    const fragmentsData = await this.downloadFile(targetStreamUrl, { stream: fragmentsFile });
    const fragmentsList = fragmentsData.match(this.Regexps.BytesRange);

    const targetVideo = fragmentsData.match(this.Regexps.VideoTargetName)[1];

    const targetVideoUrl = `${targetStreamBaseUrl}/${targetVideo}`;

    const downloadInfo = this.DownloadProgress[shareId];

    for(let i = 0; i < fragmentsList.length; i++) {
      const isDownloadPaused = (downloadInfo.status === 'paused');

      if (isDownloadPaused) {
        return;
      }

      let fragRange = fragmentsList[i].split('@');
      fragRange = fragRange.reverse();

      const fragSize = Number.parseInt(fragRange[1]);
      const startBytes = Number.parseInt(fragRange[0]);
      const endBytes = fragSize + startBytes - 1;

      const fragName = `fragment_${startBytes}-${endBytes}.mp4`;
      const fragPath = path.join(videoDir, fragName);

      /**
       * Check if fragment is already downloaded and has
       * correct size, if so, move to the next directly
       */
      if (fs.existsSync(fragPath)) {
        let stats = fs.statSync(fragPath);

        if (stats && stats.size && stats.size == fragSize) {
          continue;
        }
      }

      const fragFile = fs.createWriteStream(fragPath);

      await this.downloadFile(targetVideoUrl, {
        stream: fragFile,
        headers: {
          range: `bytes=${startBytes}-${endBytes}`,
        },
      });

      downloadInfo.progress = i / fragmentsList.length;
    }

    downloadInfo.progress = 1;
    downloadInfo.status = 'downloaded';

    const videoInfo = {
      thumbnail: 'https://' + videoData.from + videoData.thumbnailPath,
      videoDetails : videoData,
    };

    const result = {
      video: {
        internalURL: shareId,
      },
      infos: videoInfo,
      id: videoData.uuid,
    };

    return result;
  }

  deletePostAndVideo(shareId) {
    const shareDir = this.getPostFolder(shareId);

    fs.rmSync(shareDir, { recursive: true, force: true });
  }

  getPostsList() {
    const isShaHash = /[a-f0-9]{64}/;

    const pausedShares = [];

    const postsDir = path.join(this.Storage, this.PostsDir);

    if (!fs.existsSync(postsDir)) {
      return [];
    }

    let postsList = fs.readdirSync(postsDir)
      .filter(fN => isShaHash.test(fN));

    postsList = postsList.filter((pId) => {
      const videosDir = path.join(postsDir, pId, 'videos');

      let shareIsDownloaded = true;

      // If post has a videos folder
      if (fs.existsSync(videosDir)) {
        const videoList = fs.readdirSync(videosDir, { withFileTypes: true })
          .filter((dir) => dir.isDirectory());

        if (!videoList || videoList.length <= 0) {
          return true;
        }

        try {
          const playlistPath = path.join(videosDir, videoList[0].name, 'playlist.m3u8');
          const fileStats = fs.readFileSync(playlistPath, { encoding:'utf8', flag:'r' });

          const vurl = fileStats.match(this.Regexps.VideoTargetName)[1];

          const signaturesData = fs.readFileSync(path.join(videosDir, videoList[0].name, 'signatures.json'), { encoding:'utf8', flag:'r' });
          const signatures = JSON.parse(signaturesData);

          const fragmentList = signatures[vurl];
          const fragmentListKeys = Object.keys(fragmentList);
          const fragmentRange = fragmentListKeys[fragmentListKeys.length - 1];
          const lastFragmentName = `fragment_${fragmentRange}.mp4`;

          const doesFragmentExist = fs.existsSync(path.join(videosDir, videoList[0].name, lastFragmentName));

          if (!doesFragmentExist) {
            const resolutionId = vurl.match(/.+-(\d+)-fragmented.mp4/)[1];
            pausedShares.push({ shareId: pId, resolutionId: resolutionId });
            shareIsDownloaded = false;
          }
        } catch(e) {
          shareIsDownloaded = true;
        }
      }

      return shareIsDownloaded;
    });

    return {
      savedShares: postsList,
      pausedShares: pausedShares,
    };
  }

  getPostData(shareId) {
    const shareDir = this.getPostFolder(shareId);
    const jsonPath = path.join(shareDir, 'share.json');

    const jsonData = fs.readFileSync(jsonPath, { encoding:'utf8', flag:'r' });

    return JSON.parse(jsonData);
  }

  getVideoData(shareId, videoId) {
    const videoDir = this.getVideoFolder(shareId, videoId);

    const jsonPath = path.join(videoDir, 'info.json');

    const videosList = fs.readdirSync(videoDir);

    const videoData = {};

    videoData.id = videoId;

    const jsonData = fs.readFileSync(jsonPath, { encoding:'utf8', flag:'r' });

    const details =  JSON.parse(jsonData);

    videoData.infos = {
      thumbnail: '',
      videoDetails: details,
    };

    const playlistName = videosList.find(fN => (
      fN.endsWith('.m3u8')
    ));

    const playlistPath = path.join(videoDir, playlistName);

    const fileStats = fs.readFileSync(playlistPath, { encoding:'utf8', flag:'r' });

    const masterSwarmId = details.streamingPlaylists[0].playlistUrl;

    const vurl = fileStats.match(this.Regexps.VideoTargetName)[1];

    let signatures;

    try {
      signatures = JSON.parse(fs.readFileSync(path.join(videoDir, 'signatures.json'), { encoding:'utf8', flag:'r' }));
    } catch(e) {
      console.log(e);
    }

    if (masterSwarmId && vurl && signatures) {
      const url = masterSwarmId.split("/hls/")[0] + '/hls/' + details.uuid + '/' + vurl;

      let i = -1;
      let f = -1;

      const fss = _.find(signatures, (a, index) => {
        f++;

        if (index == vurl) {
          return true;
        }
      });

      if (fss) {
        i = f;
      }

      if (i > -1) {
        const segmentsFiles = _.sortBy(_.filter(videosList, (vl) => {
          if (vl.endsWith('.mp4')) {
            return true;
          }
        }), (vl => (
          vl.match(this.Regexps.FragmentNameRange)[0]
        )))

        const segments = segmentsFiles.map((vl, j) => {
          const j1 = j - 1;

          const segmentRangeData = this.Regexps.FragmentNameRange;
          const segmentRangeStr = `${segmentRangeData[1]}-${segmentRangeData[2]}`;

          return {
            sequence: `${j1}`,
            range: segmentRangeStr,
            priority: 1,
            downloadBandwidth: 10,
            streamId: `V${i}`,
            masterManifestUri: masterSwarmId,
            id: `${masterSwarmId}+V${i}+${j1}`,
            requestUrl: url,
            responseUrl: url,
            masterSwarmId,
            url,
          };
        });

        const map = new Map();

        segments.forEach((s) => {
          map.set(s.id, { segment: s });
        });

        videoData.infos.segments = map;
        videoData.infos.masterSwarmId = masterSwarmId;
        videoData.infos.streamSwarmId = `${masterSwarmId}+V${i}`;
        videoData.infos.dir = videoDir;
        videoData.infos.trackerUrls = details.trackerUrls;
      }
    }

    videoData.size = fileStats.size;
    videoData.video = {
      internalURL: shareId,
    };

    return videoData;
  }

  getVideoSegment(videoDir, filename) {
    try {
      const data = fs.readFileSync(path.join(videoDir, filename), {  flag:'r' });

      return data;
    } catch(err) {
      return null;
    }
  }

  setVideoDownloadStatus(shareId, status) {
    const downloadInfo = this.DownloadProgress[shareId];

    if (downloadInfo) {
      downloadInfo.status = status;
    }
  }

  getVideoDownloadProgress(shareId) {
    const downloadInfo = this.DownloadProgress[shareId];

    if (downloadInfo) {
      return downloadInfo;
    }
  }

  downloadFile(url, options = {}) {
    return new Promise((resolve, reject) => {
      let isHttps = /^https:/;
      let isHttp = /^http:/;

      const handler = (response) => {
        let data = '';

        response.on('data', (chunk) => (
          data += chunk
        ));

        if (options.stream) {
          options.stream.on('close', () => resolve(data));

          response.pipe(options.stream);
        } else {
          response.on('end', () => resolve(data));
        }
      };

      const reqOptions = {
        headers: options.headers,
      };

      if (isHttp.test(url)) {
        if (options.headers) {
          http.get(url, reqOptions, handler);
        } else {
          http.get(url, handler);
        }
      } else if (isHttps.test(url)) {
        if (options.headers) {
          https.get(url, reqOptions, handler);
        } else {
          https.get(url, handler);
        }
      } else {
        reject('Unsupported protocol');
      }
    });
  }

  getPostFolder = (postId) => {
    const shareDir = path.join(this.Storage, this.PostsDir, postId);

    if (!fs.existsSync(shareDir)) {
      fs.mkdirSync(shareDir, { recursive: true });
    }

    return shareDir;
  }

  getVideoFolder = (postId, videoId) => {
    const videoDir = path.join(this.getPostFolder(postId), this.VideosDir, videoId);

    if (!fs.existsSync(videoDir)) {
      fs.mkdirSync(videoDir, { recursive: true });
    }

    return videoDir;
  }
}
