'use strict';

const fs = require('fs');
const path = require('path');

const Logger = require('../utils/logger/Logger');

class JsonPreferenceStorage {
    preferences = null;
    loadedFilePath = null;
    writeQueue = Promise.resolve();
    temporaryFileIndex = 0;
    pendingWriteFailed = false;

    constructor({ filePath }) {
        this.filePath = filePath;
    }

    getFilePath() {
        return typeof this.filePath === 'function' ? this.filePath() : this.filePath;
    }

    getString(key, defaultValue = '') {
        const value = this.read()[key];
        return typeof value === 'string' ? value : defaultValue;
    }

    async putString(key, value) {
        return this.writeValue(key, String(value));
    }

    getLong(key, defaultValue = 0) {
        const value = this.read()[key];
        return Number.isSafeInteger(value) ? value : defaultValue;
    }

    async putLong(key, value) {
        const numberValue = Number(value);
        if (!Number.isSafeInteger(numberValue)) {
            Logger.loge(`JsonPreferenceStorage putLong invalid value ${key} ${value}`);
            return false;
        }

        return this.writeValue(key, numberValue);
    }

    getStringSet(key, defaultValue = new Set()) {
        const value = this.read()[key];
        if (!Array.isArray(value)) {
            return new Set(defaultValue);
        }

        return new Set(value.filter((item) => typeof item === 'string'));
    }

    async putStringSet(key, value) {
        return this.writeValue(key, [...value].map(String));
    }

    read(filePath = null) {
        let resolvedFilePath = filePath;
        try {
            resolvedFilePath = resolvedFilePath || this.getFilePath();
            if (resolvedFilePath === this.loadedFilePath && this.preferences) {
                return { ...this.preferences };
            }

            if (!fs.existsSync(resolvedFilePath)) {
                this.setPreferences(resolvedFilePath, {});
                return {};
            }

            const content = fs.readFileSync(resolvedFilePath, 'utf8');
            const preferences = this.parsePreferences(content, resolvedFilePath);
            this.setPreferences(resolvedFilePath, preferences);
            return { ...preferences };
        } catch (e) {
            Logger.loge(`JsonPreferenceStorage read ${resolvedFilePath || '<unresolved path>'}`, e);
            return {};
        }
    }

    writeValue(key, value) {
        const task = this.writeQueue.then(() => this.writeValueAsync(key, value));
        this.writeQueue = task.then((succeeded) => {
            if (!succeeded) {
                this.pendingWriteFailed = true;
            }
        }, () => {
            this.pendingWriteFailed = true;
        });
        return task;
    }

    async flush() {
        await this.writeQueue;
        const succeeded = !this.pendingWriteFailed;
        this.pendingWriteFailed = false;
        return succeeded;
    }

    async writeValueAsync(key, value) {
        let filePath = null;
        try {
            filePath = this.getFilePath();
            const preferences = await this.readAsync(filePath);
            preferences[key] = value;
            await this.writeAsync(preferences, filePath);
            this.setPreferences(filePath, preferences);
            return true;
        } catch (e) {
            Logger.loge(`JsonPreferenceStorage writeValue ${filePath || '<unresolved path>'}`, e);
            return false;
        }
    }

    async readAsync(filePath = this.getFilePath()) {
        if (filePath === this.loadedFilePath && this.preferences) {
            return { ...this.preferences };
        }

        try {
            const content = await fs.promises.readFile(filePath, 'utf8');
            const preferences = this.parsePreferences(content, filePath);
            this.setPreferences(filePath, preferences);
            return { ...preferences };
        } catch (e) {
            if (e.code === 'ENOENT') {
                this.setPreferences(filePath, {});
                return {};
            }

            throw e;
        }
    }

    async writeAsync(preferences, filePath = this.getFilePath()) {
        const temporaryFilePath = `${filePath}.${process.pid}.${this.temporaryFileIndex += 1}.tmp`;

        try {
            await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
            await fs.promises.writeFile(temporaryFilePath, `${JSON.stringify(preferences, null, 2)}\n`, 'utf8');
            await fs.promises.rename(temporaryFilePath, filePath);
        } finally {
            await fs.promises.rm(temporaryFilePath, { force: true }).catch(() => {});
        }
    }

    setPreferences(filePath, preferences) {
        this.loadedFilePath = filePath;
        this.preferences = { ...preferences };
    }

    parsePreferences(content, filePath) {
        const preferences = content ? JSON.parse(content) : {};
        if (!preferences || typeof preferences !== 'object' || Array.isArray(preferences)) {
            throw new Error(`JsonPreferenceStorage invalid document shape ${filePath}`);
        }

        return preferences;
    }
}

module.exports = JsonPreferenceStorage;
