import { CurrencySign, currencySigns } from '@getsquire/sage/settings';

export interface CurrencyFormat {
  decimalSeparator: string;
  currencyPrefix: CurrencySign;
  groupSeparator: string;
}

export const USD: CurrencyFormat = {
  decimalSeparator: '.',
  currencyPrefix: currencySigns.usd,
  groupSeparator: ',',
};

export const CAD: CurrencyFormat = {
  decimalSeparator: '.',
  currencyPrefix: currencySigns.cad,
  groupSeparator: ',',
};

export const GBP: CurrencyFormat = {
  decimalSeparator: '.',
  currencyPrefix: currencySigns.gbp,
  groupSeparator: ',',
};

export const AUD: CurrencyFormat = {
  decimalSeparator: '.',
  currencyPrefix: currencySigns.aud,
  groupSeparator: ',',
};

export const EUR: CurrencyFormat = {
  decimalSeparator: '.',
  currencyPrefix: currencySigns.eur,
  groupSeparator: ',',
};

export const GIP: CurrencyFormat = {
  decimalSeparator: '.',
  currencyPrefix: currencySigns.gip,
  groupSeparator: ',',
};
