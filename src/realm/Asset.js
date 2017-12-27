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
    return 300;
  }
}
