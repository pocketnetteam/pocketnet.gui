'use strict';

const LOG_TAG = 'Bastyon';
const MAX_LOG_LENGTH = 16000;
const MAX_LOG_ENTRY_LENGTH = 4000;

class Logger {
    static logi(message) {
        Logger.emit('INFO', message ?? 'null');
    }

    static logw(message, error = "") {
        Logger.emit('WARN', Logger.messageWithError(message, error));
    }

    static loge(message, error = "", printStackTrace = false) {
        Logger.emit('ERROR', Logger.messageWithError(message, error, printStackTrace));
    }

    static messageWithError(message, error, printStackTrace = false) {
        if (!error) {
            return message ?? 'null';
        }

        const errorName = error?.constructor?.name || 'Error';
        const errorMessage = error?.message || '';
        const errorCause = error?.cause || '';
        const stackTrace = printStackTrace && error?.stack ? `\n${error.stack}` : '';

        return `${message ?? 'null'} ${errorName} ${errorMessage} ${errorCause}${stackTrace}`;
    }

    static emit(level, message) {
        Logger.truncateLog(level, message ?? 'null');
    }

    static truncateLog(level, content) {
        if (content.length > MAX_LOG_LENGTH) {
            Logger.truncateLog(level, content.substring(0, MAX_LOG_LENGTH));
            return;
        }

        if (content.length > MAX_LOG_ENTRY_LENGTH) {
            Logger.printLog(level, content.substring(0, MAX_LOG_ENTRY_LENGTH));
            Logger.truncateLog(level, content.substring(MAX_LOG_ENTRY_LENGTH));
            return;
        }

        Logger.printLog(level, content);
    }

    static printLog(level, content) {
        const line = `${LOG_TAG}: ${content}`;

        if (level === 'INFO') {
            console.info(line);
        } else if (level === 'ERROR') {
            console.error(line);
        } else {
            console.warn(line);
        }
    }
}

module.exports = Logger;
