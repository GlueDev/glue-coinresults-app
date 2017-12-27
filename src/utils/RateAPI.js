import realm from '../realm';
import ccxt from 'ccxt';

export default class RateAPI {
  /**
   * Fetch ticker data from the API
   * @param ticker
   * @param fiat
   * @returns {Promise.<boolean>}
   */
  static async fetchRates (ticker, fiat) {
    const kraken = new ccxt.kraken(),
          oneWeekAgo = new Date;

    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Todo: perhaps check first if the Ticker/Fiat combo exists @ api?

    try {
      const ratedata = await kraken.fetchOHLCV(ticker + '/' + fiat, '1h', oneWeekAgo.getTime());

      ratedata.forEach((rate) => {
        /**
         * entry[0] = date
         * entry[1] = open
         * entry[2] = high
         * entry[3] = low
         * entry[4] = close
         * entry[5] = volume
         */
        let highLowAverage = ( rate[2] + rate[3] ) / 2;

        this.saveRate(new Date(rate[0]), ticker, fiat, highLowAverage);
      });

    } catch(e) {
      console.log(e);
    }

    return true;
  }

  /**
   * Save a rate in the local Realm database
   * @param date
   * @param ticker
   * @param fiat
   * @param rate
   * @returns {Promise.<boolean>}
   */
  static async saveRate (date, ticker, fiat, rate) {
    const year = date.getFullYear().toString(),
          month = date.getMonth().toString(),
          day = date.getDate(),
          hours = date.getHours();

    const rateKey = year + month + day + hours + ticker + fiat;

    try {
      realm.write(() => realm.create('Rate', {
        id:     rateKey,
        date:   date,
        ticker: ticker,
        fiat:   fiat,
        rate:   rate,
      }, true));

      return true;
    }
    catch(e) {
      console.log(e);
    }

    return false;
  }
}
