const fs = require("fs-extra");
const path = require("path");
const { Arch } = require("builder-util");

exports.default = async function (context) {
  if (context.electronPlatformName !== "darwin") return;

  if (context.arch === Arch.universal) {
    console.log("Skipping Tor copy during universal merge stage");
    return;
  }

  let archFolder;
  if (context.arch === Arch.arm64) archFolder = "aarch64";
  else if (context.arch === Arch.x64) archFolder = "x86_64";
  else {
    console.log("Unsupported arch:", context.arch);
    return;
  }

  const appOutDir = context.appOutDir;
  const projectDir = context.projectDir || path.resolve(__dirname, "..");

  const resourcesPath = path.join(appOutDir, "Bastyon.app", "Contents", "Resources");
  const torSrc = path.join(projectDir, "tor", "macos", archFolder);
  const torDest = path.join(resourcesPath, "tor", archFolder);

  if (!await fs.pathExists(torSrc)) {
    console.warn("Tor source missing:", torSrc);
    return;
  }

  console.log(`Copying ${archFolder} Tor ->`, torDest);

  await fs.remove(torDest);
  await fs.copy(torSrc, torDest);

  console.log(`${archFolder} Tor copied`);
};

