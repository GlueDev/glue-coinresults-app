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
      return this.investments[0].amount;
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
}
