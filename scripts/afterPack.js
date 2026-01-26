const { execSync } = require("child_process");
const path = require("path");

exports.default = async function (context) {

  if (process.platform !== "darwin") return;

  const appPath = path.join(
    context.appOutDir,
    `${context.packager.appInfo.productFilename}.app`
  );

  console.log("Signing Tor and pluggable transports in:", appPath);

  execSync(`bash scripts/sign-tor-macos.sh "${appPath}"`, {
    stdio: "inherit",
    env: process.env
  });
};

