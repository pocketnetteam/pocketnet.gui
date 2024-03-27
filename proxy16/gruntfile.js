const config = require("./config.json");

const path = require("path");
const { execSync } = require("child_process");

// Configuration constants
const PeertubeListLink = config.peertubesListLink;
const PeertubeTargetFile = "./peertube-servers.json";

function bundlePeertube(grunt) {
	const deployPath = path.join(__dirname, PeertubeTargetFile);

	grunt.log.ok("Gathering Peertube list from Github repository");

	try {
		execSync(`curl ${PeertubeListLink} --output ${deployPath} -s`, {
			encoding: "utf8",
			windowsHide: true,
		});
	} catch (e) {
		grunt.log.error("Repository is not available!");
	}
}

module.exports = function(grunt) {
	grunt.registerTask('peertube', () => bundlePeertube(grunt));

	grunt.registerTask('default', ['peertube']);
};
