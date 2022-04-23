const { binary_to_base58: binaryB58 } = require('base58-js');

async function getUniqueFileId(videoFile) {
  let { lastModified, name, size, type } = videoFile;

  let data = { lastModified, name, size, type };

  let uniqueData = JSON.stringify(data);

  let fileDataHash = await sha256(uniqueData);

  return fileDataHash;
}

async function sha256(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const bytes = new Uint8Array(hash);
  return binaryB58(bytes);
}

module.exports = getUniqueFileId;
