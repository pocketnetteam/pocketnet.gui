const fs = require("fs-extra")
const path = require("path")

exports.default = async function (context) {
  if (context.electronPlatformName !== "darwin") return

  const appPath = context.appOutDir
  const resourcesPath = path.join(appPath, "Bastyon.app", "Contents", "Resources")
  const torSrc = path.join(context.projectDir, "tor", "macos", "universal")
  const torDest = path.join(resourcesPath, "tor")

  await fs.remove(torDest)
  console.log("Copying universal Tor ->", torDest)
  await fs.copy(torSrc, torDest)

  console.log("Tor copied successfully")
}

