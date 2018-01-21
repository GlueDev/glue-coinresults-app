import Accounting from 'accounting';
import Numeral from 'numeral';

class Finance {
  static formatFIAT (value, FIAT, decimals = 2) {
    let symbol = '';
    switch (FIAT) {
      case 'EUR':
        symbol = '€';
        break;

      case 'USD':
        symbol = '$';
        break;

      case 'GBP':
        symbol = '';
        break;
    }
    return Accounting.formatMoney(value, symbol, decimals, '.', ',');
  }

  static formatCrypto (value) {
    const decimals  = num => (num.toString().split('.')[1] || []).length;
    const precision = (decimals(value) === 0) ? 0 : 4;
    return Accounting.formatNumber(value, precision, '.', ',');
  }

  static formatPercentage (value) {
    return `${Accounting.toFixed(value, 2)}%`;
  }

  static formatMarketCap (value) {
    return Numeral(value).format('(0.00 a)');
  }

  /**
   * Checks whether the given value is numeric
   * @param value
   * @returns {boolean}
   */
  static isNumeric (value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
}

export default Finance;
