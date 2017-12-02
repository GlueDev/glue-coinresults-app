import { action, observable } from 'mobx';
import Moment from 'moment';

import { loadStore, saveStore } from '../utils/iCloud';

export default class UserStore {
  @observable currency  = 'USD';
  @observable lastLogin = false;

  constructor () {
    this.loadStore();
  }

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
   * @param {?int} date
   */
  @action
  setLastLogin (date = false) {
    if (!date) {
      date = Moment.now();
    }

    this.lastLogin = date;
  }

  /**
   * Get the store from iCloud.
   * TODO: Error handling.
   */
  @action
  async loadStore () {
    const store = await loadStore('UserStore');

    this.lastLogin = store.lastLogin;
    this.currency  = store.currency;
  }

  /**
   * Save the store to iCloud.
   * TODO: Error handling.
   */
  @action
  async saveStore () {
    await saveStore('UserStore', {
      currency:  this.currency,
      lastLogin: this.lastLogin,
    });
  }
}
