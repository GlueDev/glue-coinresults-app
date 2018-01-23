import axios from 'axios';
import moment from 'moment';
import realm from 'realm';

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

    // Fetch market caps.
    const marketData = await this.fetchMarketData();

    // Fetch and save rates.
    const rates = await Promise.all(tickers.map(async ticker => await this.fetchRates(ticker, 'EUR')));

    // Commit all changes to realm.
    await realm.write(() => {
      realm.create('MarketData', marketData, true);
      rates.forEach(rates => {
        const FIAT         = 'EUR',
              ticker       = rates[0].ticker,
              tickerObject = realm.objectForPrimaryKey('Ticker', ticker);

        rates.forEach(rate => {
          const year  = moment.unix(rate.timestamp).year(),
                month = moment.unix(rate.timestamp).month() + 1, // Months are zero indexed
                day   = moment.unix(rate.timestamp).date(),
                hours = moment.unix(rate.timestamp).hour();

          const date    = new Date(rate.timestamp * 1000),
                rateKey = `${year}${month}${day}${hours}${ticker}${FIAT}`;

          realm.create('Rate', {
            id:   rateKey,
            rate: rate.rate,
            date,
            ticker,
            FIAT,
          }, true);
        });
      });
    });

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
      timeout: 1500,
      params:  {
        fsym:  ticker,
        tsym:  FIAT,
        limit: this.getHours(ticker, FIAT),
      },
    });

    const response = await request.data.Data;
    return response.map(rate => ({
      timestamp: rate.time,
      rate:      rate.close,
      ticker,
      FIAT,
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
  static async fetchMarketData () {
    const request = await axios.get('https://api.coinmarketcap.com/v1/global/', {
      timeout: 2000,
      params:  {convert: 'EUR'},
    });

    const response = request.data;
    return {
      date:         moment().format('ll'),
      marketCapEUR: response.total_market_cap_eur,
      marketCapUSD: response.total_market_cap_usd,
      dominanceBTC: response.bitcoin_percentage_of_market_cap,
    };
  }
}
