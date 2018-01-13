import RateAPI from './RateAPI';

export default class Seeder {
  /**
   * Seeds the RateAPI.saveRate function with ticker data
   */
  static async SeedRates () {
    /**
     * Create an array of tickers. This array may contain duplicate tickers, as long as the
     * ticker/fiat combination is unique rateLow and rateHigh represent the boundaries of the to be
     * randomized crypto rate
     */
    let tickers    = [
      {
        'ticker':   'BTC',
        'fiat':     'EUR',
        'rateLow':  12000,
        'rateHigh': 16000,
      }/*, {
       'ticker':   'ETH',
       'fiat':     'EUR',
       'rateLow':  500,
       'rateHigh': 800,
       }, {
       'ticker':   'XRP',
       'fiat':     'EUR',
       'rateLow':  1,
       'rateHigh': 1.8,
       }/*, {
       'ticker':   'BCH',
       'fiat':     'EUR',
       'rateLow':  200,
       'rateHigh': 500,
       }, {
       'ticker':   'DASH',
       'fiat':     'EUR',
       'rateLow':  200,
       'rateHigh': 500,
       }, {
       'ticker':   'DGB',
       'fiat':     'EUR',
       'rateLow':  200,
       'rateHigh': 500,
       }, {
       'ticker':   'XEM',
       'fiat':     'EUR',
       'rateLow':  200,
       'rateHigh': 500,
       }, {
       'ticker':   'IOT',
       'fiat':     'EUR',
       'rateLow':  200,
       'rateHigh': 500,
       }, {
       'ticker':   'NEO',
       'fiat':     'EUR',
       'rateLow':  200,
       'rateHigh': 500,
       }, {
       'ticker':   'XLM',
       'fiat':     'EUR',
       'rateLow':  200,
       'rateHigh': 500,
       }, {
       'ticker':   'ADA',
       'fiat':     'EUR',
       'rateLow':  200,
       'rateHigh': 500,
       }, {
       'ticker':   'PAY',
       'fiat':     'EUR',
       'rateLow':  200,
       'rateHigh': 500,
       },*/
    ],
        oneWeekAgo = new Date,
        today      = new Date;

    // Set the startTime for the datetime loop (today minus 7 days)
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 1);

    console.log('devSeedRates started');

    // Loop through the tickers
    tickers.forEach((ticker) => {
      // Loop through oneWeekAgo and today by one hour (1000 * 60 * 60 = 3.600.000)
      for (let loopTime = oneWeekAgo.getTime(); loopTime < today.getTime(); loopTime += 3600000) {
        let rate = this.getRandomArbitrary(ticker.rateLow, ticker.rateHigh);

        // Save the rate
        RateAPI.saveRate(loopTime / 1000, ticker.ticker, ticker.fiat, rate);
      }
    });

    console.log('devSeedRates finished');

    return true;
  };

  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   */
  static getRandomArbitrary (min, max) {
    return Math.random() * (max - min) + min;
  }
}
