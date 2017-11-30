import { action, observable } from 'mobx';
import Moment from 'moment';

export default class UserStore {
  @observable currency = 'USD';
  @observable lastLogin = false;

  /**
   * Change the user's currency.
   *
   * @param {string} currency
   */
  @action
  setCurrency (currency) {
    this.currency = currency;
  }

  /**
   * Change the user's last login date.
   *
   * @param {string} date
   */
  @action
  setLastLogin (date = false) {
    if (!date) {
      const date = Moment.now();
    }

    this.lastLogin = date;
  }
}
