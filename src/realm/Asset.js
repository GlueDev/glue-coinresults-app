import moment from 'moment';
import realm from 'realm';

export default class Asset {
  /**
   * Define this model's schema.
   */
  static schema = {
    name: 'Asset',

    properties: {
      ticker: 'string',
      amount: 'float',
      owners: {type: 'linkingObjects', objectType: 'Portfolio', property: 'assets'},
    },
  };

  /**
   * Calculate the value of the asset in FIAT currency.
   *
   * @param {string} FIAT
   * @param {string} interval
   */
  totalValue (FIAT, interval = 'today') {
    if (interval === 'yesterday') {
      const yesterday = new Date(Date.now() - (1000 * 60 * 60 * 24));
      let yesterdayBegin = new Date(yesterday.setHours(0, 0, 0, 0)),
          yesterdayEnd   = new Date(yesterday.setHours(23, 59, 59, 0)),
          yesterdayRate  = realm
            .objects('Rate')
            .filtered('ticker = $0 AND FIAT = $1 AND date > $2 AND date < $3', this.ticker, FIAT, yesterdayBegin, yesterdayEnd)
            .sorted('date', true);

      if (yesterdayRate.length > 0) {
        return this.amount * yesterdayRate[0].rate;
      }
    }

    let recentRate = realm
      .objects('Rate')
      .filtered('ticker = $0 AND FIAT = $1', this.ticker, FIAT)
      .sorted('date', true);

    if (recentRate.length > 0) {
      return this.amount * recentRate[0].rate;
    }

    return 0;
  };

  /**
   * Get the current BTC value for this asset.
   */
  get valueBTC () {

  }

  /**
   * Get the current EUR value for this asset.
   */
  get valueUSD () {

  }

  /**
   * Get the current EUR value for this asset.
   */
  get valueEUR () {
    return realm
      .objects('Rate')
      .filtered('ticker == $0 AND FIAT == "EUR"', this.ticker)
      .sorted('date', true)[0].rate;
  }

  /**
   * Get the data points for graphs.
   */
  dataPoints (range = 7, FIAT = 'EUR') {
    return realm
      .objects('Rate')
      .filtered(
        'ticker == $0 AND FIAT == $1 AND date >= $2',
        this.ticker, FIAT, moment().subtract(range, 'days').toDate(),
      )
      .sorted('date');
  }
}
