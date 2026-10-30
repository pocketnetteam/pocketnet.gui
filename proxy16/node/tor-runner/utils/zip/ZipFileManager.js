'use strict';

const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { pipeline } = require('stream/promises');

const archiver = require('archiver');
const extractZip = require('extract-zip');

const Logger = require('../logger/Logger');

class ZipFileManager {
    async extractZipFromInputStream(inputStream, outputPathDir) {
        let tempDir;

        try {
            tempDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'tor-runner-zip-'));
            const tempZipPath = path.join(tempDir, `${crypto.randomUUID()}.zip`);

            await fs.promises.mkdir(this.removeEndSlash(outputPathDir), { recursive: true });
            await pipeline(inputStream, fs.createWriteStream(tempZipPath));
            await this.extractZipAsync(tempZipPath, { dir: path.resolve(this.removeEndSlash(outputPathDir)) });

            return true;
        } catch (e) {
            Logger.loge('ZipFileManager extractZipFromInputStream', e, true);
            return false;
        } finally {
            if (tempDir) {
                await fs.promises.rm(tempDir, { recursive: true, force: true }).catch(() => {});
            }
        }
    }

    async extractZip(zipPath, outputPathDir) {
        if (!fs.existsSync(zipPath)) {
            Logger.loge(`ZipFileManager input file missing ${zipPath}`);
            return false;
        }

        try {
            await this.extractZipAsync(zipPath, { dir: path.resolve(this.removeEndSlash(outputPathDir)) });
            return true;
        } catch (e) {
            Logger.loge(`ZipFileManager extractZip ${zipPath}`, e);
            return false;
        }
    }

    async createZip(zipPath, ...inputSource) {
        const outputOuterDir = path.dirname(zipPath);
        let archive;
        let outputStream;

        if (!outputOuterDir || outputOuterDir === '.') {
            Logger.loge(`ZipFileManager extractZip outer dir does not exist ${zipPath}`);
            return false;
        }

        try {
            await fs.promises.mkdir(this.removeEndSlash(outputOuterDir), { recursive: true });

            const outputClosed = new Promise((resolve, reject) => {
                outputStream = fs.createWriteStream(zipPath);
                archive = archiver('zip', { zlib: { level: 9 } });
                let failed;

                const fail = (error) => {
                    if (failed) {
                        return;
                    }

                    failed = error;
                    archive.abort();
                    outputStream.destroy();
                };

                outputStream.once('close', () => {
                    if (failed) {
                        reject(failed);
                    } else {
                        resolve();
                    }
                });
                outputStream.once('error', fail);
                archive.once('error', fail);
                archive.once('warning', fail);

                archive.pipe(outputStream);

                try {
                    for (const source of inputSource) {
                        this.addZipEntry(archive, source);
                    }

                    Promise.resolve(archive.finalize()).catch(fail);
                } catch (e) {
                    fail(e);
                }
            });

            await outputClosed;
            return true;
        } catch (e) {
            if (archive) {
                archive.abort();
            }

            if (outputStream && !outputStream.destroyed) {
                outputStream.destroy();
            }

            await fs.promises.rm(zipPath, { force: true }).catch(() => {});
            Logger.loge(`ZipFileManager createZip ${zipPath}`, e);
            return false;
        }
    }

    addZipEntry(archive, source) {
        const sourcePath = this.toPath(source);
        const inputOuterDir = path.dirname(sourcePath);

        if (!inputOuterDir || inputOuterDir === '.') {
            Logger.logw(`ZipFileManager input outer dir does not exist ${path.resolve(sourcePath)}`);
            return;
        }

        const stat = fs.statSync(sourcePath);

        if (stat.isDirectory()) {
            archive.directory(sourcePath, path.basename(sourcePath));
        } else if (stat.isFile()) {
            archive.file(sourcePath, { name: path.basename(sourcePath) });
        } else {
            throw new Error(`createZip input fault: input no file and no dir ${sourcePath}`);
        }
    }

    removeEndSlash(filePath) {
        const trimmed = filePath.trim();
        if (trimmed.endsWith('/') || trimmed.endsWith(path.sep)) {
            return trimmed.substring(0, trimmed.length - 1);
        }

        return filePath;
    }

    extractZipAsync(zipPath, options) {
        return new Promise((resolve, reject) => {
            let settled = false;

            const finish = (error) => {
                if (settled) {
                    return;
                }

                settled = true;

                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            };

            try {
                const maybePromise = extractZip(zipPath, options, finish);

                if (maybePromise && typeof maybePromise.then === 'function') {
                    maybePromise.then(() => finish()).catch(finish);
                }
            } catch (e) {
                finish(e);
            }
        });
    }

    toPath(file) {
        return file?.path || file?.toString?.() || String(file);
    }
}

module.exports = ZipFileManager;
