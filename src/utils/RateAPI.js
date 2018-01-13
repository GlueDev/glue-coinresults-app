import axios from 'axios';
import moment from 'moment';
import realm from '../realm';

export default class RateAPI {
  /**
   * Fetch ticker data from the API.
   *
   * @param {string} ticker
   * @param {string} FIAT
   */
  static async fetchRates (ticker, FIAT) {
    const request = await axios.get('https://min-api.cryptocompare.com/data/histohour', {
      timeout: 5000,
      params:  {
        fsym:  ticker,
        tsym:  FIAT,
        limit: this.getHours(ticker, FIAT),
      },
    });

    const response = request.data.Data;
    response.map(rate => this.saveRate(rate.time, ticker, FIAT, rate.close));
  }

  /**
   * Save a rate in the local Realm database.
   *
   * @param {int} timestamp
   * @param {string} ticker
   * @param {string} FIAT
   * @param {float} rate
   */
  static async saveRate (timestamp, ticker, FIAT, rate) {
    const year  = moment.unix(timestamp).year(),
          month = moment.unix(timestamp).month() + 1, // Months are zero indexed
          day   = moment.unix(timestamp).date(),
          hours = moment.unix(timestamp).hour();

    const date    = new Date(timestamp * 1000),
          rateKey = `${year}${month}${day}${hours}${ticker}${FIAT}`;

    try {
      const tickerObject = realm.objectForPrimaryKey('Ticker', ticker);
      realm.write(() => tickerObject.rates.push({
        id: rateKey,
        date,
        ticker,
        FIAT,
        rate,
      }));
    }
    catch (e) {
      // console.log(e);
    }
  }

  /**
   * Look for the most recent rate timestamp for this pair.
   * Then convert the timestamp to the amount of hours to be requested.
   *
   * @param {string} ticker
   * @param {string} FIAT
   */
  static getHours (ticker, FIAT) {
    const rates = realm.objects('Rate').filtered('ticker = $0 AND FIAT = $1', ticker, FIAT);

    // Get all seven days.
    if (!rates.length) {
      return 24 * 7;
    }

    // Get only new dates.
    const mostRecentRate      = rates.sorted('date', true).slice(0, 1)[0],
          mostRecentTimestamp = moment(mostRecentRate.date).format('X'),
          now                 = moment().format('X'),
          difference          = Math.floor((now - mostRecentTimestamp) / 60 / 60);

    /**
     * The API we currently use always returns the two most recent rates. For that reason, we
     * remove those two from the database so that we always have an up to date rate, and not the
     * rate from +- an hour ago.
     */
    realm.write(() => realm.delete(rates.sorted('date', true).slice(0, 2)));

    // Only request
    return difference;
  }
}
