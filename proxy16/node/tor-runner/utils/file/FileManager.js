'use strict';

const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');

const Logger = require('../logger/Logger');

class FileManager {
    async createFolderAsync(folder) {
        const folderPath = this.toPath(folder);

        try {
            await fs.promises.mkdir(folderPath, { recursive: true });
            return true;
        } catch (e) {
            Logger.loge(`FileManager createFolderAsync ${folderPath}`, e);
            return false;
        }
    }

    createFile(file, content = '') {
        const filePath = this.toPath(file);

        try {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });

            if (!fs.existsSync(filePath)) {
                fs.closeSync(fs.openSync(filePath, 'w'));
            }

            if (content.length > 0) {
                fs.writeFileSync(filePath, content, 'utf8');
            }

            return true;
        } catch (e) {
            Logger.loge(`FileManager createFile ${filePath}`, e);
            return false;
        }
    }

    async createFileAsync(file, content = '') {
        const filePath = this.toPath(file);

        try {
            await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

            if (content.length > 0) {
                await fs.promises.writeFile(filePath, content, 'utf8');
            } else {
                const handle = await fs.promises.open(filePath, 'a');
                await handle.close();
            }

            return true;
        } catch (e) {
            Logger.loge(`FileManager createFileAsync ${filePath}`, e);
            return false;
        }
    }

    async deleteFileAsync(file) {
        const filePath = this.toPath(file);

        try {
            await fs.promises.rm(filePath, { force: true });
            return true;
        } catch (e) {
            Logger.loge(`FileManager deleteFileAsync ${filePath}`, e);
            return false;
        }
    }

    async copyFileAsync(source, destination) {
        const sourcePath = this.toPath(source);
        const destinationPath = this.toPath(destination);

        try {
            await fs.promises.mkdir(path.dirname(destinationPath), { recursive: true });
            await fs.promises.copyFile(sourcePath, destinationPath);
            return true;
        } catch (e) {
            Logger.loge(`FileManager copyFileAsync ${sourcePath} to ${destinationPath}`, e);
            return false;
        }
    }

    async moveFileAsync(source, destination) {
        const sourcePath = this.toPath(source);
        const destinationPath = this.toPath(destination);

        try {
            return await this.copyFileAsync(sourcePath, destinationPath) &&
                await this.deleteFileAsync(sourcePath);
        } catch (e) {
            Logger.loge(`FileManager moveFileAsync ${sourcePath} to ${destinationPath}`, e);
            return false;
        }
    }

    readFile(file) {
        const filePath = this.toPath(file);

        try {
            const stat = this.stat(filePath);
            if (!stat?.isFile()) {
                return [];
            }

            return this.splitLines(fs.readFileSync(filePath, 'utf8'));
        } catch (e) {
            Logger.loge(`FileManager readFile ${filePath}`, e);
            return [];
        }
    }

    async readFileAsync(file) {
        const filePath = this.toPath(file);

        try {
            const stat = await fs.promises.stat(filePath);
            if (!stat.isFile()) {
                return [];
            }

            return this.splitLines(await fs.promises.readFile(filePath, 'utf8'));
        } catch (e) {
            if (e.code !== 'ENOENT') {
                Logger.loge(`FileManager readFileAsync ${filePath}`, e);
            }
            return [];
        }
    }

    async readBytesAsync(file) {
        const filePath = this.toPath(file);

        try {
            return await fs.promises.readFile(filePath);
        } catch (e) {
            if (e.code !== 'ENOENT') {
                Logger.loge(`FileManager readBytesAsync ${filePath}`, e);
            }
            return null;
        }
    }

    async getFileDigestAsync(file, algorithm = 'sha256') {
        const filePath = this.toPath(file);

        try {
            const content = await fs.promises.readFile(filePath);
            return crypto.createHash(algorithm).update(content).digest('hex');
        } catch (e) {
            if (e.code !== 'ENOENT') {
                Logger.loge(`FileManager getFileDigestAsync ${filePath}`, e);
            }
            return null;
        }
    }

    async createTempDirAsync(prefix) {
        const safePrefix = this.normalizeTempPrefix(prefix);

        try {
            return await fs.promises.mkdtemp(path.join(os.tmpdir(), safePrefix));
        } catch (e) {
            Logger.loge(`FileManager createTempDirAsync ${safePrefix}`, e);
            return null;
        }
    }

    async deleteTempDirAsync(tempDir) {
        const tempDirPath = this.toPath(tempDir);

        try {
            await fs.promises.rm(tempDirPath, { recursive: true, force: true });
            return true;
        } catch (e) {
            Logger.loge(`FileManager deleteTempDirAsync ${tempDirPath}`, e);
            return false;
        }
    }

    async findFileEndingWithAsync(directory, fileNameSuffix) {
        const directoryPath = this.toPath(directory);

        try {
            const entries = await fs.promises.readdir(directoryPath, { withFileTypes: true });
            for (const entry of entries) {
                if (entry.isSymbolicLink()) {
                    continue;
                }

                const entryPath = path.join(directoryPath, entry.name);
                if (entry.isDirectory()) {
                    const found = await this.findFileEndingWithAsync(entryPath, fileNameSuffix);
                    if (found) {
                        return found;
                    }
                } else if (entry.isFile() && entry.name.endsWith(fileNameSuffix)) {
                    return entryPath;
                }
            }
        } catch (e) {
            Logger.loge(`FileManager findFileEndingWithAsync ${directoryPath}`, e);
        }

        return null;
    }

    rewriteFile(file, content = []) {
        const filePath = this.toPath(file);

        try {
            if (!this.createFile(filePath)) {
                return false;
            }

            const text = content.length > 0 ? `${content.join('\n')}\n` : '';
            fs.writeFileSync(filePath, text, 'utf8');
            return true;
        } catch (e) {
            Logger.loge(`FileManager rewriteFile ${filePath}`, e);
            return false;
        }
    }

    async rewriteFileAsync(file, content = []) {
        const filePath = this.toPath(file);

        try {
            await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

            const text = content.length > 0 ? `${content.join('\n')}\n` : '';
            await fs.promises.writeFile(filePath, text, 'utf8');
            return true;
        } catch (e) {
            Logger.loge(`FileManager rewriteFileAsync ${filePath}`, e);
            return false;
        }
    }

    stat(filePath) {
        try {
            return fs.statSync(filePath);
        } catch (e) {
            if (e.code !== 'ENOENT') {
                Logger.loge(`FileManager stat ${filePath}`, e);
            }
            return null;
        }
    }

    async statAsync(filePath) {
        try {
            return await fs.promises.stat(filePath);
        } catch (e) {
            if (e.code !== 'ENOENT') {
                Logger.loge(`FileManager statAsync ${filePath}`, e);
            }
            return null;
        }
    }

    async lstatAsync(filePath) {
        try {
            return await fs.promises.lstat(filePath);
        } catch (e) {
            if (e.code !== 'ENOENT') {
                Logger.loge(`FileManager lstatAsync ${filePath}`, e);
            }
            return null;
        }
    }

    splitLines(content) {
        if (!content) {
            return [];
        }

        const lines = content.split(/\r?\n/);

        if (lines.length > 1 && lines[lines.length - 1] === '') {
            lines.pop();
        }

        return lines;
    }

    normalizeTempPrefix(prefix) {
        const baseName = path.basename(prefix || '');
        const safeName = baseName
            .replace(/[^a-zA-Z0-9._-]/g, '-')
            .replace(/^\.+$/, '');

        return `${safeName || 'tmp'}-`;
    }

    toPath(file) {
        return file?.path || file?.toString?.() || String(file);
    }
}

module.exports = FileManager;
