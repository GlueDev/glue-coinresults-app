export default class MarketData {
  /**
   * Define this model's schema.
   */
  static schema = {
    name:       'MarketData',
    primaryKey: 'date',

    properties: {
      date:         'string',
      marketCapEUR: 'float',
      marketCapUSD: 'float',
      dominanceBTC: 'float',
    },
  };
}
