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

class TranscoderClient {
  _static = TranscoderClient;

  cancelIf = () => {};

  constructor(ipcRender) {
    this.ipcRender = ipcRender;
  }

  static Task = class Task {
    closed = false;
    resultSize = null;
    errorHandler = () => {};
    progressHandler = () => {};

    constructor(transcoderClient, file) {
      this.tClient = transcoderClient;
      this.id = getUniqueFileId(file);
      this.file = file;
    }

    setErrorHandler(handler) {
      this.errorHandler = handler;
    }

    setProgressHandler(handler) {
      this.progressHandler = handler;
    }

    async start() {
      return new Promise((resolve, reject) => {
        this.handleProgress((e, progress) => {
          this.progressHandler(progress);
        });
        this.handleError((e, err) => {
          this.unhandleStarted();
          this.errorHandler(err);
          reject(err);
        });
        this.handleStarted(() => {
          this.unhandleError();
          resolve();
        });
        this.sendStart();
      });
    }

    async stop() {
      return new Promise((resolve, reject) => {
        this.handleError((e, err) => {
          this.unhandleStopped();
          this.errorHandler(err);
          reject(err);
        });
        this.handleStopped(() => {
          this.unhandleError();
          resolve();
        });
        this.sendStop();
      });
    }

    async finished() {
      return new Promise((resolve, reject) => {
        this.handleError((e, err) => {
          this.unhandleFinished();
          this.errorHandler(err);
          reject(err);
        });
        this.handleFinished((e, fileSize) => {
          this.unhandleError();
          this.resultSize = fileSize;
          resolve(this);
        });
      });
    }

    async getChunk(from, to) {
      return new Promise((resolve, reject) => {
        this.handleError((e, err) => {
          this.unhandleChunkReceived(from, to);
          this.errorHandler(err);
          reject(err);
        });
        this.handleChunkReceived(from, to, (e, chunk) => {
          this.unhandleError();
          resolve(chunk);
        });
        this.sendChunkRequest(from, to);
      });
    }

    async getProbe(file) {
      return new Promise((resolve, reject) => {
        this.handleError((e, err) => {
          this.unhandleReceivedProbe();
          this.errorHandler(err);
          reject(err);
        });
        this.handleReceivedProbe( (e, chunk) => {
          this.unhandleError();
          resolve(chunk);
        });
        this.sendGetProbe(file.path);
      });
    }

    handleStarted = async (handler) => {
      this.tClient.ipcRender.once(`Transcoder:Task[${await this.id}]:Started`, handler);
    };

    handleProgress = async (handler) => {
      this.tClient.ipcRender.on(`Transcoder:Task[${await this.id}]:Progress`, handler);
    };

    handleStopped = async (handler) => {
      this.tClient.ipcRender.once(`Transcoder:Task[${await this.id}]:Stopped`, handler);
    };

    handleError = async (handler) => {
      this.tClient.ipcRender.once(`Transcoder:Task[${await this.id}]:Error`, handler);
    };

    handleFinished = async (handler) => {
      this.tClient.ipcRender.once(`Transcoder:Task[${await this.id}]:Finished`, handler);
    };

    handleChunkReceived = async (from, to, handler) => {
      const event = `Transcoder:Task[${await this.id}]:ChunkReceived[${from}:${to}]`;
      this.tClient.ipcRender.once(event, handler);
    };

    handleReceivedProbe = async (handler) => {
      this.tClient.ipcRender.once(`Transcoder:ReceivedProbe`, handler);
    };

    unhandleStarted = async () => {
      this.tClient.ipcRender.removeAllListeners(`Transcoder:Task[${await this.id}]:Started`);
    };

    unhandleStopped = async () => {
      this.tClient.ipcRender.removeAllListeners(`Transcoder:Task[${await this.id}]:Stopped`);
    };

    unhandleError = async () => {
      this.tClient.ipcRender.removeAllListeners(`Transcoder:Task[${await this.id}]:Error`);
    };

    unhandleFinished = async () => {
      this.tClient.ipcRender.removeAllListeners(`Transcoder:Task[${await this.id}]:Finished`);
    };

    unhandleChunkReceived = async () => {
      const event = `Transcoder:Task[${await this.id}]:ChunkReceived[${from}:${to}]`;
      this.tClient.ipcRender.removeAllListeners(event);
    };

    unhandleReceivedProbe = async () => {
      this.tClient.ipcRender.removeAllListeners(`Transcoder:Task[${await this.id}]:ReceivedProbe`);
    };

    sendStart = async () => {
      const  { path, size } = this.file;

      const fileData = {
        id: await this.id,
        path,
        size,
      };

      this.tClient.ipcRender.send('Transcoder:Task', fileData);
    };

    sendStop = async () => {
      this.tClient.ipcRender.send(`Transcoder:Task[${await this.id}]:Stop`);
    };

    sendChunkRequest = async (from, to) => {
      this.tClient.ipcRender.send(`Transcoder:Task[${await this.id}]:GetChunk`, { from, to });
    };

    sendGetProbe = async (filePath) => {
      this.tClient.ipcRender.send(`Transcoder:GetProbe`, filePath);
    };
  };

