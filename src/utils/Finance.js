import Accounting from 'accounting';

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
    return Accounting.formatNumber(value, 4, '.', ',');
  }

  static formatPercentage (value) {
    return `${Accounting.toFixed(value, 2)}%`;
  }
}

export default Finance;
