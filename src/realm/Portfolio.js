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
    return this.investments.reduce((a, b) => a.amount + b.amount);
  }

  /**
   * Calculate the current total value.
   */
  get totalValue () {

  }

  /**
   * Calculate the current total result.
   */
  get totalResult () {

  }
}
