import Accounting from 'accounting';

class Finance {
  static formatFIAT(value) {
    return Accounting.formatMoney(value, "â‚¬", 2, '.', ',');
  }

  static formatCrypto(value) {
    return Accounting.formatNumber(value, 4, '.', ',');
  }

  static formatPercentage(value) {
    return `${Accounting.toFixed(value, 2)}%`;
  }
}

export default Finance;
