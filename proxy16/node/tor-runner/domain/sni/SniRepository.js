'use strict';

class SniRepository {
    /**
     * @returns {Promise<string[]>}
     */
    getFakeSniHosts() {
        throw new Error('SniRepository.getFakeSniHosts is not implemented');
    }

    /**
     * @returns {boolean}
     */
    isWhiteListSuspected() {
        throw new Error('SniRepository.isWhiteListSuspected is not implemented');
    }
}

module.exports = SniRepository;