  async runTask(file, progressListener) {
    const task = new this._static.Task(this, file);

    task.setProgressHandler((progress) => progressListener(task, progress));

    const probe = await task.getProbe(file);

    const cancelReason = this.cancelIf(probe);
    if (cancelReason) {
      return Promise.reject(cancelReason);
    }

    await task.start();
    return task.finished();
  }

  async getProbe(file) {
    return new Promise((resolve, reject) => {
      this.handleProbeError((err) => {
        this.unhandleProbeReceived();
        reject(err);
      });
      this.handleProbeReceived((probe) => {
        this.unhandleProbeError();
        resolve(probe);
      });
      this.sendProbeRequest(file.path);
    });
  }

  cancelTranscodingIfTrue = (predicateCb) => {
    this.cancelIf = predicateCb;
  };

  handleBinariesDownloadProgress = (progress) => {
    this.ipcRender.on('Transcoder:BinariesDownload:Progress', progress);
  };

  handleBinariesDownloadFinished = () => {
    this.ipcRender.once('Transcoder:BinariesDownload:Finished');
  };

  handleProbeReceived = (handler) => {
    this.ipcRender.once('Transcoder:ReceivedProbe', handler);
  };

  unhandleProbeError = () => {
    this.ipcRender.removeAllListeners('Transcoder:GetProbeError');
  }

  unhandleProbeReceived = () => {
    this.ipcRender.removeAllListeners('Transcoder:ReceivedProbe');
  };

  sendProbeRequest = (filePath) => {
    this.ipcRender.send('Transcoder:GetProbe', filePath);
  };

  handleProbeError = (handler) => {
    this.ipcRender.once('Transcoder:GetProbeError', handler);
  };
}

class TranscoderBridge {
  _static = TranscoderBridge;

  binariesFolder = 'ffbinaries';
  saveFolder = path.join(os.tmpdir(), 'bastyon');
  ffmpegThreads = Math.ceil(coresCount / 2);

  minCpuCores = 4;
  minRam = 4;
  minDiskSpaceK = 1.5;

  constructor(ipcMain, appFolder) {
    this.ipcMain = ipcMain;
    this.appFolder = appFolder;

    new this._static.ProbesProcessor(this);

    this.binaries = new this._static.BinaryDownloader(this);

    fs.mkdirSync(this.saveFolder, { recursive: true });

    this.handleTaskStart(({ sender }, file) => {
      new this._static.TaskProcessor(this, {
        id: file.id,
        inputPath: file.path,
        fileSize: file.size,
        sender,
      });
    });
  }

