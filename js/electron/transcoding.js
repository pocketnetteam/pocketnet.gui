const os = require('os');
const fs = require('fs');
const path = require('path');

const checkDiskSpace = require('check-disk-space').default;
const coresCount = os.cpus().length;
const ramCount = os.totalmem();

const ffbin = require('ffbinaries');
const ffmpeg = require('fluent-ffmpeg');

const FfbinDir = 'ffbinaries';

/**
 * @callback progressListener
 * @param {{progress: number}} progressData
 */

/**
 * This function install FF Binaries
 *
 * @param {string} ffbinFolder - Path to install FF Binaries
 * @param {progressListener} progressListener - Progress listener
 */
function downloadFfBinaries(ffbinFolder, progressListener) {
  return new Promise(async (resolve, reject) => {
    const components = ['ffmpeg', 'ffprobe'];

    let lastProgress = 0;
    const options = {
      destination: ffbinFolder,
      tickerFn: ({progress}) => {
        if (progress < lastProgress) {
          return;
        }

        progressListener(progress * 100);
        lastProgress = progress;
      },
    };

    try {
      ffbin.downloadBinaries(components, options, () => {
        resolve();
      });
    } catch (err) {
      const ffbinDownloadError = Error('FFBIN_DOWNLOAD_ERROR');
      reject(ffbinDownloadError);
    }

    ffbin.clearCache();
  });
}

/**
 * This factory creates client side transcoding
 * communication bridge. It sends events on
 * IPC Renderer.
 *
 * @param {Electron.IpcRenderer} electronIpcRenderer
 */
function transcodingFactory(electronIpcRenderer) {
  /**
   * @param {function} reportProgress
   *
   * @return {Promise<void>}
   */
  async function downloadBinaries(reportProgress) {
    return new Promise(async (resolve, reject) => {
      let alreadyDownloaded = false;

      electronIpcRenderer.on('transcode-binaries-progress', (event, progress) => {
        if (!alreadyDownloaded && progress === 100) {
          alreadyDownloaded = true;
          return;
        }

        reportProgress(progress);
      });

      electronIpcRenderer.once('transcode-binaries-error', (event, err) => {
        reject(err);
      });

      electronIpcRenderer.once('transcode-binaries-ready', (event) => {
        if (!alreadyDownloaded) {
          resolve();
          return;
        }

        reportProgress(100);
        setTimeout(() => resolve(), 500);
      });

      electronIpcRenderer.send('transcode-binaries-request');
    });
  }

  /**
   * @param {string} filePath
   * @param {function} reportProgress
   * @param {function} onCancel
   *
   * @return {Promise<void>}
   */
  async function transcode(filePath, reportProgress, onCancel) {
    return new Promise(async (resolve, reject) => {
      electronIpcRenderer.once('transcode-video-start', (event) => {
        onCancel(() => {
          electronIpcRenderer.send('transcode-video-stop');
        });
      });

      electronIpcRenderer.once('transcode-video-error', (event, err) => {
        reject(err);
      });

      electronIpcRenderer.once('transcode-video-result', (event, result) => {
        electronIpcRenderer.removeAllListeners('transcode-video-progress');

        reportProgress(100);
        setTimeout(() => resolve(result), 500);
      });

      electronIpcRenderer.on('transcode-video-progress', (event, progress) => {
        reportProgress(progress);
      });

      electronIpcRenderer.send('transcode-video-request', filePath);
    });
  }

  return { downloadBinaries, transcode };
}

async function binariesDownloader(electronIpcMain, userDataFolder) {
  const ffbinFolder = path.join(userDataFolder, FfbinDir);

  const ffmpegPath = path.join(ffbinFolder, 'ffmpeg');
  const ffprobePath = path.join(ffbinFolder, 'ffprobe');

  const oneGbBytes = 1024 * 1024 * 1024;

  const spaceCalc = await checkDiskSpace(ffbinFolder);
  const isEnoughSpace = (spaceCalc.free > oneGbBytes);
  const isRamEnough = (ramCount >= 4);
  const areCoresEnough = (coresCount >= 4);

  if (!isRamEnough || !areCoresEnough || !isEnoughSpace) {
    const err = Error('REQUIREMENTS_NOT_MET');
    e.sender.send('transcode-binaries-error', err);
    return;
  }

  electronIpcMain.on('transcode-binaries-request', async (e) => {
    downloadFfBinaries(ffbinFolder, (progress) => {
      console.log(`FF Binaries download`, progress);

      e.sender.send('transcode-binaries-progress', progress);
    }).then(() => {
      console.log(`FF Binaries are downloaded`);

      ffmpeg.setFfmpegPath(ffmpegPath);
      ffmpeg.setFfprobePath(ffprobePath);

      e.sender.send('transcode-binaries-progress', 100);
      e.sender.send('transcode-binaries-ready');
    }).catch((err) => {
      console.error(err);
      console.log('FF Binaries not downloaded. Proceeding as is...');

      e.sender.send('transcode-binaries-error', err);
    });
  });
}

