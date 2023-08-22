import { CurrencyCode } from '@getsquire/sage/settings';

import { AUD, CAD, EUR, GBP, GIP, USD } from '@app/constants';

export const currencyConfig = (currency?: CurrencyCode) => {
  switch (currency) {
    case 'usd':
      return USD;
    case 'cad':
      return CAD;
    case 'gbp':
      return GBP;
    case 'aud':
      return AUD;
    case 'eur':
      return EUR;
    case 'gip':
      return GIP;
    default:
      return USD;
  }
};
