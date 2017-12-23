import Realm from 'realm';

import Portfolio from './Portfolio';
import Asset from './Asset';
import Investment from './Investment';
import Ticker from './Ticker';

export default new Realm({
  schema: [Portfolio, Asset, Investment, Ticker],
  // deleteRealmIfMigrationNeeded: true,
});
