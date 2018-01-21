import Realm from '../../node_modules/realm';
import Asset from './Asset';
import Investment from './Investment';
import MarketData from './MarketData';
import Portfolio from './Portfolio';
import Rate from './Rate';
import Ticker from './Ticker';

export default new Realm({
  schema: [Portfolio, Asset, Investment, Ticker, Rate, MarketData],
  // deleteRealmIfMigrationNeeded: true,
});
