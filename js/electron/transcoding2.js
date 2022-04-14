const os = require('os');
const fs = require('fs');
const path = require('path');
const ffbin = require('ffbinaries');
const ffmpeg = require('fluent-ffmpeg');

const getUniqueFileId = require('../file-hash');
const checkDiskSpace = require('check-disk-space').default;

const coresCount = os.cpus().length;
const ramCount = Math.round(os.totalmem() / Math.pow(1024, 3));

/** Uncomment line to enable debug logs */
let debugLog = () => {};
debugLog = console.log;

class ClientTask {
  state = 'CREATED';

  needProcess = () => false;

  constructor(ipcRender, file) {
    this.ipcRender = ipcRender;
    this.file = file;
  }

  setFileCheck(predicateFunc) {
    this.needProcess = predicateFunc;
  }

  async init() {
    this.state = 'INITIATED';

    this.id = await getUniqueFileId(this.file);

    this.ipcRender.send('Transcoder:InitTask', this.id);
  }

  async binaries(progressListener) {
    this.state = 'BINARIES';

    this.ipcRender.on('Transcoder:Binaries:Progress', (e, progress) => {
      progressListener(this, progress);
    });

    const promise = new Promise((resolve, reject) => {
      this.ipcRender.once('Transcoder:Binaries:Finished', () => {
        this.ipcRender.removeAllListeners('Transcoder:Binaries:Error');
        this.ipcRender.removeAllListeners('Transcoder:Binaries:Progress');

        resolve();
      });

      this.ipcRender.once('Transcoder:Binaries:Error', (e, err) => {
        this.ipcRender.removeAllListeners('Transcoder:Binaries:Finished');
        this.ipcRender.removeAllListeners('Transcoder:Binaries:Progress');

        reject(err);
      });
    });

    this.ipcRender.send('Transcoder:Binaries');

    return promise;
  }

  async checkInput() {
    this.state = 'FILE_CHECK';

    const promise = new Promise((resolve, reject) => {
      this.ipcRender.once('Transcoder:Probe:Error', (e, err) => {
        this.ipcRender.removeAllListeners('Transcoder:Probe:Result');

        reject(err);
      });

      this.ipcRender.once('Transcoder:Probe:Result', (e, fileProbe) => {
        this.ipcRender.removeAllListeners('Transcoder:Probe:Error');

        const notRequired = !!this.needProcess(fileProbe);
        resolve(notRequired);
      });
    });

    this.ipcRender.send('Transcoder:Probe', this.file.path);

    return promise;
  }

  async transcode(progressListener) {
    this.state = 'TRANSCODING';

    const promise = new Promise((resolve, reject) => {
      this.ipcRender.once('Transcoder:Transcode:Error', (e, err) => {
        this.ipcRender.removeAllListeners('Transcoder:Transcode:Result');
        this.ipcRender.removeAllListeners('Transcoder:Transcode:Progress');

        reject(err);
      });

      this.ipcRender.once('Transcoder:Transcode:Result', (e, outputSize) => {
        this.ipcRender.removeAllListeners('Transcoder:Transcode:Error');
        this.ipcRender.removeAllListeners('Transcoder:Transcode:Progress');
        this.ipcRender.removeAllListeners('Transcoder:Transcode:Stopped');

        this.resultSize = outputSize;

        resolve();
      });

      this.ipcRender.on('Transcoder:Transcode:Progress', (e, progress) => (
        progressListener(this, progress)
      ));
    });

    this.ipcRender.send('Transcoder:Transcode', this.file.path);

    return promise;
  }

  async close(purgeResult = false) {
    this.state = 'CLOSED';

    const promise = new Promise((resolve, reject) => {
      this.ipcRender.once('Transcoder:Transcode:Stopped', () => {
        this.ipcRender.removeAllListeners('Transcoder:Transcode:Error');
        this.ipcRender.removeAllListeners('Transcoder:Transcode:Progress');
        this.ipcRender.removeAllListeners('Transcoder:Transcode:Result');

        resolve();
      });

      setTimeout(() => {
        reject('TRANSCODE_NONSTOP');
      }, 7000);
    });

    this.ipcRender.send('Transcoder:Transcode:Stop');
    this.ipcRender.send('Transcoder:CloseTask', purgeResult);

    return promise;
  }

