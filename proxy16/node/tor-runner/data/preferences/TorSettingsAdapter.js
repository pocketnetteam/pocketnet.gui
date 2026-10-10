'use strict';

const TorMode = require('../../domain/core/TorMode');

class TorSettingsAdapter {
    constructor({ settings = {}, onSettingsChanged = null } = {}) {
        this.settings = settings;
        this.onSettingsChanged = onSettingsChanged;
    }

    getTorMode() {
        return this.toTorMode(this.settings.enabled3);
    }

    setTorMode(mode) {
        const enabled3 = this.toEnabled3(mode);
        if (this.settings.enabled3 === enabled3) {
            return true;
        }

        this.settings.enabled3 = enabled3;
        this.onSettingsChanged?.(this.settings);
        return true;
    }

    toTorMode(enabled3) {
        switch (enabled3) {
        case 'neveruse':
            return TorMode.NEVER;
        case 'always':
            return TorMode.ALWAYS;
        case 'auto':
            return TorMode.AUTO;
        default:
            return TorMode.UNDEFINED;
        }
    }

    toEnabled3(mode) {
        switch (mode) {
        case TorMode.NEVER:
            return 'neveruse';
        case TorMode.ALWAYS:
            return 'always';
        case TorMode.AUTO:
            return 'auto';
        default:
            return this.settings.enabled3 || 'neveruse';
        }
    }
}

module.exports = TorSettingsAdapter;