/**
 * This function initiates transcoding processor
 * based on Electron IpcMain events. It must run
 * on background scripts.
 *
 * @param {Electron.IpcMain} electronIpcMain
 */
async function transcodingProcessor(electronIpcMain) {
  electronIpcMain.on('transcode-video-request', async function(e, filePath) {
    const tempDir = os.tmpdir();

    /**
     * Enumeration for Resolutions of videos
     * @type {Object.<string, [string, string]>}
     */
    const Resolution = {
      p240: [352, 240],
      p360: [640, 360],
      p480: [854, 480],
      p720: [1280, 720],
    };

    /**
     * Transcoding progress data
     * @type {Object.<string, number>}
     */
    let progressKeeper = {
      //p240: 0,
      //p360: 0,
      //p480: 0,
      p720: 0,
    };

    /**
     * Overall transcoding progress calculation function
     * @param {string} key - Transcoding key in object
     * @param {number} value - Percents to add in progressKeeper
     *
     * @returns {number} percents
     */
    function calcProgress(key, value) {
      progressKeeper[key] = value;

      const videosElems = Object.values(progressKeeper);
      const countVideos = videosElems.length;

      const fullPercent = countVideos * 100;
      const sumPercent = videosElems.reduce((partial_sum, a) => partial_sum + a, 0);

      return 100 / fullPercent * sumPercent;
    }

    /**
     * Video transcoder function
     *
     * @param {string} filePath
     * @param {[string, string]} resolution
     *
     * @returns {Promise<Buffer>} result
     */
    function transcodeVideo(filePath, resolution) {
      function randomId(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
        }
        return result;
      }

      return new Promise(async (resolve, reject) => {
        /**
         * @typedef {Object} FfmpegStats
         * @property {number} width - Video width
         * @property {number} height - Video height
         * @property {number} frameRate - Video framerate
         * @property {number} videoBitrate - Video bitrate
         * @property {number} [audioBitrate] - Audio bitrate
         */

        /**
         * @returns {Promise<FfmpegStats>}
         */
        function getVideoStats() {
          return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(filePath, (err, meta) => {
              if (err) {
                reject('ERROR_FILE_ACCESS');
                return;
              }

              const videoStream = meta.streams.find(s => s.codec_type === 'video');
              const audioStream = meta.streams.find(s => s.codec_type === 'audio');

              if (!videoStream) {
                reject('NO_VIDEO_STREAM');
              }

              const {
                bit_rate: videoBitrate,
                width,
                height,
                avg_frame_rate,
              } = videoStream;

              const resultStats = {
                width,
                height,
                frameRate: Number.parseFloat(avg_frame_rate),
                videoBitrate: Math.floor(videoBitrate / 1000),
              };

              if (audioStream) {
                const { bit_rate: audioBitrate } = audioStream;
                resultStats.audioBitrate = Math.floor(audioBitrate / 1000);
              }

              resolve(resultStats);
            });
          });
        }

        function startTranscoding() {
          const fileName = `transvideo-${randomId(6)}.temp.mp4`;
          const fileLocation = path.join(tempDir, fileName);

          console.log('Created temporary file', fileLocation);
          fs.writeFileSync(fileLocation, '');

          const transcodeProcess = ffmpeg(filePath);

          const threadsCount = Math.ceil(coresCount / 2);

          transcodeProcess
            .withVideoCodec('libx264')
            .withAudioCodec('libmp3lame')
            .videoFilters(`scale=-2:min'(720,ih)'`)
            .outputOption('-preset veryfast')
            .outputOption(`-threads ${threadsCount}`)
            .withVideoBitrate('2600k')
            .withAudioBitrate('256k')
            .outputFps(25)
            .format('mp4');

          function cancelTranscoding() {
            console.log('Video transcoding cancel');
            transcodeProcess.kill();
            reject('TRANSCODE_ABORT');
          }

          transcodeProcess
            .on('start', () => {
              electronIpcMain.once('transcode-video-stop', cancelTranscoding);

              e.sender.send('transcode-video-start');
            })
            .on('progress', (progress) => {
              console.log('Processing: ' + progress.percent + '% done');
              e.sender.send('transcode-video-progress', calcProgress(`p${resolution[1]}`, progress.percent));
            })
            .on('error', (err) => {
              console.error('FFmpeg error occurred:', err);
              e.sender.send('transcode-video-progress', calcProgress(`p${resolution[1]}`, 100));

              reject('TRANSCODE_ERROR');

              electronIpcMain.removeListener('transcode-video-stop', cancelTranscoding);
            })
            .on('end', () => {
              electronIpcMain.removeListener('transcode-video-stop', cancelTranscoding);

              /**
               * Looks like FFMPEG process can suddenly end
               * in the middle of the task without reporting
               * about any error. Anyway, handling the
               * situation when final file is missing.
               */
              if (!fs.existsSync(fileLocation)) {
                console.error('FFmpeg error occurred: Transcoded file is not saved');

                reject('TRANSCODE_ERROR');
                return;
              }

              const data = fs.readFileSync(fileLocation);

              resolve(data);

              fs.unlink(fileLocation, () => {
                console.log('Purged temporary file');
              });
            })
            .saveToFile(fileLocation);
        }

        const MaxVideoBitrate = 2600;
        const MaxAudioBitrate = 256;
        const MaxVideoFramerate = 25;

        let originalStats;

        try {
          originalStats = await getVideoStats();
        } catch (err) {
          switch (err) {
            case 'ERROR_FILE_ACCESS':
              reject(err);
              return;
            default:
              console.error(err);

              reject('UNHANDLED_ERROR');
              return;
          }
        }

        const isWidthBigger = (originalStats.width > resolution[0]);
        const isHeightBigger = (originalStats.height > resolution[1]);
        const isVideoBitrateBigger = (originalStats.videoBitrate > MaxVideoBitrate);
        const isAudioBitrateBigger = (originalStats.audioBitrate > MaxAudioBitrate);
        const isFrameRateBigger = (originalStats.frameRate > MaxVideoFramerate);

        const isVerticalVideo = (originalStats.width < originalStats.height);

        if (isVerticalVideo) {
          reject('VERTICAL_VIDEO_NOT_SUPPORTED');
          return;
        }

        const isTranscodeNeeded = (
          isWidthBigger
          || isHeightBigger
          || isVideoBitrateBigger
          || isAudioBitrateBigger
          || isFrameRateBigger
        );

        if (!isTranscodeNeeded) {
          reject('NO_TRANSCODE_NEEDED');
          return;
        }

        startTranscoding();
      });
    }

    const spaceCalc = await checkDiskSpace(tempDir);
    const fileSize = fs.statSync(filePath).size;

    const isEnoughSpace = (spaceCalc.free > (fileSize * 1.5));
    const isRamEnough = (ramCount >= 4);
    const areCoresEnough = (coresCount >= 4);

    if (!isRamEnough || !areCoresEnough || !isEnoughSpace) {
      const err = Error('REQUIREMENTS_NOT_MET');
      e.sender.send('transcode-video-error', err);
      return;
    }

    /** Writing transcoded alternatives to target object */
    let videos = {
      //p240: transcodeVideo(filePath, Resolution.p240),
      //p360: transcodeVideo(filePath, Resolution.p360),
      //p480: transcodeVideo(filePath, Resolution.p480),
      p720: transcodeVideo(filePath, Resolution.p720),
    };

    /** While all aren't fulfilled, waiting... */
    await Promise.allSettled(Object.values(videos));

    const resolutions = Object.keys(videos);

    const transcodedResults = {};

    /**
     * Extracting values of promises as e.reply doesn't
     * support this type of objects.
     */
    for (const size of resolutions) {
      const promise = videos[size];

      let buffer;

      try {
        buffer = await promise;
      } catch (err) {
        switch (err) {
          case 'TRANSCODE_ABORT':
            const reportAbort = Error(err);

            console.log('Transcode aborted by user');
            e.sender.send('transcode-video-error', reportAbort);
            break;
          case 'TRANSCODE_ERROR':
            const errTranscode = Error(err);

            console.log('Transcode error occurred');
            e.sender.send('transcode-video-error', errTranscode);
            break;
          case 'ERROR_FILE_ACCESS':
            const errAccess = Error(err);

            console.log('Transcoding error: file access error');
            e.sender.send('transcode-video-error', errAccess);
            return;
          case 'FFBIN_NOT_DOWNLOADED':
            const errFfbin = Error(err);

            console.log('Transcoding error: binaries still not downloaded');
            e.sender.send('transcode-video-error', errFfbin);
            return;
          case 'VERTICAL_VIDEO_NOT_SUPPORTED':
            const verticalNotSupported = Error(err);

            console.log('Transcoding error: vertical video not supported');
            e.sender.send('transcode-video-error', verticalNotSupported);
            return;
          default:
            const errUnhandled = Error('UNHANDLED_ERROR');

            console.error(err);
            e.sender.send('transcode-video-error', errUnhandled);
            return;
        }
      }

      if (buffer) {
        transcodedResults[size] = buffer;
      }
    }

    /**
     * Return error if no transcoding made.
     * In this case client must use original.
     */
    if (!Object.keys(transcodedResults).length) {
      const err = Error('NO_TRANSCODED');
      e.sender.send('transcode-video-error', err);
      return;
    }

    e.sender.send('transcode-video-result', transcodedResults);
  });
}

module.exports = { transcodingFactory, binariesDownloader, transcodingProcessor };
