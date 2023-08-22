import type { Session } from '@getsquire/sage/session';

import { Currency } from '@app/types';

export const getCurrency = (session?: Session): Currency => {
  return (
    (session?.view.kind !== 'admin'
      ? (session?.view.meta.currency as Currency)
      : Currency.USD) ?? Currency.USD
  );
};
