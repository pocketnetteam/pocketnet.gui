// getUniqueFileId = require('./file-hash');

if(typeof require != 'undefined'){
  getUniqueFileId = require('./file-hash');
}

class VideoUploader {
  minChunkSize = 256;

  ptVideoApi = self.app.peertubeHandler.api.videos;

  loadProgress;
  chunkScalingCalculator;
  dataKeeper = {};

  constructor(videoFile) {
    this.static = VideoUploader;

    this.videoFile = videoFile;

    this.activeHost = app.peertubeHandler.active();
  }

  async uploadChunked(startFrom = 0) {
    this.isResumable = true;

    this.videoName = await this.static.getUniqueId(this.videoFile);

    const userAddress = app.user.address.value;

    const videoUniqueId = `${this.activeHost}_${userAddress}_${this.videoName}`;

    const cachedResumable = this.getResumableStorage(videoUniqueId);

    let resumeFrom;

    if (cachedResumable) {
      const timeout12hours = cachedResumable.lastOperation + 12 * 60 * 60 * 1000;

      this.uploadId = cachedResumable.uploadId;

      if (timeout12hours < Date.now()) {
        this.deleteResumableStorage(videoUniqueId);
      } else {
        resumeFrom = cachedResumable.resumeFrom;
      }
    } else {
      this.uploadId = await this.static.initResumable(this);
    }

    let chunkPos = resumeFrom || startFrom;

    let chunker = this.getNextChunk(chunkPos);

    let chunkerNextPromise = await chunker.next();
    let chunkData = chunkerNextPromise.value;

    while(chunkData && !this.canceled) {
      const startUpload = Date.now();

      let loadResult;

      try {
        loadResult = await this.static.loadChunk(this, chunkData, chunkPos);
      } catch(err) {
        if (err.reason === 'not_found') {
          if (this.canceled) {
            throw {
              text: 'Video upload canceled',
              cancel: true,
            };
          }

          console.error('Load chunk error', err);
          this.deleteResumableStorage(videoUniqueId);

          return await this.uploadChunked();
        } else {
          this.setResumableStorage(videoUniqueId, {
            uploadHost: app.peertubeHandler.active(),
            uploadId: this.uploadId,
            resumeFrom: chunkPos,
            lastOperation: Date.now(),
          });

          throw err;
        }
      }

      this.setResumableStorage(videoUniqueId, {
        uploadHost: app.peertubeHandler.active(),
        uploadId: this.uploadId,
        resumeFrom: chunkPos + chunkData.size,
        lastOperation: Date.now(),
      });

      const endUpload = Date.now();

      if (loadResult) {
        this.deleteResumableStorage(videoUniqueId);

        return loadResult;
      }

      if (typeof this.chunkScalingCalculator === 'function') {
        this.chunkSize = this.chunkScalingCalculator({
          time: endUpload - startUpload,
          videoSize: this.videoFile.size,
          chunkSize: chunkData.size,
        }, this.dataKeeper);
      }

      if (this.canceled) {
        throw { cancel: true };
      }

      chunkPos += chunkData.size;

      if (typeof this.loadProgress === 'function') {
        const done = this.static.getPercentLoaded(this, chunkPos);
        this.loadProgress(done);
      }

      let chunkerNextPromise = await chunker.next();
      chunkData = chunkerNextPromise.value;
    }
  }

  async upload() {
    this.videoName = await self.static.getUniqueId(this.videoFile);

    this.loadProgress(100);

    return await this.static.uploadVideo(this);
  }

  async cancel() {
    this.canceled = true;

    if (this.isResumable) {
      return this.static.cancelResumable(this);
    }

    return this.static.cancelUpload(this);
  }

  async destroy(){
    this.canceled = true;
    this.videoFile = null;
    this.activeHost = null;
  }

  async * getNextChunk(startFrom) {
    const videoFile = this.videoFile;
    const videoSize = this.videoFile.size;

    this.chunkSize = this.minChunkSize;

    let position = startFrom;

    do {
      const chunkSize = this.chunkSize;

      const restBytes = videoSize - position;
      const lastChunk = (restBytes < chunkSize);

      let endByte = position + chunkSize;

      if (lastChunk) {
        endByte = videoSize;
      }

      if (!this.chunkRequestor) {
        yield videoFile.slice(position, endByte);
      } else {
        yield await this.chunkRequestor(position, endByte);
      }

      position += chunkSize;
    } while (position < videoSize);
  }

