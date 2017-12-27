export default class Ticker {
  /**
   * Define this model's schema.
   */
  static schema = {
    name: 'Ticker',

    primaryKey: 'ticker',
    properties: {
      ticker: 'string',
      name:   'string',
      color:  'string',
      rates:  'Rate[]',
    },
  };
}
