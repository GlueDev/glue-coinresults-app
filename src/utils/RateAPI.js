import ccxt from 'ccxt';
import realm from '../realm';

export default class RateAPI {
  /**
   * Fetch ticker data from the API
   * @param {string} ticker
   * @param {string} fiat
   */
  static async fetchRates (ticker, fiat) {
    const kraken     = new ccxt.kraken(),
          oneWeekAgo = new Date;

    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Todo: perhaps check first if the Ticker/Fiat combo exists @ api?

    try {
      const rateData = await kraken.fetchOHLCV(ticker + '/' + fiat, '1h', oneWeekAgo.getTime());

      rateData.forEach((rate) => {
        /**
         * entry[0] = date
         * entry[1] = open
         * entry[2] = high
         * entry[3] = low
         * entry[4] = close
         * entry[5] = volume
         */
        let highLowAverage = (rate[2] + rate[3]) / 2;

        this.saveRate(new Date(rate[0]), ticker, fiat, highLowAverage);
      });
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Save a rate in the local Realm database
   * @param {Date} date
   * @param {string} ticker
   * @param {string} fiat
   * @param {float} rate
   */
  static async saveRate (date, ticker, fiat, rate) {
    const year  = date.getFullYear().toString(),
          month = date.getMonth().toString(),
          day   = date.getDate(),
          hours = date.getHours();

    const rateKey = year + month + day + hours + ticker + fiat;

    try {
      const tickerObject = realm.objectForPrimaryKey('Ticker', ticker);
      realm.write(() => tickerObject.rates.push({
        id:     rateKey,
        date:   date,
        ticker: ticker,
        fiat:   fiat,
        rate:   rate,
      }));
    }
    catch (e) {
      console.log(e);
    }
  }
}
