module.exports = {
  responseSpeed: { calculator: (instance) => -instance.stats().k },
  uploadVideo: {
    ratings: [
      (serverData) => ({
        value: serverData.performance.waitTranscodingJobs || 0,
        name: 'Waiting Jobs',
        weight: 0.6,
        calculate() {
          const { weight, value } = this;

          return weight / (1 + Math.pow(value, 0.25));
        },
      }),
      (serverData) => ({
        value: serverData.totalLocalVideoFilesSize || 0,
        name: 'Occupied Space',
        weight: 0.3,
        calculate() {
          const { weight, value } = this;

          let metricValue = 1 - value / 100000000000;

          if (metricValue < 0) metricValue = 1 - value / 400000000000;

          return weight * metricValue;
        },
      }),
      (serverData) => ({
        value: serverData.totalDailyActiveUsers,
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
    ratings: [],
  },
  watchVideo: {
    ratings: [],
  },
  liveStream: {
    ratings: [],
  },
};
