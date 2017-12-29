import realm from '../realm';

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
   */
  fiatValue (FIAT) {
    let recentRate = realm.objects('Rate').filtered('ticker = $0 AND FIAT = $1', this.ticker, FIAT).sorted('date', true);

    if(recentRate.length > 0) {
      return this.amount * recentRate[0].rate;
    }

    return 0;
  };
}
