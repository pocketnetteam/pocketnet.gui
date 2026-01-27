const fs = require("fs-extra")
const path = require("path")

exports.default = async function (context) {
  if (context.electronPlatformName !== "darwin") return

  const appOutDir = context.appOutDir
  const projectDir = context.projectDir || path.resolve(__dirname, "..")

  const resourcesPath = path.join(appOutDir, "Bastyon.app", "Contents", "Resources")

  const torSrc = path.join(projectDir, "tor", "macos", "universal")
  const torDest = path.join(resourcesPath, "tor")

  console.log("Removing old Tor folder:", torDest)
  await fs.remove(torDest)

  console.log("Copying universal Tor ->", torDest)
  await fs.copy(torSrc, torDest)

  console.log("Tor copied successfully")
}

