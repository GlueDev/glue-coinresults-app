import axios from 'axios';
import moment from 'moment';
import { EventRegister } from 'react-native-event-listeners';
import realm from 'realm';
import { AlertIOS } from 'react-native';

export default class RateAPI {
  /**
   * Update the portfolios with up to date rates.
   * Update the market caps.
   *
   * @param {array} portfolios
   */
  static async refreshData (portfolios) {
    const t1      = new Date().getTime(),
          tickers = this.getTickers(portfolios);

    try {
      // Fetch rates.
      tickers.forEach(async ticker => await RateAPI.fetchRates(ticker, 'EUR'));

      // Fetch market caps.
      await this.fetchMarketCaps();

      // Emit update event.
      await EventRegister.emit('dataRefreshed');
    } catch (e) {
      AlertIOS.alert('Refreshing failed', 'We were unable to connect to the API.');
    }

    // Log exec time when in dev mode.
    if (__DEV__) {
      const t2 = new Date().getTime();
      console.info(`Execution took ${t2 - t1} ms`);
    }
  }

  /**
   * Fetch ticker data from the API.
   *
   * @param {string} ticker
   * @param {string} FIAT
   */
  static async fetchRates (ticker, FIAT) {
    const request = await axios.get('https://min-api.cryptocompare.com/data/histohour', {
      timeout: 1000,
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

    const tickerObject = realm.objectForPrimaryKey('Ticker', ticker);
    return realm.write(() => tickerObject.rates.push({
      id: rateKey,
      date,
      ticker,
      FIAT,
      rate,
    }));
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

  /**
   * Return an array of unique tickers.
   *
   * @param {array} portfolios
   */
  static getTickers (portfolios) {
    const allTickers = portfolios.map(portfolio => portfolio.allTickers);
    return allTickers.reduce((a, b) => a.concat(b));
  }

  /**
   * Get market cap information.
   */
  static async fetchMarketCaps () {
    const request = await axios.get('https://api.coinmarketcap.com/v1/global/', {
      timeout: 2500,
      params: {convert: 'EUR'},
    });

    const response = request.data;
    return realm.write(async () => await realm.create('MarketData', {
      date: moment().format('l'),
      marketCapEUR: response.total_market_cap_eur,
      marketCapUSD: response.total_market_cap_usd,
      dominanceBTC: response.bitcoin_percentage_of_market_cap,
    }, true));
  }
}
