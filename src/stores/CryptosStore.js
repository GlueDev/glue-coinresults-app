import { action, observable, computed, createTransformer } from 'mobx';

import { loadStore, saveStore } from '../utils/iCloud';

export default class CryptosStore {
  @observable portfolios = [ // DUMMY DATA
    {
      name: 'Johnny',

      assets: [
        {ticker: 'BTC', amount: 1.000},
        {ticker: 'BCH', amount: 1.500},
        {ticker: 'BTG', amount: 0.750},
        {ticker: 'XRP', amount: 5000.000},
        {ticker: 'ETH', amount: 15.000},
        {ticker: 'DASH', amount: 10.000},
        {ticker: 'XMR', amount: 100.000},
      ],

      investments: [
        {amount: 1000, date: 1884183},
        {amount: 200, date: 1884183},
        {amount: 750, date: 1884183},
      ],
    },

    {
      name: 'Hector',

      assets: [
        {ticker: 'BTC', amount: 0.250},
        {ticker: 'BCH', amount: 0.600},
        {ticker: 'BTG', amount: 3.000},
        {ticker: 'XRP', amount: 1000.000},
        {ticker: 'ETH', amount: 7.500},
        {ticker: 'DASH', amount: 3.000},
        {ticker: 'XMR', amount: 25.000},
      ],

      investments: [
        {amount: 300, date: 1884183},
        {amount: 700, date: 1884183},
      ],
    },

    {
      name: 'Pete',

      assets: [
        {ticker: 'NEO', amount: 500.000},
      ],

      investments: [
        {amount: 200, date: 1884183},
      ],
    },
  ];

  @observable rates = [];

  /**
   * Ensure the store is filled with iCloud data.
   */
  constructor () {
    // Normally we would fill the store with iCloud data. Not now.
    // this.loadStore();

    this.getRates();
  }

  /**
   * Add a portfolio to the store.
   *
   * @param {string} name
   */
  @action
  createPortfolio (name) {
    // Check for unique portfolio name.
    if (this.getPortfolio !== undefined) {
      throw Error('A portfolio with this name already exists.');
    }

    // Add the empty assets portfolio.
    this.portfolios.push({
      name,
      assets: [],
    });
  }

  /**
   * Get a specific portfolio.
   *
   * @param {string} name
   */
  @action
  getPortfolio (name) {
    return this.portfolios.find(portfolio => portfolio.name === name);
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
   * Calculate the total value of a portfolio.
   *
   * @param {string} name
   */


  /**
   * Calculate the total investments.
   *
   * @param {string} name
   */
  @action
  getPortfolioTotalInvestments (name) {

  }

  @action
  getPortfolioTotalProfit (name) {

  }

  @action
  getPortfolioROI (name) {

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
  createOrUpdateAsset (portfolioName, asset) {
    const ticker         = asset.ticker;
    const portfolioIndex = this.getPortfolioIndex(portfolioName);
    const assetIndex     = this.portfolios[portfolioIndex].assets.findIndex(asset => asset.ticker === ticker);

    if (assetIndex < 0) {
      return this.portfolios[portfolioIndex].assets.push(asset);
    }

    this.portfolios[portfolioIndex].assets[assetIndex] = asset;
    this.calculateAssetValues();
  }

  /**
   * Remove an asset from a portfolio.
   *
   * @param {string} portfolioName
   * @param {string} ticker
   */
  removeAsset (portfolioName, ticker) {
    const portfolioIndex = this.getPortfolioIndex(portfolioName);
    const assetIndex     = this.portfolios[portfolioIndex].assets.findIndex(asset => asset.ticker === ticker);

    if (assetIndex < 0) {
      throw Error('The ticker does not exist in this portfolio.');
    }

    this.portfolios[portfolioIndex].assets.splice(assetIndex, 1);
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
      const request  = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${string}&tsyms=BTC,USD,EUR`);
      const response = await request.json();

      this.rates = response;
      this.calculateAssetValues();
    } catch (e) {
      throw Error('Could not connect to API');
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
   * TODO: Error handling.
   */
  @action
  async loadStore () {
    const store = await loadStore('CryptoStore');

    this.portfolios = store.portfolios;
  }

  /**
   * Save the store to iCloud.
   * TODO: Error handling.
   */
  @action
  async saveStore () {
    await saveStore('CryptoStore', {
      portfolios: this.portfolios,
    });
  }
}
