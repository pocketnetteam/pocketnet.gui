class PerformanceMetric {


	calculate(instance) {
		const { _ratings } = this;

		const stats = ((instance.stats()).info || {}).last || {};

		const calculatedRatings = _ratings.map((rating) => rating(stats, instance));

		return calculatedRatings.reduce((accumulator, metric) => {

			const currentRating = metric.calculate(instance) || 0;

			return accumulator + currentRating;

		}, 0);
	}

	constructor(ratings, customCalculator) {
		if (!ratings) ratings = []
		this._ratings = ratings;

		if (customCalculator) this.calculate = customCalculator;
	}
}

module.exports = PerformanceMetric;
