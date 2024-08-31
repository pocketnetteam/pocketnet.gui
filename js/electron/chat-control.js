const dockerCLI = require('docker-cli-js');
const dockerCompose = require('docker-compose');
const tcpPortUsed = require('tcp-port-used');
const fs = require('fs');
const axios = require('axios');
const extractZip = require('extract-zip');

module.exports = class ChatControl {
    constructor(options) {
        this.options = options;
    }

    checkChatIsInstalling() {
        const pathToFile = this.options.dataDir + "version";

        return fs.existsSync(pathToFile);
    }

    checkDocker() {
        const docker = new dockerCLI.Docker();
        docker.options.echo = false;

        return docker.command('ps').then(function (data) {

        }).then(function () {
            return dockerCompose.version().then(function (data) {
            })
        })
    }

    checkChatIsRunning() {
        const docker = new dockerCLI.Docker();
        docker.options.echo = false;

        return docker.command('inspect bastyon-chat').then(function (data) {
            if (data.object.length === 0) {
                return false;
            }

            return data.object[0].State.Running;
        }, function (rejected) {
            return false;
        });
    }

    checkPortIsBusy(port) {
        return tcpPortUsed.check(port, '127.0.0.1')
            .then(function(inUse) {
                if (inUse) {
                    console.error('Port ' + port + ' in usage');
                }

                return inUse;
            }, function(err) {
                console.error('Error on check: ', err.message);

                return true;
            });
    }

    checkMatrixCert() {
        const pathToFile = this.options.dataDir + "configs/bastyon.signing.key";

        const exists = fs.existsSync(pathToFile);

        return exists;
    }

    checkHomeServerConfig() {
        const pathToFile = this.options.dataDir + "configs/homeserver.yaml";

        const exists = fs.existsSync(pathToFile);

        return exists;
    }

    checkWhatFolderIsEmpty() {
        const dataDir = this.options.dataDir;

        fs.readdir(dataDir, function(err, files) {
            if (err) {
                console.log(err)
            } else {
                if (!files.length) {
                    console.log("folder is empty");
                } else {
                    console.log("folder is not empty");
                }
            }
        });
    }

    startServer() {
        const port = this.options.port;
        const chat = this;

        return this.checkChatIsRunning().then(function (isRunning) {
            if (isRunning) {
                return Promise.resolve();
            }

            return chat.checkPortIsBusy(port).then(function (result) {
                if (result) {
                    return Promise.reject('port is busy');
                }
            }).then(function () {
                if (!chat.checkHomeServerConfig() || !chat.checkMatrixCert()) {
                    return chat.installLastRelease();
                }
            }).then(function () {
                return chat.checkDocker();
            }).then(function () {
                return dockerCompose.upAll({cwd: chat.options.dataDir})
            });
        });
    }

    stopServer() {
        return dockerCompose.stop({cwd: this.options.dataDir});
    }

    restartServer() {
        const chat = this;

        return this.stopServer().then(function () {
            return chat.startServer();
        })
    }

    deleteAllUserData() {
        const dataPath = this.options.dataDir + "data/";

        return this.stopServer().then(function () {
            if (fs.existsSync(dataPath)) {
                const files = fs.readdirSync(dataPath);

                for (const file of files) {
                    if (fs.existsSync(dataPath + file + "/")) {
                        fs.rmdirSync(dataPath + file + "/", {recursive: true});
                    } else {
                        fs.unlinkSync(dataPath + file);
                    }
                }
            }
        });
    }

    installLastRelease() {
        const chat = this;

        return chat.downloadAndUnzipLastRelease().then(function () {
            chat.createFolderStructure();

            const parameters = {
                "#DOMAIN": chat.options.domain,
                "#PORT": chat.options.port
            }

            return chat.copyTemplates(parameters);
        }).then(function () {
            if (!chat.checkMatrixCert()) {
                return chat.generateMatrixKey();
            }
        }).then(function (){
            const parameters = {
                "#DOMAIN": chat.options.domain,
                "#PORT": chat.options.port
            }

            return chat.copyTemplates(parameters);
        }).then(function () {
            chat.removeDownloads();
        }).then(function () {
            return chat.pullLastRelease();
        }).then(function () {
            return chat.writeCompleteReleaseTag();
        });
    }

    createFolderStructure() {
        const dataDir = this.options.dataDir;

        if (!fs.existsSync(dataDir + "/configs")) {
            fs.mkdirSync(dataDir + "/configs", { recursive: true });
        }
    }

    downloadAndUnzipLastRelease() {
        const chat = this;
        const downloadPath = this.options.dataDir + "downloads/";

        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath);
        } else {
            fs.rmdirSync(downloadPath, {recursive: true});
            fs.mkdirSync(downloadPath);
        }

        return axios.get("https://api.github.com/repos/yanotek/matrix-control/releases/latest").then(function(response) {
            const data = response.data;
            const zipUrl = data["zipball_url"];

            const version = data["tag_name"];
            chat.writeInstallationTag(version);

            if(zipUrl) return Promise.resolve(zipUrl);

            return Promise.reject('notfound');
        }).then(async function(url) {
            const file = fs.createWriteStream(downloadPath + "release.zip");

            return axios({
                method: 'GET',
                url: url,
                responseType: 'stream',
                headers: {
                    'User-Agent': 'request'
                }
            }).then(async response => {
                return new Promise((resolve, reject) => {
                    response.data.pipe(file);
                    let error = null;
                    file.on('error', err => {
                        error = err;
                        file.close();
                        reject(err);
                    });
                    file.on('close', () => {
                        if (!error) {
                            resolve(true);
                        }
                    });
                });
            }).then(function () {
                return extractZip(downloadPath + "release.zip", { dir: chat.options.dataDir + "/downloads" });
            });
        });
    }

    copyTemplates(parameters) {
        const downloadsPath = this.options.dataDir + "/downloads";
        const chat = this;

        const directories =
            fs.readdirSync(downloadsPath, { withFileTypes: true })
                .filter(dirent => dirent.isDirectory() && dirent.name.includes("matrix-control"))
                .map(dirent => dirent.name);

        if (directories.length !== 1) {
            throw "downloads contains more than 1 matrix-control folders";
        }

        const dockerPath = downloadsPath + "/" + directories[0] + "/docker/";
        const destPath = this.options.dataDir;

        return chat.copyTemplate(dockerPath + "docker-compose.yml", destPath + "docker-compose.yml", parameters).then( function () {
            return chat.copyTemplate(dockerPath + "homeserver-template.yaml", destPath + "configs/homeserver.yaml", parameters);
        });
    }

    removeDownloads() {
        const downloadPath = this.options.dataDir + "downloads/";

        if (fs.existsSync(downloadPath)) {
            fs.rmdirSync(downloadPath, {recursive: true});
        }
    }

    copyTemplate(source, dest, parameters) {
        return fs.promises.readFile(source,  'utf8').then(function (result) {
            Object.keys(parameters).map(function(objectKey, index) {
                const value = parameters[objectKey];
                result = result.replace(new RegExp(objectKey, 'g'), value);
            });

            return fs.writeFile(dest, result, 'utf8', function (err) {
                if (err) return console.log(err);
            });
        });
    }

    generateMatrixKey() {
        const chat = this;

        return dockerCompose
            .run("bastyon-chat", "generate", {cwd: this.options.dataDir})
            .then(function () {
                const configsPath = chat.options.dataDir + "/configs/";

                fs.rmSync(configsPath + "homeserver.yaml");
            });
    }

    pullLastRelease() {
        const docker = new dockerCLI.Docker();
        docker.options.echo = false;

        return docker.command('pull pocketnetteam/matrix-synapse:latest').then(function (data) {
        }, function (rejected) {
            console.error('rejected = ', rejected);
            return Promise.reject("docker pull pocketnetteam/matrix-synapse:latest failed");
        });
    }

    writeInstallationTag(tag) {
        const dataDir = this.options.dataDir;
        fs.writeFileSync(dataDir + '/version', "#" + tag);
    }

    writeCompleteReleaseTag() {
        const dataDir = this.options.dataDir;
        const version = fs.readFileSync(dataDir + '/version', {encoding: "utf8"});

        if (version.includes("#")) {
            fs.writeFileSync(dataDir + '/version', version.replace("#", ""));
        }
    }

    checkExistsNewReleaseByTag() {
        if (!this.checkChatIsInstalling()) {
            return Promise.resolve(true);
        }

        const dataDir = this.options.dataDir;
        const version = fs.readFileSync(dataDir + '/version', {encoding: "utf8"});

        if (version.includes("#")) {
            return Promise.resolve(false);
        }

        return axios.get("https://api.github.com/repos/yanotek/matrix-control/releases/latest").then(function(response) {
            const lastVersion = response.data["tag_name"];

            return version !== lastVersion;
        })
    }
}

