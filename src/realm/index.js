import Realm from 'realm';
import Asset from './Asset';
import Investment from './Investment';

import Portfolio from './Portfolio';
import Ticker from './Ticker';
import Rate from './Rate';

export default new Realm({
  schema: [Portfolio, Asset, Investment, Ticker, Rate],
  // deleteRealmIfMigrationNeeded: true,
});
