import realm from '../realm';

class RateFetcher {
  static async fetchHistoricData () {

  }

  static async saveRate (date, ticker, fiat, rate) {
    const year  = date.getFullYear().toString(),
          month = date.getMonth().toString(),
          day   = date.getDate(),
          hours = date.getHours();

    const rateKey = year + month + day + hours + ticker + fiat;

    realm.write(() => realm.create('Rate', {
      id:     rateKey,
      date:   date,
      ticker: ticker,
      fiat:   fiat,
      rate:   rate,
    }, true));
  }
}

export default RateFetcher;
