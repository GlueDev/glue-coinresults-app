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
}
