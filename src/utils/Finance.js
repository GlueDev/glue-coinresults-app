import Accounting from 'accounting';

class Finance {
  static formatFIAT(value, decimals = 2) {
    return Accounting.formatMoney(value, "€", decimals, '.', ',');
  }

  static formatCrypto(value) {
    return Accounting.formatNumber(value, 4, '.', ',');
  }

  static formatPercentage(value) {
    return `${Accounting.toFixed(value, 2)}%`;
  }
}

export default Finance;
