const path = require("path");

/**
 * 读取 config.xml 中的配置
 * @param {Context} cordovaContext
 * @returns
 */
exports.readPreferences = (cordovaContext) => {
  // read data from projects root config.xml file
  const { ConfigParser } =
    cordovaContext.requireCordovaModule("cordova-common");
  let config = null;
  try {
    config = new ConfigParser(
      path.join(cordovaContext.opts.projectRoot, "config.xml")
    );
  } catch (error) {
    console.warn(
      "config.xml not found! Please, check that it exist's in your project's root directory."
    );
    return null;
  }
  let linkEle = null;
  try {
    linkEle = config.doc.getroot().find("universal-links");
  } catch (error) {
    console.warn(
      "<universal-links> tag is not set in the config.xml. Universal Links plugin is not going to work."
    );
    return null;
  }

  const hosts = [];
  try {
    linkEle.findall("host").forEach((item) => {
      const host = {
        scheme: item.attrib.scheme || DEFAULT_SCHEME,
        name: item.attrib.name,
        paths: [],
      };
      const hostPaths = item.getchildren() || [];
      if (hostPaths.length === 0) {
        host.paths.push("*");
      } else {
        hostPaths.some((hostPath) => {
          const url = hostPath.attrib.url;
          if (!url) return;
          if (url === "*") {
            host.paths = ["*"];
            return true;
          }
          host.paths.push(url);
        });
      }
      hosts.push(host);
    });
  } catch (error) {
    console.warn("thrown a error when getting host in config.xml", error);
  }

  let iosTeamId = null;
  try {
    const iosTeamIdEle = linkEle.find("ios-team-id");
    if (iosTeamIdEle && iosTeamIdEle.attrib.value)
      iosTeamId = iosTeamIdEle.attrib.value;
  } catch (error) {
    console.warn("thrown a error when getting ios-team-id in config.xml", error);
  }

  return {
    hosts: hosts,
    iosTeamId: iosTeamId,
  };
};
