import HistoryStore from './HistoryStore';
import PortfolioStore from './PortfolioStore';
import UserStore from './UserStore';

export default {
  history:   new HistoryStore(),
  portfolio: new PortfolioStore(),
  user:      new UserStore(),
};
