const fs = require("fs-extra");
const path = require("path");

exports.default = async function (context) {
  if (context.electronPlatformName !== "darwin") return;

  const appOutDir = context.appOutDir;
  const projectDir = context.projectDir || path.resolve(__dirname, "..");

  let archFolder;
  if (context.arch === "arm64") {
    archFolder = "aarch64";
  } else if (context.arch === "x64") {
    archFolder = "x86_64";
  } else {
    console.log("Do nothing for architecture:", context.arch);
    return;
  }

  const resourcesPath = path.join(appOutDir, "Bastyon.app", "Contents", "Resources");
  const torDest = path.join(resourcesPath, "tor", archFolder);
  const torSrc = path.join(projectDir, "tor", "macos", archFolder);

  console.log("Removing old Tor folder (if exists):", torDest);
  await fs.remove(torDest);

  console.log(`Copying ${archFolder} Tor ->`, torDest);
  await fs.copy(torSrc, torDest);

  console.log("Tor copied successfully");
};