  static async initResumable(self) {
    const data = {};
    const options = {};

    data.video = self.videoFile;
    data.name = self.videoName;
    options.type = 'uploadVideo';

    const response = await self.ptVideoApi
      .initResumableUpload(data, options)
      .catch(() => {
        console.error('Resumable video init failed');
      });

    if (!response) {
      throw 'RESUMABLE_UPLOAD_INIT';
    }

    return Promise.resolve(response.uploadId);
  }

  static async loadChunk(self, chunk, chunkPos) {
    const data = {};
    const options = {};

    data.chunkData = chunk;
    data.chunkPosition = chunkPos;
    data.videoSize = self.videoFile.size;
    data.uploadId = self.uploadId;

    if (self.canceled) {
      return;
    }

    const loadResult = await self.ptVideoApi
      .proceedResumableUpload(data, options)
      .catch(() => {
        throw {
          reason: 'resumable_chunk_request_failed',
          text: 'Looks like there are problems with your connection',
        };
      });

    const handleResume = () => {
      const percent = self.videoFile.size / 100;
      const currentPercent = Math.floor(chunkPos / percent);

      if (typeof self.onChunkUploadEnd === 'function' && !self.canceled) {
        self.onChunkUploadEnd(currentPercent);
      }
    };
    const handleUploadEnd = (result) => {
      return result;
    };
    const handleNotFound = () => {
      throw {
        reason: 'not_found',
        text: 'Upload ID does not exist',
      };
    };

    switch (loadResult.responseType) {
      case 'resume_upload': return handleResume();
      case 'upload_end': return handleUploadEnd(loadResult);
      case 'not_found': return handleNotFound();
    }
  }

  static async cancelResumable(self) {
    const userAddress = app.user.address.value;

    const videoUniqueId = `${self.activeHost}_${userAddress}_${self.videoName}`;

    self.deleteResumableStorage(videoUniqueId);

    const cancelResult = await self.ptVideoApi
      .cancelResumableUpload({
        uploadId: self.uploadId,
      })
      .catch(() => {
        throw Error('Resumable video cancel failed');
      });

    const handleSuccess = () => {
      return true;
    };
    const handleNotFound = () => {
      throw Error('Upload ID does not exist');
    };

    switch (cancelResult.responseType) {
      case 'success': return handleSuccess();
      case 'not_found': return handleNotFound();
    }
  }

  static async cancelUpload(self) {
    if (typeof self.cancelToken === 'function') {
      self.cancelToken();
    }
  }

  static async uploadVideo(self) {
    const data = {};
    const options = {};

    data.video = self.videoFile;
    data.name = self.videoName;

    options.type = 'uploadVideo';
    options.cancel = (cancel) => this.cancelToken = cancel;

    const uploadResult = await self.ptVideoApi
      .upload(data, options);

    return uploadResult;
  }

  static async getUniqueId(videoFile) {
    let { name } = videoFile;

    let fileExtension = name.match(/\.(.*)/g);

    let fileDataHash = await getUniqueFileId(videoFile)
      .catch(() => {
        // TODO: Handle errors
        console.error('File unique ID generator error. Do you use prehistoric browser?');
      });

    return `video_${fileDataHash}${fileExtension}`;
  }

  getResumableStorage(videoUniqueId) {
    const storeName = `resumable_${videoUniqueId}`;

    if (!localStorage[storeName]) {
      return;
    }

    return JSON.parse(localStorage[storeName]);
  }

  deleteResumableStorage(videoUniqueId) {
    const storeName = `resumable_${videoUniqueId}`;

    delete localStorage[storeName];
  }

  setResumableStorage(videoUniqueId, data) {
    const storeName = `resumable_${videoUniqueId}`;

    if (!this.canceled) {
      localStorage[storeName] = JSON.stringify(data);
    }
  }

  static getPercentLoaded(self, chunkPos) {
    const percent = self.videoFile.size / 100;
    return chunkPos / percent;
  }

  /**
   * This function is a stub that needs to
   * be overridden to work with the uncommon
   * chunking process. Don't use it when
   * file passed in constructor.
   *
   * @param position
   * @param endByte
   *
   * @return {Promise<TypedArray>}
   */
  chunkRequestor;
}

if(typeof module != 'undefined')
  module.exports = VideoUploader;
