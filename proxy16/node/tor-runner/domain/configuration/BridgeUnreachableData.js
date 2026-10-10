'use strict';

class BridgeUnreachableData {
    constructor({
        bridgeAddress,
        firstCheckTime,
        lastCheckTime,
        checkCount
    } = {}) {
        this.bridgeAddress = bridgeAddress;
        this.firstCheckTime = firstCheckTime;
        this.lastCheckTime = lastCheckTime;
        this.checkCount = checkCount;
    }
}

module.exports = BridgeUnreachableData;
