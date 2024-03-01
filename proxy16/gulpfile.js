const { series } = require("gulp");

require("better-logging")(console, {
	format: ctx => {
		return `${ctx.time.replace(/\.\d+/, '')} ${ctx.type} ${ctx.msg}`
	}
});

const config = require("./config.json");

const path = require("path");
const { execSync } = require("child_process");

// Configuration constants
const PeertubeListLink = config.peertubesListLink;
const PeertubeTargetFile = "./peertube-servers.json";

function bundlePeertube(finished) {
	const deployPath = path.join(__dirname, PeertubeTargetFile);

	console.info("Gathering Peertube list from Github repository");

	try {
		execSync(`curl ${PeertubeListLink} --output ${deployPath} -s`, {
			encoding: "utf8",
			windowsHide: true,
		});
	} catch (e) {
		console.error("Repository is not available!");
	}

	finished();
}

exports.build = series([bundlePeertube]);
