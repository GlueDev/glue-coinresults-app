import Finance from 'utils/Finance';

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

    if (this.assets.length > 0) {
      this.assets.forEach((asset) => {
        portfolioValue += asset.fiatValue('EUR');
      });
    }

    return portfolioValue;
  }

  /**
   * Calculate the current total value.
   */
  get totalValueYesterday () {
    let portfolioValue = 0;

    if (this.assets.length > 0) {
      this.assets.forEach((asset) => {
        portfolioValue += asset.fiatValue('EUR', 'yesterday');
      });
    }

    return portfolioValue;
  }

  /**
   * Output the portfolio value change of today
   */
  get valueChangeToday () {
    // Check if both the totalInvestments and totalVelue are set properly to avoid nasty errors
    if (Finance.isNumeric(this.totalValueYesterday) && Finance.isNumeric(this.totalValue)) {
      return this.totalValue - this.totalValueYesterday;
    }

    return 0;
  }

  /**
   * Calculate the current total result.
   */
  get totalResult () {
    // Check if both the totalInvestments and totalVelue are set properly to avoid nasty errors
    if (Finance.isNumeric(this.totalInvestments) && Finance.isNumeric(this.totalValue)) {
      return this.totalValue - this.totalInvestments;
    }

    return 0;
  }

  /**
   * Retur the ROI of the portfolio
   *
   * ROI calculation: (gains - cost)/cost * 100% (gains = current value of portfolio)
   * @returns {*}
   * @constructor
   */
  get ROI () {
    // Check if both the totalInvestments and totalVelue are set properly to avoid nasty errors
    if (Finance.isNumeric(this.totalInvestments) && Finance.isNumeric(this.totalValue)) {
      let ROI = ((this.totalValue - this.totalInvestments) / this.totalInvestments) * 100;

      return Finance.formatPercentage(ROI);
    }

    return 0;
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
