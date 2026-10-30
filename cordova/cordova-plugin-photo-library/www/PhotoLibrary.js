var exec = require('cordova/exec');

// Authorization statuses:
// 'full'          - access to all photos
// 'limited'       - access to photos selected by the user (iOS 14+, Android 14+)
// 'notDetermined' - the user has not been asked yet
// 'denied'        - denied, the system dialog can be shown again (Android)
// 'blocked'       - denied permanently, can be changed only in the app settings

var photoLibrary = {};

// success(status) when access is full or limited, otherwise error(status)
photoLibrary.requestAuthorization = function (success, error) {
  exec(success, error, 'PhotoLibrary', 'requestAuthorization', []);
};

photoLibrary.getAuthorizationStatus = function (success, error) {
  exec(success, error, 'PhotoLibrary', 'getAuthorizationStatus', []);
};

// In limited mode shows the system screen to change the selected photos.
// success(status) after the user finished, otherwise behaves as requestAuthorization
photoLibrary.manageLimitedAccess = function (success, error) {
  exec(success, error, 'PhotoLibrary', 'manageLimitedAccess', []);
};

photoLibrary.openSettings = function (success, error) {
  exec(success, error, 'PhotoLibrary', 'openSettings', []);
};

// Images only, newest first. success({ library, isLastChunk }) is called for every chunk.
// Library item: { id, width, height, creationDate }
photoLibrary.getLibrary = function (success, error, options) {

  options = options || {};

  var params = {
    itemsInChunk: options.itemsInChunk || 0,
    maxItems: options.maxItems || 0
  };

  // keep chunks in order
  var pending = {};
  var nextChunkNum = 0;

  exec(function (chunk) {

    pending[chunk.chunkNum] = chunk;

    while (pending[nextChunkNum]) {
      var current = pending[nextChunkNum];

      delete pending[nextChunkNum];
      nextChunkNum += 1;

      success({
        library: parseDates(current.library || []),
        isLastChunk: current.isLastChunk
      });
    }

  }, error, 'PhotoLibrary', 'getLibrary', [params]);
};

// success(blob)
photoLibrary.getThumbnail = function (photoIdOrLibraryItem, success, error, options) {

  options = options || {};

  exec(function (data, mimeType) {
    success(dataAndMimeTypeToBlob(data, mimeType));
  }, error, 'PhotoLibrary', 'getThumbnail', [getPhotoId(photoIdOrLibraryItem), {
    thumbnailWidth: options.thumbnailWidth || 256,
    thumbnailHeight: options.thumbnailHeight || 256,
    quality: options.quality || 0.7
  }]);
};

// success(blob) with the photo scaled down to fit maxWidth x maxHeight
photoLibrary.getPhoto = function (photoIdOrLibraryItem, success, error, options) {

  options = options || {};

  exec(function (data, mimeType) {
    success(dataAndMimeTypeToBlob(data, mimeType));
  }, error, 'PhotoLibrary', 'getPhoto', [getPhotoId(photoIdOrLibraryItem), {
    maxWidth: options.maxWidth || 2048,
    maxHeight: options.maxHeight || 2048,
    quality: options.quality || 0.9
  }]);
};

// url is a dataURL. success(libraryItem)
photoLibrary.saveImage = function (url, success, error) {

  exec(function (libraryItem) {
    success(libraryItem ? parseDates([libraryItem])[0] : null);
  }, error, 'PhotoLibrary', 'saveImage', [url]);
};

module.exports = photoLibrary;

var getPhotoId = function (photoIdOrLibraryItem) {
  return photoIdOrLibraryItem && typeof photoIdOrLibraryItem.id !== 'undefined' ? photoIdOrLibraryItem.id : photoIdOrLibraryItem;
};

var parseDates = function (library) {
  for (var i = 0; i < library.length; i++) {
    if (library[i].creationDate) {
      library[i].creationDate = new Date(library[i].creationDate);
    }
  }

  return library;
};

var dataAndMimeTypeToBlob = function (data, mimeType) {
  // android sends { data: base64, mimeType }
  if (!mimeType && data && data.data && data.mimeType) {
    mimeType = data.mimeType;
    data = data.data;
  }

  if (typeof data === 'string') {
    data = cordova.require('cordova/base64').toArrayBuffer(data);
  }

  return new Blob([data], { type: mimeType });
};
