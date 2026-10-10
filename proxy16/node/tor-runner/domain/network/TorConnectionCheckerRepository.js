'use strict';

class TorConnectionCheckerRepository {
    /**
     * @param {AbortSignal=} signal
     * @returns {Promise<boolean>}
     */
    isTorConnected(signal) {
        throw new Error('TorConnectionCheckerRepository.isTorConnected is not implemented');
    }
}

module.exports = TorConnectionCheckerRepository;