  async getChunk(from, to) {
    const promise = new Promise((resolve, reject) => {
      this.ipcRender.once(`Transcoder:Transcode:Chunk[${from}:${to}]:Error`, (e, err) => {
        this.ipcRender.removeAllListeners(`Transcoder:Transcode:Chunk[${from}:${to}]:Result`);

        reject(err);
      });

      this.ipcRender.once(`Transcoder:Transcode:Chunk[${from}:${to}]:Result`, (e, chunk) => {
        this.ipcRender.removeAllListeners(`Transcoder:Transcode:Chunk[${from}:${to}]:Error`);

        resolve({ from, to, data: chunk });
      });
    });

    this.ipcRender.send('Transcoder:Transcode:Chunk', { from, to });

    return promise;
  }
}

class BinariesDownloader {
  downloaded = false;

  progressHandler = () => {};

  constructor(binariesPath) {
    this.path = binariesPath;

    const ffmpegPath = path.join(this.path, 'ffmpeg');
    const ffprobePath = path.join(this.path, 'ffprobe');

    ffmpeg.setFfmpegPath(ffmpegPath);
    ffmpeg.setFfprobePath(ffprobePath);
  }

  listenProgress(handler) {
    this.progressHandler = handler;
  }

  download() {
    if (this.downloaded) {
      return Promise.resolve();
    }

    return new Promise(async (resolve, reject) => {
      const components = ['ffmpeg', 'ffprobe'];

      let lastProgress = 0;

      const options = {
        destination: this.path,
        tickerFn: ({progress}) => {
          if (progress < lastProgress) {
            return;
          }

          this.progressHandler(progress * 100);
          lastProgress = progress;
        },
      };

      try {
        ffbin.downloadBinaries(components, options, () => {
          this.downloaded = true;
          resolve();
        });
      } catch (err) {
        const ffbinDownloadError = Error('BINARIES_NOT_INSTALLED');
        reject(ffbinDownloadError);
      }

      ffbin.clearCache();
    });
  }
}

class BridgeTask {
  _static = this.constructor;

  constructor(bridge, sender, taskId) {
    this.bridge = bridge;
    this.path = bridge.transcodingPath;
    this.ipcMain = bridge.ipcMain;
    this.sender = sender;
    this.id = taskId;

    this.output = this._static.getTemporaryPath(this.path, taskId);
    this.finishedOutput = this._static.getFinishedPath(this.path, this.id);

    this.listenProbeEvents();
    this.listenTranscodeEvents();
    this.listenChunkingEvents();
    this.listenTaskClose();
  }

  listenProbeEvents() {
    this.ipcMain.once('Transcoder:Probe', async (e, filePath) => {
      debugLog(`Transcoding task ${this.id}: Getting probe`);

      const videoProbe = await this.getVideoProbe(filePath)
        .catch((err) => {
          if (err.code === 'ENOENT') {
            this.sender.send('Transcoder:Probe:Error', 'PROBE_BINARIES_DISAPPEARED');
            return;
          }

          this.sender.send('Transcoder:Probe:Error', err);
        });

      this.sender.send('Transcoder:Probe:Result', videoProbe);
    });
  }

  listenTranscodeEvents() {
    this.ipcMain.once('Transcoder:Transcode', async (e, filePath) => {
      this.transcodeVideo(filePath);
    });
  }

  listenChunkingEvents() {
    this.ipcMain.on('Transcoder:Transcode:Chunk', async (e, { from, to }) => {
      //debugLog(`Transcoding task ${this.id}: Chunk[${from}:${to}] requested`);

      if (this.state === 'STOPPED') {
        this.sender.send(`Transcoder:Transcode:Chunk[${from}:${to}]:Error`, 'TRANSCODE_CHUNK_FILE_MISSING');
        return;
      }

      if (!this.chunkFd) {
        this.startChunking();
      }

      const chunk = await this.getChunk(from, to)
        .catch((err) => {
          debugLog(`Transcoding task ${this.id}: Chunk[${from}:${to}] error`);

          this.sender.send(`Transcoder:Transcode:Chunk[${from}:${to}]:Error`, err);

          debugLog(`Transcoding task ${this.id}: Task closed by error. All events killed`);
          this.closeTask();
        });

      if (this.resultSize <= to) {
        this.stopChunking();

        fs.unlink(this.finishedOutput, () => {
          debugLog(`Transcoding task ${this.id}: Chunking reached last chunk. Closed, file purged`);
        });

        this.ipcMain.removeAllListeners('Transcoder:Transcode:Chunk');
      }

      //debugLog(`Transcoding task ${this.id}: Chunk[${from}:${to}] sent`);
      this.sender.send(`Transcoder:Transcode:Chunk[${from}:${to}]:Result`, chunk);
    });
  }

  listenTaskClose() {
    this.ipcMain.once('Transcoder:CloseTask', (e, purgeResult) => {
      debugLog(`Transcoding task ${this.id}: Task closed. All events killed`);

      if (purgeResult) {
        fs.unlink(this.finishedOutput, () => {});
      }

      this.closeTask();
    });
  }

