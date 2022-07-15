/**
 * This function is flat version of NPM base58-js
 *
 * TODO: When we start use webpack or some sort
 *       of packers that understand require() and
 *       imports(), return to require('base58-js')
 */
// const { binary_to_base58: binaryB58 } = require('base58-js');
const binaryB58 = (() => {
  const base58_chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

  const create_base58_map = () => {
    const base58M = Array(256).fill(-1)
    for (let i = 0; i < base58_chars.length; ++i)
      base58M[base58_chars.charCodeAt(i)] = i

    return base58M
  }

  const base58Map = create_base58_map()

  const binary_to_base58 = uint8array => {
    const result = []

    for (const byte of uint8array) {
      let carry = byte
      for (let j = 0; j < result.length; ++j) {
        const x = (base58Map[result[j]] << 8) + carry
        result[j] = base58_chars.charCodeAt(x % 58)
        carry = (x / 58) | 0
      }
      while (carry) {
        result.push(base58_chars.charCodeAt(carry % 58))
        carry = (carry / 58) | 0
      }
    }

    for (const byte of uint8array)
      if (byte) break
      else result.push('1'.charCodeAt(0))

    result.reverse()

    return String.fromCharCode(...result)
  }

  return binary_to_base58;
})();

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

/**
 * Export function if require()
 */
if (typeof module === 'object' && module.exports) {
  module.exports = getUniqueFileId;
}
