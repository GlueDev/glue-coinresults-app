import ccxt from 'ccxt';
import { action, computed, createTransformer, observable } from 'mobx';

import { loadStore, saveStore } from '../utils/iCloud';

export default class CryptosStore {
  @observable portfolios      = [];
  @observable activePortfolio = false;
  @observable rates           = [];
  @observable marketCap       = [];

  /**
   * Ensure the store is filled with iCloud data.
   */
  constructor () {
    this.loadStore();

  }

  /**
   *
   */
  @computed
  get totalValues () {
    return this.portfolios.map(portfolio => {
      const ret = {[portfolio.name]: 0};
      if (!portfolio.assets[0].values) {
        return ret;
      }

      ret.value = portfolio.assets.reduce((a, b) => a.values.EUR + b.values.EUR);
      return ret;
    });
  }

  @computed
  get totalInvestments () {

  }

  @computed
  get totalResults () {

  }

  @computed
  get totalROIs () {

  }

  /**
   * Grab the market cap.
   */
  @action
  async getMarketCap () {
    const mc = new ccxt.coinmarketcap();
    const response = await mc.fetchGlobal('EUR');

    this.marketCap = {
      total: response.total_market_cap_eur,
      btcDominance: response.bitcoin_percentage_of_market_cap,
    };
  }

  /**
   * Add a portfolio to the store.
   *
   * @param {string} name
   */
  @action
  async createPortfolio (name) {
    // Check for unique portfolio name.
    if (this.getPortfolio(name) !== undefined) {
      throw Error('A portfolio with this name already exists.');
    }

    // Add the empty assets portfolio.
    this.portfolios.push({
      name,
      assets:      [],
      investments: [],
    });
  }

  /**
   * Get a specific portfolio.
   *
   * @param {string} name
   */
  @action
  getPortfolio (name) {
    try {
      return this.portfolios.find(portfolio => portfolio.name === name);
    } catch (e) {
      return undefined;
    }
  }

  /**
   * Find the index of the portfolio in the store array.
   *
   * @param {string} name
   * @param {bool} throwError
   * @returns {number}
   */
  @action
  getPortfolioIndex (name, throwError = true) {
    const index = this.portfolios.findIndex(portfolio => portfolio.name === name);

    if (index < 0 && throwError) {
      throw Error('The portfolio does not exist.');
    }

    return index;
  }

  /**
   * Remove a portfolio.
   *
   * @param {string} name
   */
  @action
  removePortfolio (name) {
    const index = this.getPortfolioIndex(name);
    this.portfolios.splice(index, 1);
  }

  /**
   * Create or update an asset for a portfolio.
   *
   * @param {string} portfolioName
   * @param {object} asset
   */
  @action
  createOrUpdateAsset (portfolioName, asset) {
    const ticker         = asset.ticker;
    const portfolioIndex = this.getPortfolioIndex(portfolioName);
    const assetIndex     = this.portfolios[portfolioIndex].assets.findIndex(asset => asset.ticker === ticker);

    if (assetIndex < 0) {
      return this.portfolios[portfolioIndex].assets.push(asset);
    }

    this.portfolios[portfolioIndex].assets[assetIndex] = asset;
  }

  /**
   * Remove an asset from a portfolio.
   *
   * @param {string} portfolioName
   * @param {string} ticker
   */
  @action
  removeAsset (portfolioName, ticker) {
    const portfolioIndex = this.getPortfolioIndex(portfolioName);
    const assetIndex     = this.portfolios[portfolioIndex].assets.findIndex(asset => asset.ticker === ticker);

    if (assetIndex < 0) {
      throw Error('The ticker does not exist in this portfolio.');
    }

    this.portfolios[portfolioIndex].assets.splice(assetIndex, 1);
  }

  @action
  setInvestment (portfolioName, investment) {
    const portfolioIndex = this.getPortfolioIndex(portfolioName);
    this.portfolios[portfolioIndex].investments = investment;
  }

  /**
   * Loop through all portfolios and find all unique tickers.
   */
  @action
  getTickers () {
    return [
      ...new Set(this.portfolios.map(portfolio => portfolio.assets.map(asset => asset.ticker))
                     .reduce((a, b) => a.concat(b)))
    ];
  }

  /**
   * Get rates for one or more tickers.
   * After finding the rates, calculate the values for each asset in each portfolio.
   *
   * @param {string|array} tickers
   */
  @action
  async getRates (tickers = false) {
    // Skip if no portfolios exist.
    if (!this.portfolios[0]) {
      return;
    }

    // Create the string for the URL.
    let string;
    switch (typeof tickers) {
      case 'string':
        string = tickers;
        break;

      case 'array':
        string = tickers.join(',');
        break;

      default:
        string = this.getTickers().join(',');
    }

    try {
      const request = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${string}&tsyms=BTC,USD,EUR`);
      this.rates    = await request.json();

      this.calculateAssetValues();
    } catch (e) {
      throw Error('Could not connect to the API.');
    }
  }

  /**
   * Add a value object to each asset in each portfolio.
   */
  @action
  calculateAssetValues () {
    this.portfolios.forEach(portfolio => {
      portfolio.assets = portfolio.assets.map(asset => {
        const values = {
          BTC: this.rates[asset.ticker].BTC * asset.amount,
          USD: this.rates[asset.ticker].USD * asset.amount,
          EUR: this.rates[asset.ticker].EUR * asset.amount,
        };

        return {...asset, values};
      });
    });
  }

  /**
   * Get the store from iCloud.
   */
  @action
  async loadStore () {
    try {
      const store          = await loadStore('CryptoStore');
      this.portfolios      = store.portfolios || [];
      this.activePortfolio = store.activePortfolio || false;
    } catch (e) {
      this.portfolios = [];
    }
  }

  /**
   * Save the store to iCloud.
   * TODO: Error handling.
   */
  @action
  async saveStore () {
    await saveStore('CryptoStore', {
      portfolios:      this.portfolios,
      activePortfolio: this.activePortfolio,
    });
  }
}