  closeTask() {
    this.ipcMain.removeAllListeners('Transcoder:Transcode:Chunk');
    this.ipcMain.removeAllListeners('Transcoder:Transcode:Stop');
    this.ipcMain.removeAllListeners('Transcoder:Probe');
    this.ipcMain.removeAllListeners('Transcoder:Transcode');
  }

  getVideoProbe(filePath) {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, meta) => {
        if (err) {
          reject(err);
          return;
        }

        const videoStream = meta.streams.find(s => s.codec_type === 'video');
        const audioStream = meta.streams.find(s => s.codec_type === 'audio');

        if (!videoStream) {
          const err = 'FFPROBE_MISSING_VIDEO_STREAM';
          reject(err);
          return;
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

  processIfFinished() {
    if (fs.existsSync(this.finishedOutput)) {
      this.resultSize = fs.statSync(this.finishedOutput).size;
      this.sender.send('Transcoder:Transcode:Result', this.resultSize);

      return true;
    }

    return false;
  }

  transcodeVideo(filePath) {
    const spawnFfmpeg = () => {
      const threadsCount = coresCount / 2;

      return ffmpeg(filePath)
        .withVideoCodec('libx264')
        .withAudioCodec('libmp3lame')
        .videoFilters(`scale=-2:min'(720,ih)'`)
        .outputOption('-preset veryfast')
        .outputOption(`-threads ${threadsCount}`)
        .withVideoBitrate('2600k')
        .withAudioBitrate('256k')
        .outputFps(25)
        .format('mp4')
    };

    const handleTranscodingStart = () => {
      this.ipcMain.once('Transcoder:Transcode:Stop', () => {
        this.state = 'STOPPED';

        this.command.kill('SIGTERM');

        this.sender.send('Transcoder:Transcode:Stopped');

        fs.unlink(this.output, () => {});
      });

      this.sender.send('Transcoder:Transcode:Start');
    };

    const handleTranscodingProgress = ({ percent }) => {
      if (this.state === 'STOPPED') {
        return;
      }

      // DEATH SIMULATION
      // if (percent > 10) this.command.kill();

      debugLog(`Transcoding task ${this.id}: Processed ${percent}%`);

      this.sender.send('Transcoder:Transcode:Progress', percent);
    };

    const handleTranscodingError = (err) => {
      const isSignal15 = (err.message.indexOf('signal 15') > -1);
      const isStoppedState = (this.state === 'STOPPED');

      this.closeTask();

      if (isSignal15) {
        if (!isStoppedState) {
          debugLog(`Transcoding task ${this.id}: Suddenly stopped. Task closed`);
        } else {
          debugLog(`Transcoding task ${this.id}: Stopped by user. Task closed, file purged`);
          this.sender.send('Transcoder:Transcode:Error', 'TRANSCODE_ABORT');

          return;
        }
      } else {
        debugLog(`Transcoding task ${this.id}: Error occurred (${err.message || 'no description'}). Task closed`);
      }

      fs.unlink(this.output, () => {
        debugLog(`Transcoding task ${this.id}: Temporary file purged`);
      });

      console.error(err);

      this.sender.send('Transcoder:Transcode:Error', 'TRANSCODE_FFMPEG_ERROR');
    };

    const handleTranscodingEnd = () => {
      /** Last 100 processed report by hands */
      this.sender.send('Transcoder:Transcode:Progress', 100);

      if (!fs.existsSync(this.output)) {
        debugLog(`Transcoding task ${this.id}: Final file not found`);

        this.sender.send('Transcoder:Transcode:Error', 'TRANSCODE_OUTPUT_MISSING');
      }

      fs.renameSync(this.output, this.finishedOutput);
      this.resultSize = fs.statSync(this.finishedOutput).size;

      debugLog(`Transcoding task ${this.id}: Finished`);

      this.sender.send('Transcoder:Transcode:Result', this.resultSize);
    }

    this.inputSize = fs.statSync(filePath).size;

    return new Promise((resolve, reject) => {
      this.bridge.checkRequirements(this.inputSize, this.path)
        .then((checkOk) => {
          if (!checkOk) {
            reject('TRANSCODE_REQUIREMENTS');
            return;
          }

          const isProcessed = this.processIfFinished();

          if (!isProcessed) {
            if (!fs.existsSync(this.path)) {
              fs.mkdirSync(this.path, { recursive: true });
            }

            fs.writeFileSync(this.output, '');

            this.command = spawnFfmpeg()
              .on('start', handleTranscodingStart)
              .on('progress', handleTranscodingProgress)
              .on('error', handleTranscodingError)
              .on('end', handleTranscodingEnd)
              .saveToFile(this.output);
          }
        });
    });
  }

  startChunking() {
    if (fs.existsSync(this.finishedOutput)) {
      this.chunkFd = fs.openSync(this.finishedOutput, 'r');
    }
  }

  getChunk(from, to) {
    const bytesToRead = to - from;

    const buff = Buffer.alloc(bytesToRead);

    return new Promise((resolve, reject) => {
      fs.read(this.chunkFd, buff, 0, bytesToRead, from, (errRead) => {
        if (errRead) {
          console.error(errRead);
          reject('TRANSCODE_CHUNK_READ');
        }

        resolve(buff);
      });
    });
  }

  stopChunking() {
    if (this.chunkFd) {
      return;
    }

    fs.closeSync(this.chunkFd);
    this.chunkFd = null;
  }

  static getTemporaryPath(basePath, taskId) {
    const fileName = `transcoding-${taskId}.temp.mp4`;
    return path.join(basePath, fileName);
  }

  static getFinishedPath(basePath, taskId) {
    const fileName = `finished-transcoding-${taskId}.temp.mp4`;
    return path.join(basePath, fileName);
  }
}

class Client {
  preCheckPredicate = () => false;
  binariesProgressListener = () => {};
  transcodeProgressListener = () => {};
  transcodeStartedListener = () => {};

  constructor(ipcRender) {
    this.ipcRender = ipcRender;
  }

  setPreCheckFunction(predicateFunc) {
    this.preCheckPredicate = predicateFunc;
  }

  setBinariesProgressListener(listener) {
    this.binariesProgressListener = listener;
  }

  setTranscodeProgressListener(listener) {
    this.transcodeProgressListener = listener;
  }

  setTranscodeStartedListener(listener) {
    this.transcodeStartedListener = listener;
  }

  async runTask(file) {
    const task = new ClientTask(this.ipcRender, file);

    task.setFileCheck(this.preCheckPredicate);

    // 0. Init interaction
    await task.init();

    // 1. Check binaries
    await task.binaries(this.binariesProgressListener);

    // 2. Check if need to process
    const notRequired = await task.checkInput();

    if (notRequired) {
      task.close();
      throw 'TRANSCODE_UNNECESSARY';
    }

    this.transcodeStartedListener(task);

    // 3. Start process
    await task.transcode(this.transcodeProgressListener);

    // 4. Return TASK to client
    return task;
  }
}

class Bridge {
  _static = this.constructor;

  static TranscodingFolder = 'bastyon';
  static BinariesFolder = 'ffbinaries';
  static Requirements = {
    CpuCores: 4,
    RamCount: 4,
    FreeSpaceK: 1.5,
  };

  busy = false;

  constructor(ipcMain, storage) {
    this.ipcMain = ipcMain;
    this.transcodingPath = path.join(os.tmpdir(), this._static.TranscodingFolder);

    const binariesPath = path.join(storage, this._static.BinariesFolder);

    this.binaries = new BinariesDownloader(binariesPath);

    this.initTaskListener();
  }

  initTaskListener() {
    this.ipcMain.on('Transcoder:InitTask', async ({ sender }, taskId) => {
      if (this.busy) {
        debugLog(`Received parallel task ${taskId}. Not normal`);
        sender.send('Transcoder:Binaries:Error', 'TRANSCODER_BUSY');
        return;
      }

      const mb100 = 100 * 1024 * 1024;
      const canInstallBinaries = await this.checkRequirements(mb100, this.binaries.path);

      if (!canInstallBinaries) {
        sender.send('Transcoder:Binaries:Error', 'BINARIES_REQUIREMENTS');
        return;
      }

      this.binaries.listenProgress((progress) => {
        sender.send('Transcoder:Binaries:Progress', progress);
      });

      await this.binaries.download()
        .catch((err) => {
          sender.send('Transcoder:Binaries:Error', err);
        });

      sender.send('Transcoder:Binaries:Finished');

      debugLog(`Transcoding task ${taskId}: Started`);

      new BridgeTask(this, sender, taskId);
    });
  }

  async checkRequirements(spaceBase, folder) {
    const spaceCalc = await checkDiskSpace(folder);

    const isEnoughSpace = (spaceCalc.free > (spaceBase * this._static.Requirements.FreeSpaceK));
    const isRamEnough = (ramCount >= this._static.Requirements.RamCount);
    const areCoresEnough = (coresCount >= this._static.Requirements.CpuCores);

    return isRamEnough && areCoresEnough && isEnoughSpace;
  }
}

module.exports = { Client, Bridge };
