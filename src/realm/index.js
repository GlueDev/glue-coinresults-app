import Realm from 'realm';

import Portfolio from './Portfolio';
import Asset from './Asset';
import Investment from './Investment';

export default new Realm({
  schema: [Portfolio, Asset, Investment],
  // deleteRealmIfMigrationNeeded: true,
});
