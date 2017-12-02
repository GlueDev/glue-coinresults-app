import HistoryStore from './HistoryStore';
import CryptosStore from './CryptosStore';
import UserStore from './UserStore';

export default {
  history: new HistoryStore(),
  cryptos: new CryptosStore(),
  user:    new UserStore(),
};