  static TaskProcessor = class TaskProcessor {
    _static = TranscoderBridge.TaskProcessor;
    state = 'INIT';
    progress = 0;

    constructor(bridge, taskData) {
      this.bridge = bridge;
      this.sender = taskData.sender;

      this.id = taskData.id;

      this.output = this._static.getTemporaryPath(this.bridge.saveFolder, this.id);
      this.input = taskData.inputPath;
      this.inputSize = taskData.fileSize;

      const transcode = async () => {
        this.bridge.checkRequirements(this.inputSize)
          .then(() => {
            if (this.checkIfFinished()) {
              debugLog(`Transcoding task ${this.id}: Already finished task`);
              return;
            }

            fs.writeFileSync(this.output, '');

            this.command = this.spawnFfmpeg();

            this.command
              .on('start', () => this.handleTranscodingStart())
              .on('progress', ({ percent }) => this.handleTranscodingProgress(percent))
              .on('error', (err) => this.handleTranscodingError(err))
              .on('end', () => this.handleTranscodingEnd())
              .saveToFile(this.output);
          })
          .catch((err) => (
            this.sendError('REQUIREMENTS_NOT_MET')
          ));
      }

      if (!this.bridge.binaries.downloaded) {
        this.bridge.binaries.listenProgress((progress) => {
          debugLog('Downloading binaries', progress);
        });
        this.bridge.binaries.download()
          .then(transcode)
          .catch((err) => {
            debugLog('FFBinaries error occurred');
          });

        return;
      }

      transcode();
    }

    processChunks() {
      this.handleChunkRequest((e, chunkReq) => {
        debugLog(`Transcoding task ${this.id}: Chunk requested [${chunkReq.from}:${chunkReq.to}]`);

        this.getChunkFromFile(chunkReq.from, chunkReq.to)
          .then((chunk) => {
            this.sendChunkReceived(chunkReq.from, chunkReq.to, chunk);

            console.log('Checks', chunkReq.to, this.outputStats.size);

            if (chunkReq.to >= this.outputStats.size) {
              fs.unlink(this.output, () => {
                debugLog(`Transcoding task ${this.id}: Works finished, file purged`);
              });
            }
          });
      });
    }

    getChunkFromFile(from, to) {
      const bytesToRead = to - from;

      const buff = Buffer.alloc(bytesToRead);

      return new Promise((resolve, reject) => {
        fs.open(this.output, 'r', (errOpen, fd) => {
          if (errOpen) {
            reject(errOpen);
            return;
          }

          fs.read(fd, buff, 0, bytesToRead, from, (errRead) => {
            if (errRead) {
              reject(errOpen);
              return;
            }

            fs.close(fd, () => {
              resolve(buff)
            });
          });
        });
      });
    }

    prepareFinished() {
      this.sendStarted();
      this.sendProgress(100);

      this.processChunks();

      this.sendFinished();
    }

    checkIfFinished() {
      const finishedPath = this._static.getFinishedPath(this.bridge.saveFolder, this.id);

      if (fs.existsSync(finishedPath)) {
        this.output = finishedPath;
        this.outputStats = fs.statSync(finishedPath);

        this.prepareFinished();
        return true;
      }

      return false;
    }

    handleTranscodingStart() {
      this.handleStop(() => {
        debugLog(`Transcoding task ${this.id}: Stopped`);

        this.sendStopped();
        this.command.kill('SIGTERM');
      });

      this.sendStarted();
    }

    handleTranscodingProgress(progress) {
      // DEATH SIMULATION
      // if (progress > 40) this.command.kill();

      debugLog(`Transcoding task ${this.id}: Processed ${progress}%`);

      this.sendProgress(progress);
    }

    handleTranscodingError(err) {
      const isSignal15 = (err.message.indexOf('signal 15') > -1);
      const isStoppedState = (this.state === 'STOPPED');

      if (isSignal15) {
        if (!isStoppedState) {
          debugLog(`Transcoding task ${this.id}: Suddenly stopped`);
        } else {
          debugLog(`Transcoding task ${this.id}: Stopped by user`);
          this.sendError('TRANSCODE_ABORT');
          return;
        }
      } else {
        debugLog(`Transcoding task ${this.id}: Error occurred (${err.message || 'no description'})`);
      }

      console.error(err);

      this.sendError('FFMPEG_ERROR');
      this.unhandleStop();
    }

    handleTranscodingEnd() {
      this.unhandleStop();

      /** Last 100 processed report by hands */
      this.handleTranscodingProgress(100);

      if (!fs.existsSync(this.output)) {
        debugLog(`Transcoding task ${this.id}: Final file not found`);

        this.sendError('FINAL_FILE_MISSING');
      }

      const finishedPath = this._static.getFinishedPath(this.bridge.saveFolder, this.id);
      fs.renameSync(this.output, finishedPath);
      this.output = finishedPath;
      this.outputStats = fs.statSync(finishedPath);

      debugLog(`Transcoding task ${this.id}: Finished`);

      this.processChunks();
      this.sendFinished();
    }

    spawnFfmpeg() {
      const threadsCount = coresCount / 2;

      const command = ffmpeg(this.input)
        .withVideoCodec('libx264')
        .withAudioCodec('libmp3lame')
        .videoFilters(`scale=-2:min'(720,ih)'`)
        .outputOption('-preset veryfast')
        .outputOption(`-threads ${threadsCount}`)
        .withVideoBitrate('2600k')
        .withAudioBitrate('256k')
        .outputFps(25)
        .format('mp4')

      return command;
    }

    handleStop = (cancel) => {
      this.bridge.ipcMain.once(`Transcoder:Task[${this.id}]:Stop`, cancel);
    };

    handleChunkRequest(handler) {
      this.bridge.ipcMain.on(`Transcoder:Task[${this.id}]:GetChunk`, handler);
    }

    unhandleStop = () => {
      this.bridge.ipcMain.removeAllListeners(`Transcoder:Task[${this.id}]:Stop`);
    };

    sendStarted = () => {
      this.state = 'STARTED';
      this.sender.send(`Transcoder:Task[${this.id}]:Started`);
    };

    sendProgress = (progress) => {
      this.progress = progress;
      this.sender.send(`Transcoder:Task[${this.id}]:Progress`, progress);
    };

    sendFinished = () => {
      this.state = 'FINISHED';
      this.sender.send(`Transcoder:Task[${this.id}]:Finished`, this.outputStats.size);
    };

    sendStopped = () => {
      this.state = 'STOPPED';
      this.sender.send(`Transcoder:Task[${this.id}]:Stopped`);
    };

    sendError = (error) => {
      this.state = 'HALTED';
      this.sender.send(`Transcoder:Task[${this.id}]:Error`, error);
    };

    sendChunkReceived = (from, to, chunk) => {
      const event = `Transcoder:Task[${this.id}]:ChunkReceived[${from}:${to}]`;
      this.sender.send(event, { data:chunk, from, to });
    };

    static getTemporaryPath(basePath, taskId) {
      const fileName = `transcoding-${taskId}.temp.mp4`;
      return path.join(basePath, fileName);
    }

    static getFinishedPath(basePath, taskId) {
      const fileName = `finished-transcoding-${taskId}.temp.mp4`;
      return path.join(basePath, fileName);
    }
  };

