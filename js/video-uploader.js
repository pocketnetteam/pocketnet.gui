class VideoUploader {
  minChunkSize = 256;

  ptVideoApi = self.app.peertubeHandler.api.videos;

  loadProgress;
  chunkScalingCalculator;
  dataKeeper = {};

  constructor(videoFile) {
    this.static = VideoUploader;

    this.videoFile = videoFile;
  }

  async uploadChunked(startFrom = 0) {
    this.isResumable = true;

    this.videoName = await this.static.getUniqueId(this.videoFile);

    const videoUniqueId = `chunkupload_${this.videoName}`;

    const cachedResumable = this.static.getResumableStorage(videoUniqueId);

    let resumeFrom;

    if (cachedResumable) {
      const timeout12hours = cachedResumable.lastOperation + 12 * 60 * 60 * 1000;

      this.uploadId = cachedResumable.uploadId;

      if (timeout12hours < Date.now()) {
        this.static.deleteResumableStorage(videoUniqueId);
      } else {
        resumeFrom = cachedResumable.resumeFrom;

        const done = this.static.getPercentLoaded(this, resumeFrom);
        this.loadProgress(done);
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

      let loadResult = await this.static.loadChunk(this, chunkData, chunkPos)
        .catch((err) => {
          if (err.reason === 'not_found') {
            this.static.deleteResumableStorage(videoUniqueId);

            if (this.canceled) {
              this.static.deleteResumableStorage(videoUniqueId);

              throw {
                text: 'Video upload canceled',
                cancel: true,
              };
            }

            throw {
              reason: 'unhandled_error',
              text: 'Please try uploading again',
            };
          }

          this.static.setResumableStorage(videoUniqueId, {
            uploadId: this.uploadId,
            resumeFrom: chunkPos,
            lastOperation: Date.now(),
          });

          throw err;
        });

      this.static.setResumableStorage(videoUniqueId, {
        uploadId: this.uploadId,
        resumeFrom: chunkPos + chunkData.size,
        lastOperation: Date.now(),
      });

      const endUpload = Date.now();

      if (loadResult) {
        this.static.deleteResumableStorage(videoUniqueId);

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

    return this.static.uploadVideo(this);
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

    const { uploadId } = await self.ptVideoApi
      .initResumableUpload(data, options)
      .catch(() => {
        console.log('Resumable video init failed');
      });

    return Promise.resolve(uploadId);
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
          reason: 'unhandled_error',
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
    const videoUniqueId = `chunkupload_${self.videoName}`;

    self.static.deleteResumableStorage(videoUniqueId);

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
    let { lastModified, name, size, type } = videoFile;

    let data = { lastModified, name, size, type };

    let fileExtension = name.match(/\.(.*)/g);

    let uniqueData = JSON.stringify(data);

    let fileDataHash = await VideoUploader.sha256(uniqueData);

    // TODO: Generate hash for file
    return `video_${fileDataHash}${fileExtension}`;
  }

  static getResumableStorage(videoUniqueId) {
    if (!localStorage[videoUniqueId]) {
      return;
    }

    return JSON.parse(localStorage[videoUniqueId]);
  }

  static deleteResumableStorage(videoUniqueId) {
    delete localStorage[videoUniqueId];
  }

  static setResumableStorage(videoUniqueId, data) {
    localStorage[videoUniqueId] = JSON.stringify(data);
  }

  static base64ArrayBuffer(arrayBuffer) {
    var base64    = ''
    var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

    var bytes         = new Uint8Array(arrayBuffer)
    var byteLength    = bytes.byteLength
    var byteRemainder = byteLength % 3
    var mainLength    = byteLength - byteRemainder

    var a, b, c, d
    var chunk

    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
      // Combine the three bytes into a single integer
      chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

      // Use bitmasks to extract 6-bit segments from the triplet
      a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
      b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
      c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
      d = chunk & 63               // 63       = 2^6 - 1

      // Convert the raw binary segments to the appropriate ASCII encoding
      base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
    }

    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
      chunk = bytes[mainLength]

      a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

      // Set the 4 least significant bits to zero
      b = (chunk & 3)   << 4 // 3   = 2^2 - 1

      base64 += encodings[a] + encodings[b] + '=='
    } else if (byteRemainder == 2) {
      chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

      a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
      b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4

      // Set the 2 least significant bits to zero
      c = (chunk & 15)    <<  2 // 15    = 2^4 - 1

      base64 += encodings[a] + encodings[b] + encodings[c] + '='
    }

    return base64
  }

  static async sha256(string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(string);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return VideoUploader.base64ArrayBuffer(hash);
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

module.exports = VideoUploader;
