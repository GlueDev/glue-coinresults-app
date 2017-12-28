export default class Rate {
  /**
   * Define this model's schema.
   */
  static schema = {
    name:       'Rate',
    primaryKey: 'id',

    properties: {
      id:     'string',
      date:   'date',
      ticker: 'string',
      FIAT:   'string',
      rate:   'float',
      owners: {type: 'linkingObjects', objectType: 'Ticker', property: 'rates'},
    },
  };
}
