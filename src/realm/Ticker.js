export default class Ticker {
  /**
   * Define this model's schema.
   */
  static schema = {
    name: 'Ticker',

    properties: {
      name:   'string',
      ticker: 'string',
      color:  'string',
    },
  };
}
