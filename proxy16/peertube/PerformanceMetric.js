class PerformanceMetric {
  _ratings = [];

  calculate(instance) {
    const { _ratings } = this;
    const performance = instance.performance();

    if (!performance) return -10;

    const serverData = performance.data;

    if (!serverData.performance) return -10;

    const calculatedRatings = _ratings.map((rating) => rating(serverData));

    return calculatedRatings.reduce((accumulator, metric) => {
      const currentRating = metric.calculate() || 0;
      return accumulator + currentRating;
    }, 0);
  }

  constructor(ratings = [], customCalculator) {
    this._ratings = ratings;

    if (customCalculator) this.calculate = customCalculator;
  }
}

module.exports = PerformanceMetric;