  static BinaryDownloader = class BinaryDownloader {
    downloaded = false;
    requirementsOk = false;

    progressHandler = () => {};

    constructor(bridge) {
      this.bridge = bridge;
      this.path = path.join(this.bridge.appFolder, bridge.binariesFolder);

      const binSize = 100 * 1024 * 1024;

      this.bridge.checkRequirements(binSize)
        .then((checkResult) => {
          this.requirementsOk = checkResult;

          const ffmpegPath = path.join(this.path, 'ffmpeg');
          const ffprobePath = path.join(this.path, 'ffprobe');

          ffmpeg.setFfmpegPath(ffmpegPath);
          ffmpeg.setFfprobePath(ffprobePath);
        });
    }

    listenProgress(handler) {
      this.progressHandler = handler;
    }

    download() {
      if (!this.requirementsOk) {
        return Promise.reject('REQUIREMENTS_NOT_MET');
      }

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
          const ffbinDownloadError = Error('FFBIN_DOWNLOAD_ERROR');
          reject(ffbinDownloadError);
        }

        ffbin.clearCache();
      });
    }
  };

  static ProbesProcessor = class ProbesProcessor {
    constructor(bridge) {
      this.bridge = bridge;

      this.handleGetProbe((event, filePath) => {
        this.sender = event.sender;

        ffmpeg.ffprobe(filePath, (err, meta) => {
          if (err) {
            this.sendProbeError('FFPROBE_ERROR');
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

          this.sendReceivedProbe(resultStats);
        });
      });
    }

    sendReceivedProbe = (probe) => {
      this.sender.send(`Transcoder:ReceivedProbe`, probe);
    }

    sendProbeError = (probe) => {
      this.sender.send(`Transcoder:ProbeError`, probe);
    }

    handleGetProbe = (handler) => {
      this.bridge.ipcMain.on(`Transcoder:GetProbe`, handler);
    }
  };

  async checkRequirements(spaceBase) {
    const spaceCalc = await checkDiskSpace(this.saveFolder);

    const isEnoughSpace = (spaceCalc.free > (spaceBase * this.minDiskSpaceK));
    const isRamEnough = (ramCount >= this.minRam);
    const areCoresEnough = (coresCount >= this.minCpuCores);

    return isRamEnough && areCoresEnough && isEnoughSpace;
  }

  loadInterruptedResults() {
    debugLog('Looking for interrupted transcodings');

    try {
      const regex = /transcoding-.+\.temp\.mp4/g;

      return fs.readdirSync(this.saveFolder)
        .map(f => f.name)
        .filter(f => regex.test(f));
    } catch (err) {
      console.error('Interrupted transcodings search error', err);
    }
  }

  handleTaskStart(handler) {
    this.ipcMain.on('Transcoder:Task', handler);
  }
}

module.exports = { TranscoderClient, TranscoderBridge };
