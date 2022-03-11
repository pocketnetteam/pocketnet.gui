module.exports = {
	view: { calculator: (instance) => instance.availability() },
	upload: {
		ratings: [

			(serverData, instance) => ({
				value: (instance.availability() || 1) / (1 + ((serverData.performance || {}).waitTranscodingJobs || 0)),
				name: 'Waiting Jobs',
				weight: 0.4,
				calculate() {

					const { weight, value } = this;

					return value;
				},
			}),

			(serverData, instance) => ({
				value: ((serverData.performance || {}).speedByResolution || {}) * instance.availability(),
				name: 'Transcoding Speed',
				weight: 0.3,
				calculate() {
					const { weight, value } = this;

					const speedsArr = Object.values(value);
					const speedValue =
						speedsArr.reduce((acc, curr) => acc + curr, 0) / speedsArr.length;

					return weight * (1 - 1 / (1 + Math.pow(speedValue, 0.25)));
				},
			}),
			(serverData) => ({
				value: (serverData.space || {}).totalLocalVideoFilesSize || 0,
				name: 'Occupied Space',
				weight: 0.2,
				calculate() {
					const { weight, value } = this;

					let metricValue = 1 - value / 100000000000;

					if (metricValue < 0) metricValue = 1 - value / 400000000000;

					return weight * metricValue;
				},
			}),
			(serverData) => ({
				value: (serverData.stats || {}).totalDailyActiveUsers,
				name: 'Active Users',
				weight: 0.1,
				calculate() {
					const { weight, value } = this;

					return weight / (1 + Math.pow(value, 0.25));
				},
			}),
		],
	},
	importVideo: {
		ratings: [
			(serverData) => ({
				value: (serverData.performance || {}).waitImportsCount || 0,
				name: 'Waiting Imports',
				weight: 0.6,
				calculate() {
					const { weight, value } = this;

					return weight / (1 + Math.pow(value, 0.25));
				},
			}),
			(serverData) => ({
				value: (serverData.performance || {}).speedByResolution || {},
				name: 'Transcoding Speed',
				weight: 0.2,
				calculate() {
					const { weight, value } = this;

					const speedsArr = Object.values(value);
					const speedValue =
						speedsArr.reduce((acc, curr) => acc + curr, 0) / speedsArr.length;

					return weight * (1 - 1 / (1 + Math.pow(speedValue, 0.25)));
				},
			}),
			(serverData) => ({
				value: (serverData.performance || {}).waitTranscodingJobs || 0,
				name: 'Waiting Transcodings',
				weight: 0.1,
				calculate() {
					const { weight, value } = this;

					return weight / (1 + Math.pow(value, 0.25));
				},
			}),
			(serverData) => ({
				value: (serverData.space || {}).totalDailyActiveUsers,
				name: 'Active Users',
				weight: 0.1,
				calculate() {
					const { weight, value } = this;

					return weight / (1 + Math.pow(value, 0.25));
				},
			}),
		],
	},
	liveStream: {
		ratings: [
			(serverData) => ({
				value: (serverData.performance || {}).activeLivestreams || 0,
				name: 'Active Streams',
				weight: 0.7,
				calculate() {
					const { weight, value } = this;

					return weight / (1 + Math.pow(value, 0.25));
				},
			}),
			(serverData) => ({
				value: (serverData.performance || {}).speedByResolution || {},
				name: 'Transcoding Speed',
				weight: 0.3,
				calculate() {
					const { weight, value } = this;

					const speedsArr = Object.values(value);
					const speedValue =
						speedsArr.reduce((acc, curr) => acc + curr, 0) / speedsArr.length;

					return weight * (1 - 1 / (1 + Math.pow(speedValue, 0.25)));
				},
			}),
		],
	},
};
