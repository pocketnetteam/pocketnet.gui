'use strict';

const webTunnelSniRegex = / servername(s)?=\S+/g;

function isObfs4Bridge(bridge = '') {
    return bridge.startsWith('obfs4');
}

function isWebTunnelBridge(bridge = '') {
    return bridge.startsWith('webtunnel');
}

function isVanillaBridge(bridge = '') {
    return /^([\d\[]).+/.test(bridge);
}

function interleave(...lists) {
    const result = [];
    const maxSize = Math.max(0, ...lists.map((list) => list.length));

    for (let index = 0; index < maxSize; index += 1) {
        for (const list of lists) {
            if (index < list.length) {
                result.push(list[index]);
            }
        }
    }

    return result;
}

function shuffle(items, random = Math.random) {
    const result = [...items];

    for (let index = result.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(random() * (index + 1));
        [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
    }

    return result;
}

function chunk(items, size) {
    const chunks = [];

    for (let index = 0; index < items.length; index += size) {
        chunks.push(items.slice(index, index + size));
    }

    return chunks;
}

module.exports = {
    webTunnelSniRegex,
    isObfs4Bridge,
    isWebTunnelBridge,
    isVanillaBridge,
    interleave,
    shuffle,
    chunk
};
