export default class Portfolio {
  /**
   * Define this model's schema.
   */
  static schema = {
    name: 'Portfolio',

    primaryKey: 'name',
    properties: {
      name:        'string',
      investments: 'Investment[]',
      assets:      'Asset[]',
    },
  };

  /**
   * Calculate the sum of the investments.
   */
  get totalInvestments () {
    if (this.investments.length < 2) {
      // Check if amount property is exists - if no investments are present we simply want to
      // return 0 instead of an undefined error
      if (this.investments[0] && this.investments[0].amount) {
        return this.investments[0].amount;
      }

      return 0;
    }

    return this.investments.reduce((a, b) => a.amount + b.amount);
  }

  /**
   * Calculate the current total value.
   */
  get totalValue () {
    let portfolioValue = 0;

    if(this.assets.length > 0) {
      this.assets.forEach((asset) => {
        portfolioValue += asset.fiatValue('EUR');
      });
    }

    return portfolioValue;
  }

  /**
   * Calculate the current total result.
   */
  get totalResult () {

  }

  /**
   * List all the tickers in this portfolio.
   *
   * @return {array}
   */
  get allTickers () {
    return this.assets.map(asset => asset.ticker);
  }
}
